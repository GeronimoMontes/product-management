import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { PaginateData } from '../paginate/paginate.component';
import { Observable } from 'rxjs';

export type Action = 'view' | 'add' | 'update' | 'delete';

export interface ActionTable {
  action: Action;
  rowSelected: any;
}

export interface DataSoucer {
  headers: string[];
  data: any[];
}

export interface EmitterData {
  rowSelected: any;
  action: Action;
}
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  constructor() {}

  emittEventClickAction(rowSelected: any, action: Action) {
    this.emitterRowAction.emit({ rowSelected, action });
  }

  onScroll($event: any) {
    if (
      Math.round($event.target.scrollTop) + $event.target.offsetHeight >=
      $event.target.scrollHeight - 1
    ) {
      this.emitterScrollAction.emit(this.paginate.currentPage + 1);
    }
  }

  onPaginateChange($event: number) {
    this.emitterPaginateChage.emit($event);
  }
  onPerPageChange($event: number) {
    this.emitterPerPageChage.emit($event);
  }

  @Input() dataSource!: DataSoucer;
  @Input() paginate!: PaginateData;
  @Input() loaddata: any;

  @Output() emitterRowAction = new EventEmitter<EmitterData>();
  @Output() emitterScrollAction = new EventEmitter<number>();
  @Output() emitterPaginateChage = new EventEmitter<number>();
  @Output() emitterPerPageChage = new EventEmitter<number>();
}
