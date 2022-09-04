import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NgSortableHeader, SortEvent } from '../../directive/sortable.directive';
import { GridviewService } from '../../../service/gridview.service';
import { environment } from '../../../../environments/environment';
import { LayoutService } from '../../layout/services/layout.service';

@Component({
  selector: 'app-gridview',
  templateUrl: './gridview.component.html',
  styleUrls: ['./gridview.component.css']
})
export class GridviewComponent implements OnInit {
  gridviewService: GridviewService;

  @ViewChildren(NgSortableHeader) headers: QueryList<NgSortableHeader>;
  Name = '';
  Age = '';
  formSearchCondition = new FormData();

  constructor(private httpClient: HttpClient, private layoutService: LayoutService) {

  }

  ngOnInit(): void {
    this.gridviewService = new GridviewService(this.httpClient);

    let formData = new FormData();
    this.Name = sessionStorage.getItem('gridview_name') != 'undefined' ? sessionStorage.getItem('gridview_name') : null;
    this.Age = sessionStorage.getItem('gridview_age') != 'undefined' ? sessionStorage.getItem('gridview_age') : null;
    if (this.Name)
      formData.append('name', this.Name);
    if (this.Age)
      formData.append('age', this.Age);
    this.gridviewService.url = environment.apiServerURL + 'Example/GetPageList';
    this.gridviewService.searchCondition = formData;
  }

  search() {
    if (!(this.Name || '').trim() && !(this.Age || '').trim()) {
      alert("At least one condition is required");
      return;
    }

    let formData = new FormData();

    if (this.Name) {
      formData.append('name', this.Name.trim());
      sessionStorage.setItem('gridview_name', this.Name.trim());
    }
    if ((this.Age || '').trim()) {
      formData.append('age', this.Age.trim());
      sessionStorage.setItem('gridview_age', this.Age.trim());
    }

    this.gridviewService.searchCondition = formData;
  }

  reset() {
    this.Name = '';
    this.Age = '';

    sessionStorage.removeItem('gridview_name');
    sessionStorage.removeItem('gridview_age');

    this.gridviewService.searchCondition = null;
  }

  toggleRightBar() {
    this.layoutService.toggleRightBar();
  }

  onSort({ column, direction }: SortEvent) {

    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.gridviewService.sortColumn = column;
    this.gridviewService.sortDirection = direction;
  }

}
