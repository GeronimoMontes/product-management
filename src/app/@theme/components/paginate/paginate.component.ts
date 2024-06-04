import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface PaginateData {
  numberPages: number;
  current: number;
  next: number;
  previous: number;
  numberResult: number;
}
@Component({
  selector: 'app-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.scss'],
})
export class PaginateComponent {
  changePage(value: number) {
    this.paginate.current = value;
    this.paginate.next = value + 1 ;
    this.paginate.previous = value - 1;
    this.emittValue.emit(value);
  }
  get arryPaginate() {
    return Array(this.paginate.numberPages)
      .fill(0)
      .map((_, i) => i + 1);
  }
 
  @Input() paginate!: PaginateData;

  @Output() emittValue = new EventEmitter<number>();
}
//
