import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IProduct, ProductData } from '../../../@core/data/productoModel';
import { ModalService } from '../../../@core/root/modal.service';
import {
  FormProductComponent,
  FormProductAction,
  FormProductData,
} from '../form-product/form-product.component';

@Component({
  selector: 'app-table-products',
  templateUrl: './table-product.component.html',
  styleUrls: ['./table-product.component.css'],
})
export class TableProductComponent implements OnInit, OnDestroy {
  constructor(
    protected readonly productService: ProductData,
    protected readonly modalService: ModalService,
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
    this.productService.getAllProducts$().subscribe((data: IProduct[]) => {
      this.products = data;
      this.loadingData = !this.loadingData;
    });
  }

  public showModal(product?: IProduct) {
    const data: FormProductData = {
      action: product ? FormProductAction.UPDATE : FormProductAction.ADD,
      product: product,
    };
    const modal$ = this.modalService.openModal(FormProductComponent, data);

    modal$.subscribe((result) => {
      console.log('Modal closed with result:', result);
      this.fetchData();
    });
  }

  get loading$(): Observable<boolean> {
    return new Observable((obs) => obs.next(this.loadingData));
  }

  private destroy$: Subject<void> = new Subject<void>();
  public loadingData: boolean = false;
  protected products: IProduct[] = [];
}
