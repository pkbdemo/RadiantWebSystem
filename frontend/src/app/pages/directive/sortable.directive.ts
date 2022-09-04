import { Directive, Input, Output, EventEmitter } from '@angular/core';

export type SortDirection = 'ASC' | 'DESC' | '';

export interface SortEvent {
  column: string;
  direction: SortDirection;
}

const rotate: {[key: string]: SortDirection} = { 'ASC': 'DESC', 'DESC': '', '': 'ASC' };

@Directive({
  selector: 'span[sortable]',
  host: {
    '[class.asc]': 'direction === "ASC"',
    '[class.desc]': 'direction === "DESC"',
    '(click)': 'rotate()'
  }

})
export class NgSortableHeader {

  constructor() {}

  @Input() sortable: string = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    console.log("rotate");
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }

}
