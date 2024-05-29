import { Observable } from 'rxjs';
import { HeaderOption } from './headerOptions';

export interface IProduct {
  _id: number;
  name: string; 
  description: string; 
  price: number; 
} 

export abstract class ProductData extends HeaderOption {
  abstract getAllProducts$(): Observable<IProduct[]>;
  abstract getProduct$(id: number): Observable<IProduct>;
  abstract createProduct$(product: IProduct): Observable<IProduct>;
  abstract deleteProduct$(id: number, product: IProduct): Observable<any>;
  abstract updateProduct$(id: number, product: IProduct): Observable<any>;
}
