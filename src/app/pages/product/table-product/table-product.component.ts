import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { IProduct, ProductData } from '../../../@core/data/productoModel';
import { ModalService } from '../../../@core/root/modal.service';
import {
  FormProductComponent,
  FormProductAction,
  FormProductData,
} from '../form-product/form-product.component';
import {
  DeleteProductComponent,
  DeleteProductResponse,
} from '../delete-product/delete-product.component';
import { NotificationService } from '../../../@theme/components/notification/notification.service';

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

  private fetchData() {
    this.loadingData = !this.loadingData;
    this.productService
      .getAllProducts$()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: IProduct[]) => {
        this.products = data;
        this.loadingData = !this.loadingData;
      });
  }

  public showModal(product?: IProduct) {
    const data: FormProductData = {
      action: product ? FormProductAction.UPDATE : FormProductAction.ADD,
      product: product,
    };
    this.modalService
      .openModal(FormProductComponent, data)
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
  public loadingData: boolean = false;
  protected products: IProduct[] = [];
}
