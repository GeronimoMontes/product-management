import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
export interface PaginateData {
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPageCount: number;
  render_only_totalElements: boolean;
}

@Component({
  selector: 'app-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.css'],
})
export class PaginateComponent implements OnChanges, OnInit {
  ngOnInit(): void {
    this.pages = this.getPages(this.currentPage, this.totalPages)
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes['currentPage'] && changes['currentPage'].currentValue) ||
      (changes['totalPages'] && changes['totalPages'].currentValue)
    ) {
      this.pages = this.getPages(this.currentPage, this.totalPages);
    }
  }
  public onChangePage(page: number): void {
    this.changePage.emit(page);
  }

  public onNext(): void {
    this.next.emit(this.currentPage + 1);
  }

  public onPrevious(): void {
    this.previous.next(this.currentPage - 1);
  }

  public onFirst(): void {
    this.onChangePage(1);
  }

  public onLast(): void {
    this.onChangePage(this.totalPages);
  }

  public onPerPage($event: any): void {
    this.perPage.emit($event.target.value);
  }

  private getPages(current: number, total: number): number[] {
    if (total <= 3) {
      return [...Array(total).keys()].map((x) => ++x);
    }

    if (current >= 3) {
      if (current >= total - 2) {
        return [total - 2, total - 1, total];
      } else {
        return [current - 1, current, current + 1];
      }
    }

    return [1, 2, 3];
  }

  public pages: number[] = [];

  @Input() totalPages!: number;
  @Input() currentPage!: number;
  @Input() itemsPerPage!: number;
  @Input() totalItems!: number;
  @Input() itemsPerPageCount!: number;
  @Input() render_only_totalElements!: boolean;

  @Output() changePage: EventEmitter<number> = new EventEmitter<number>();
  @Output() next: EventEmitter<number> = new EventEmitter<number>();
  @Output() previous: EventEmitter<number> = new EventEmitter<number>();
  @Output() perPage: EventEmitter<number> = new EventEmitter<number>();
}
