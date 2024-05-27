import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct, ProductData } from '../data/productoModel';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductoService extends ProductData {

  constructor(
    protected httpClient: HttpClient,

  ) {
    super(httpClient)
  }

  getAllProducts$(): Observable<IProduct[]> {
    return new Observable(obs => obs.next())
  }
  getProduct$(id: number): Observable<IProduct> {
    return new Observable(obs => obs.next())
  }
  createProduct$(id: number, product: IProduct): Observable<IProduct> {
    return new Observable(obs => obs.next())
  }
  deleteProduct$(id: number, product: IProduct): Observable<any> {
    return new Observable(obs => obs.next())
  }
  updateProduct$(id: number, product: IProduct): Observable<any> {
    return new Observable(obs => obs.next())
  }


}
