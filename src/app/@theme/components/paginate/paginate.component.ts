import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
export interface PaginateData {
  current: number,
  items_per_page: number,
  count_pages: number,
  results_count: number;
  count_current_data: number;
  render_only_totalElements: boolean;
}


@Component({
  selector: 'app-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.css'],
})
export class PaginateComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes['current'] && changes['current'].currentValue) ||
      (changes['total'] && changes['total'].currentValue)
    ) {
      this.pages = this.getPages(this.current, this.total);
    }
  }
  public onChangePage(page: number): void {
    this.changePage.emit(page);
  }

  public onNext(): void {
    this.next.emit(this.current + 1);
  }

  public onPrevious(): void {
    this.previous.next(this.current - 1);
  }

  public onFirst(): void {
    this.onChangePage(1);
  }

  public onLast(): void {
    this.onChangePage(this.total);
  }

  public onPerPage($event: any): void {
    this.perPage.emit($event.target.value);
  }


  private getPages(current: number, total: number): number[] {
    if (total <= 3) {
      return [...Array(total).keys()].map(x => ++x)
    }

    if (current >= 3) {
      if (current >= total - 2) {
        return [ total - 2, total - 1, total]
      } else {
        return [current - 1, current, current + 1]
      }
    }

    return [1, 2, 3]
  }

  public pages: number[] = [];

  @Input() total!: number;
  @Input() current!: number;
  @Input() itemsPerPage!: number;
  @Input() resultsCount!: number;
  @Input() count_current_data!: number;
  @Input() render_only_totalElements!: boolean;

  @Output() changePage: EventEmitter<number> = new EventEmitter<number>();
  @Output() next: EventEmitter<number> = new EventEmitter<number>();
  @Output() previous: EventEmitter<number> = new EventEmitter<number>();
  @Output() perPage: EventEmitter<number> = new EventEmitter<number>();
}
