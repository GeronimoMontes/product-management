import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct, ProductData } from '../data/producto.model';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class ProductService extends ProductData {
  private readonly apiUrl = 'products'; // You can replace 'products' with your actual API endpoint

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }
  isNameTaken(name: string): Observable<boolean> {
    const options = {
      params: new HttpParams()
        .set('name', name.split(" ").filter(e => e !== '').join(" ").trim()),
    };
    return this.httpClient.get<boolean>(`${this.apiUrl}/name-unique/`, options);
  }

  // GET /products
  getAllProducts$(skip: number = 1, limit: number = 25, search: string = '') {
    const _skip = (skip - 1) * limit;

    const options = {
      params: new HttpParams()
        .set('skip', _skip)
        .set('limit', limit)
        .set('search', search.split(" ").filter(e => e !== '').join(" ").trim()),
    };

    return this.httpClient.get<IProduct[]>(`${this.apiUrl}`, options);
  }

  // GET /products/:id
  getProduct$(id: string): Observable<IProduct> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.get<IProduct>(url);
  }

  // POST /products
  createProduct$(product: Partial<IProduct>): Observable<IProduct> {
    return this.httpClient.post<IProduct>(this.apiUrl, product);
  }

  // PATCH /products/:id
  updateProduct$(id: string, product: Partial<IProduct>): Observable<IProduct> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.patch<IProduct>(url, product);
  }

  // DELETE /products/:id
  deleteProduct$(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.delete<any>(url);
  }

  productFetch$(action: ProductEventFetch, product: Partial<IProduct>) {
    return action === 'get'
      ? this.getAllProducts$()
      : action === 'create'
        ? this.createProduct$(product)
        : action === 'update'
          ? this.updateProduct$(<string>product._id, product)
          : this.deleteProduct$(<string>product._id);
  }
}

export type ProductEventFetch = 'get' | 'create' | 'update' | 'delete';
