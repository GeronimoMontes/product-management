import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { IProduct, ProductData } from '../../../@core/data/producto.model';
import { ModalService } from '../../../@core/root/modal.service';
import { FormProductComponent } from '../form-product/form-product.component';
import { NotificationService } from '../../../@theme/components/notification/notification.service';
import { DataSoucer, PaginateData } from '../../../@theme/components';
import { SearchService } from '../../../@core/root/search.service';

@Component({
  selector: 'app-table-scroll-product',
  templateUrl: './table-scroll-product.component.html',
  styleUrls: ['./table-scroll-product.component.css'],
})
export class TableScrollProductComponent implements OnInit, OnDestroy {
  constructor(
    protected readonly productService: ProductData,
    protected readonly modalService: ModalService,
    protected readonly notificationService: NotificationService,
    protected readonly searchService: SearchService
  ) { }

  ngOnInit() {
    this.searchService.currentSearchQuery
      .pipe(takeUntil(this.destroy$))
      .subscribe(query => {
        this.search = query;
        if (this.search !== '')
          this.datasource.data = [];
        this.fetchData()
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSearchChange($event: any) {
    this.searchService.changeSearchQuery($event.target.value);
  }

  onScrollEvent($event: any) {
    this.paginate.current = $event;
    this.loaddata = true
    this.searchService.changeSearchQuery(this.search);
  }

  private fetchData() {
    this.loaddata = true;

    this.productService
      .getAllProducts$(this.paginate.current, this.paginate.items_per_page, this.search)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datasource.data = this.datasource.data.concat(data.data)
        this.paginate.results_count = + data.resultsCount;
        this.paginate.count_pages = data.countPages;
        this.paginate.count_current_data += data.count_current_data;

        console.log(this.datasource)
        this.loaddata = false;
      });
  }

  public showModal(product?: IProduct) {
    this.modalService
      .openModal(FormProductComponent, product)
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        console.log('Modal closed with result:', result);
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
    render_only_totalElements: false,
  }
}
