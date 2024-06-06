import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

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
export class TableComponent implements OnChanges {
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log({ changes })
  }

  emittEventClickAction(rowSelected: any, action: Action) {
    this.emitterRowAction.emit({ rowSelected, action });
  }

  onScroll($event: any) {
    const target = $event.target;
    console.log(Math.round(target.scrollTop), target.offsetHeight, target.scrollHeight)
    if (Math.round(target.scrollTop) + target.offsetHeight >= target.scrollHeight - 1) {
      // const nextPage = Math.floor(this.dataSource.data.length / this.itemsPerPage) + 1;
      this.emitterScrollAction.emit(this.currentPage + 1)
    }
  }

  @Input() dataSource: DataSoucer = { data: [], headers: [] };
  @Input() itemsPerPage: any;
  @Input() currentPage: any;
  @Input() loadData: any;
  @Output() emitterRowAction = new EventEmitter<EmitterData>();
  @Output() emitterScrollAction = new EventEmitter<number>();
}
