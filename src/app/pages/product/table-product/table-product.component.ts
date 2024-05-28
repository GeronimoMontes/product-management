import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IProduct, ProductData } from '../../../@core/data/productoModel';

@Component({
  selector: 'app-table-products',
  templateUrl: './table-product.component.html',
  styleUrls: ['./table-product.component.css'],
})
export class TableProductComponent implements OnInit, OnDestroy {
  constructor(protected readonly productService: ProductData) {}

  ngOnInit() {
    this.productService.getAllProducts$().subscribe((data: IProduct[]) => {
      this.loadingData = !this.loadingData;
      this.products = data;
      this.loadingData = !this.loadingData;
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get loading$(): Observable<boolean> {
    return new Observable((obs) => obs.next(this.loadingData));
  }

  private destroy$: Subject<void> = new Subject<void>();
  public loadingData: boolean = false;
  protected products: IProduct[] = [];
}
