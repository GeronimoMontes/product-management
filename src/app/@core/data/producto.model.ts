import { Observable } from 'rxjs';
import { HeaderOption } from './headerOptions';

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
}

export abstract class ProductData extends HeaderOption {
  abstract getAllProducts$(skip: number, limit: number, search: string): Observable<IProduct[]>;
  abstract getProduct$(id: string): Observable<IProduct>;
  abstract createProduct$(product: IProduct): Observable<IProduct>;
  abstract deleteProduct$(id: string, product: IProduct): Observable<any>;
  abstract updateProduct$(id: string, product: IProduct): Observable<any>;
}
