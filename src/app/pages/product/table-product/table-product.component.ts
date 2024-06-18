import { Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IProduct, ProductData } from '../../../@core/data/producto.model';
import { ModalService } from '../../../@core/root/modal.service';
import { FormProductComponent } from '../form-product/form-product.component';
import { DeleteProductComponent } from '../delete-product/delete-product.component';
import { NotificationService } from '../../../@theme/components/notification/notification.service';
import { DataSoucer, PaginateData } from '../../../@theme/components';
import { SearchService } from '../../../@core/root/search.service';
import { DynamicComponentAbstract } from '../../../@theme/components/dynamic-component/dynamic.model';
import { DynamicComponentService } from '../../../@theme/components/dynamic-component/dynamic-component.service';

@Component({
  selector: 'app-table-products',
  templateUrl: './table-product.component.html',
  styleUrls: ['./table-product.component.css'],
})
export class TableProductComponent
  extends DynamicComponentAbstract
  implements OnInit, OnDestroy
{
  constructor(
    protected readonly productService: ProductData,
    protected readonly modalService: ModalService,
    protected readonly notificationService: NotificationService,
    protected readonly searchService: SearchService,
    dynamicComponentService: DynamicComponentService,
    viewContainerRef: ViewContainerRef
  ) {
    super(dynamicComponentService, viewContainerRef);
  }

  ngOnInit() {
    this.searchService.currentSearchQuery
      .pipe(takeUntil(this.destroy$))
      .subscribe((query) => {
        this.search = query;
        if (this.search !== '') this.datasource.data = [];
        this.paginate.currentPage = 1;
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
    this.paginate.itemsPerPage = $event;
    this.fetchData();
  }
  pageChangeEmitter($event: number) {
    this.paginate.currentPage = $event;
    this.fetchData();
  }

  private fetchData() {
    this.loadComponent();
    const { currentPage, itemsPerPage } = this.paginate;

    this.productService
      .getAllProducts$(currentPage, itemsPerPage, this.search)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datasource.data = data.data;
        this.paginate.currentPage = data.metadata.currentPage;
        this.paginate.totalItems = data.metadata.totalItems;
        this.paginate.totalPages = data.metadata.totalPages;
        this.paginate.itemsPerPageCount = data.metadata.itemsPerPageCount;
        this.destroyComponent();
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
    currentPage: 1,
    itemsPerPage: 25,
    totalPages: 0,
    totalItems: 0,
    itemsPerPageCount: 0,
    render_only_totalElements: true,
  };
}
