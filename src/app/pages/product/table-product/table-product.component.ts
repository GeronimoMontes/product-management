import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IProduct, ProductData } from '../../../@core/data/producto.model';
import { ModalService } from '../../../@core/root/modal.service';
import { FormProductComponent } from '../form-product/form-product.component';
import { DeleteProductComponent } from '../delete-product/delete-product.component';
import { NotificationService } from '../../../@theme/components/notification/notification.service';
import { DataSoucer, PaginateData } from '../../../@theme/components';
import { SearchService } from '../../../@core/root/search.service';

@Component({
  selector: 'app-table-products',
  templateUrl: './table-product.component.html',
  styleUrls: ['./table-product.component.css'],
})
export class TableProductComponent implements OnInit, OnDestroy {
  constructor(
    protected readonly productService: ProductData,
    protected readonly modalService: ModalService,
    protected readonly notificationService: NotificationService,
    protected readonly searchService: SearchService
  ) {}

  ngOnInit() {
    this.searchService.currentSearchQuery
      .pipe(takeUntil(this.destroy$))
      .subscribe((query) => {
        this.search = query;
        if (this.search !== '') this.datasource.data = [];
        this.paginate.current = 1;
        this.fetchData();
      });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onSearchChange($event: any) {
    this.searchService.changeSearchQuery($event.target.value);
  }
  perPageChangeEmitter($event: number) {
    this.paginate.items_per_page = $event;
    this.fetchData();
  }
  pageChangeEmitter($event: number) {
    this.paginate.current = $event;
    this.fetchData();
  }

  private fetchData() {
    this.loaddata = true;
    const { current, items_per_page } = this.paginate;

    this.productService
      .getAllProducts$(current, items_per_page, this.search)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datasource.data = data.data;
        this.paginate.results_count = data.resultsCount;
        this.paginate.count_pages = data.countPages;
        this.paginate.count_current_data = data.count_current_data;
        this.loaddata = false;
      });
  }

  public showModal(product?: IProduct) {
    this.modalService
      .openModal(FormProductComponent, product)
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        this.fetchData();
      });
  }

  private destroy$: Subject<void> = new Subject<void>();
  public loaddata: boolean = false;

  public datasource: DataSoucer = {
    data: [],
    headers: ['name', 'description', 'price'],
  };
  public search: string = '';
  public paginate: PaginateData = {
    current: 1,
    items_per_page: 25,
    count_pages: 0,
    results_count: 0,
    count_current_data: 0,
    render_only_totalElements: true,
  };
}
