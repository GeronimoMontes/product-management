import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IProduct, ProductData } from '../../../@core/data/productoModel';
import { ModalService } from '../../../@core/root/modal.service';
import { FormProductComponent } from '../form-product/form-product.component';
import { DeleteProductComponent } from '../delete-product/delete-product.component';
import { NotificationService } from '../../../@theme/components/notification/notification.service';
import { DataSoucer, PaginateData } from '../../../@theme/components';

@Component({
  selector: 'app-table-products',
  templateUrl: './table-product.component.html',
  styleUrls: ['./table-product.component.css'],
})
export class TableProductComponent implements OnInit, OnDestroy {
  constructor(
    protected readonly productService: ProductData,
    protected readonly modalService: ModalService,
    protected readonly notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.fetchData();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  searchEvent($event: any) {
    this.search = $event;
    this.paginate.current = 1;
    this.fetchData();
  }
  perPageChangeEmitter($event: number) {
    this.paginate.perPage = $event
    this.fetchData();
  }
  pageChangeEmitter($event: number) {
    this.paginate.current = $event
    this.fetchData();
  }

  private fetchData() {
    this.loaddata = true;
    const { current, perPage } = this.paginate;

    this.productService
      .getAllProducts$(current, perPage, this.search)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datasource.data = data.data;
        this.paginate.resultsCount = data.documents_count;
        this.paginate.countPages = data.page_total;
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

  // public showDialogDelete(product: IProduct) {
  //   this.modalService
  //     .openModal(DeleteProductComponent, product)
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe((result: boolean) => {
  //       if (result) {
  //         this.productService
  //           .deleteProduct$(product._id, product)
  //           .pipe(takeUntil(this.destroy$))
  //           .subscribe((response) => {
  //             this.notificationService.showNotification({
  //               title: `Delete Product`,
  //               type: 'success',
  //               message: `El producto ${product.name} se ha eliminado.`,
  //               duration: 5000,
  //             });
  //             this.fetchData();
  //           });
  //       }
  //     });
  // }

  private destroy$: Subject<void> = new Subject<void>();
  public loaddata: boolean = false;

  public datasource: DataSoucer = {
    data: [],
    headers: ['name', 'description', 'price'],
  };
  public search: string = '';
  protected paginate: PaginateData = {
    current: 1,
    perPage: 25,
    countPages: 0,
    resultsCount: 0
  };
}
