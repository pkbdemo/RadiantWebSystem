import { HttpClient, HttpParams } from "@angular/common/http";
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';

import { SortDirection } from '../pages/directive/sortable.directive';
import { IMSConstants } from '../utils/IMSConstants';

interface SearchResult {
  dataList: any[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchCondition: FormData;
  sortColumn: string;
  sortDirection: SortDirection;
  filterCondition: FilterCondition[];
  url: string;
}

export type Operator = '=' | 'like';

/**
 * Filter condition is for frontend search and only work when pseudoPaging is true.
 * @property {string[]} columns - The column array which you want to filter
 * @property {Operator} operator - Match operator.
 * @property {string} term - The keyword which you want to filter in the specified columns' data
 */
export interface FilterCondition {
  columns: string[];
  /**
   * '=': equal, 'like': Ignore case fuzzy match.
   */
  operator: Operator;
  term: string
}

const compare = (v1: any, v2: any) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(myData: any[], column: string, direction: SortDirection): any[] {
  if (direction === '' || column === '') {
    return myData;
  } else {
    return [...myData].sort((a, b) => {
      let aValue = a[column];
      let bValue = b[column];

      if (aValue == null) {
        aValue = "";
      }

      if (bValue == null) {
        bValue = "";
      }

      const res = compare(aValue, bValue);
      return direction === 'ASC' ? res : -res;
    });
  }
}

function matches(data: any, filterCondition: FilterCondition[]): boolean {
  for (let i = 0; i < filterCondition.length; i++) {
    let condition = filterCondition[i];
    let term = condition.term.trim();

    if (condition.columns == null || condition.columns.length == 0 || term == null || term == "") {
      console.warn("The " + (i + 1) + "th filter condition is invalid!");
      continue;
    }

    let isMatch = false;

    for (let column of condition.columns) {
      if (condition.operator == "=") {
        isMatch = data[column] == condition.term;
      } else if (condition.operator == "like") {
        if (`${data[column]}`.toLowerCase().includes(term.toLowerCase())) {
          isMatch = true;
          break;
        }
      }
    }

    if (isMatch == false) {
      return false;
    }
  }

  return true;
}

export class GridviewService {
  private _loading$ = new BehaviorSubject<boolean>(false);
  private _search$ = new Subject<void>();
  private _dataList$ = new BehaviorSubject<any[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _pseudoPaging = false;
  private _dataSourse: any[];

  private _state: State = {
    page: 1,
    pageSize: 10,
    searchCondition: null,
    sortColumn: '',
    sortDirection: '',
    filterCondition: null,
    url: ''
  };

  constructor(private httpClient: HttpClient) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(300),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {

    });
  }

  get dataList$() { return this._dataList$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchCondition() { return this._state.searchCondition }

  set page(page: number) { this._set({ page }); }
  set pageSize(pageSize: number) {
    this._state.page = 1;
    this._set({ pageSize });
  }
  set searchCondition(searchCondition: FormData) {
    this._state.page = 1;
    this._dataSourse = null; //In order to make the gridview to reget the data from backend if pseudo paging.
    this._set({ searchCondition });
  }
  set sortColumn(sortColumn: string) { this._set({ sortColumn }); }
  set sortDirection(sortDirection: SortDirection) {
    this._state.page = 1;
    this._set({ sortDirection });
  }
  set filterCondition(filterCondition: FilterCondition[]) { this._set({ filterCondition }); }
  set url(url: string) { this._set({ url }); }

  set pseudoPaging(pseudoPaging: boolean) { this._pseudoPaging = pseudoPaging; }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const { sortColumn, sortDirection, pageSize, page, searchCondition, url } = this._state;

    let dataList: any[];
    let total: number;

    if (url == "") {
      console.error("The url is empty. Please set the url first to declare where can get the gridview data.")
      return of({ dataList, total });
    }

    let needToGetData = this._pseudoPaging == false || this._dataSourse == null;

    if (needToGetData) {
      console.log("Get data from backend.");

      let httpParams = new HttpParams().set("page", page.toString()).set("pageSize", pageSize.toString()).set("sortProperty", sortDirection == "" ? "" : sortColumn).set("sortDirection", sortDirection);
      let options = { params: httpParams };

      this.httpClient.post<any>(url, searchCondition, options).subscribe({
        next: (res) => {
          if (this._pseudoPaging == false) {
            dataList = res.content;
            total = res.total;
            this._total$.next(total);
          } else {
            this._dataSourse = res;
            dataList = this.getData_PseudoPaging();
          }

          this._dataList$.next(dataList);
        },
        error: (err) => {
          console.error(err);
          alert(IMSConstants.serverErrorMsg);
        }
      });
    } else if (this._pseudoPaging == true) {
      console.log("Use the data which get last time.");

      dataList = this.getData_PseudoPaging();
      this._dataList$.next(dataList);
    }

    return of({ dataList, total });
  }

  private getData_PseudoPaging(): any[] {
    const { sortColumn, sortDirection, filterCondition, pageSize, page } = this._state;
    let myData: any[] = this._dataSourse;
    let total = 0;

    if (myData != null) {
      total = myData.length;

      // 1. filter
      if (filterCondition != null && filterCondition.length > 0) {
        myData = this._dataSourse.filter(data => matches(data, filterCondition));
        total = myData.length;
      }

      // 2. sort
      myData = sort(myData, sortColumn, sortDirection);

      // 3. paginate
      myData = myData.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    }

    this._total$.next(total);

    return myData;
  }

  public clearData(): void {
    this._state.page = 1;
    this._dataSourse = null;
    this._dataList$.next(null);
    this._total$.next(0);
  }

  public refreshData(): void {
    this._state.page = 1;
    this._dataSourse = null;
    this._search$.next();
  }
}
