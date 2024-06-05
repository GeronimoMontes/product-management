import { Component, EventEmitter, Input, Output } from '@angular/core';

export type Action = 'view' | 'add' | 'update' | 'delete';

export interface ActionTable {
  action: Action;
  rowSelected: any;
}

export interface DataSoucer {
  headers: string[];
  data: any;
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

  @Input() dataSource: any;
  @Input() itemsPerPage: any;
  @Input() currentPage: any;
  @Input() loadData: any;
  @Output() emitterRowAction = new EventEmitter<EmitterData>();
}
