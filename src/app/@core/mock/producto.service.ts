import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct, ProductData } from '../data/productoModel';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductService extends ProductData {
  private readonly apiUrl = 'products'; // You can replace 'products' with your actual API endpoint

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  // GET /products
  getAllProducts$(): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(this.apiUrl);
  }

  // GET /products/:id
  getProduct$(id: number): Observable<IProduct> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.get<IProduct>(url);
  }

  // POST /products
  createProduct$(product: IProduct): Observable<IProduct> {
    return this.httpClient.post<IProduct>(this.apiUrl, product);
  }

  // PATCH /products/:id
  updateProduct$(id: number, product: Partial<IProduct>): Observable<IProduct> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.patch<IProduct>(url, product);
  }

  // DELETE /products/:id
  deleteProduct$(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.delete<any>(url);
  }
}
