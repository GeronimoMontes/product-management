import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, skip, takeUntil } from 'rxjs';
import { IProduct, ProductData } from '../../../@core/data/productoModel';
import { ModalService } from '../../../@core/root/modal.service';
import { FormProductComponent } from '../form-product/form-product.component';
import { DeleteProductComponent } from '../delete-product/delete-product.component';
import { NotificationService } from '../../../@theme/components/notification/notification.service';
import { PaginateData } from '../../../@theme/components';

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
  ) {}

  ngOnInit() {
    this.fetchData();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  search($event: any) {
    this.fetchData();
  }

  changePage(value: number) {
    this.paramsFilter.skip = value
    this.fetchData();
  }

  private fetchData() {
    const { skip, limit, search } = this.paramsFilter;
    this.productService
      .getAllProducts$(skip, limit, search)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: IProduct[]) => {
        this.products = data;
        console.log({ data });
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

  public showDialogDelete(product: IProduct) {
    this.modalService
      .openModal(DeleteProductComponent, product)
      .pipe(takeUntil(this.destroy$))
      .subscribe((result: boolean) => {
        if (result) {
          this.productService
            .deleteProduct$(product._id, product)
            .pipe(takeUntil(this.destroy$))
            .subscribe((response) => {
              this.notificationService.showNotification({
                title: `Delete Product`,
                type: 'success',
                message: `El producto ${product.name} se ha eliminado.`,
                duration: 5000,
              });
              this.fetchData();
            });
        }
      });
  }

  private destroy$: Subject<void> = new Subject<void>();
  protected products: IProduct[] = [];
  protected paginate: PaginateData = {
    numberPages: 5,
    current: 1,
    next: 2,
    previous: -1,
    numberResult: 125,
  };

  public paramsFilter: {
    skip: number;
    limit: number;
    search: string;
  } = {
    skip: 1,
    limit: 24,
    search: '',
  };
}
