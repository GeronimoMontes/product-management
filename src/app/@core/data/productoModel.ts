import { Observable } from 'rxjs';
import { HeaderOption } from './headerOptions';

export interface IProduct {
  _id: number;
  nombre: string;
  descripcion: string;
  precio: number;
}

export abstract class ProductData extends HeaderOption {
  abstract getAllProducts$(): Observable<IProduct[]>;
  abstract getProduct$(id: number): Observable<IProduct>;
  abstract createProduct$(id: number, product: IProduct): Observable<IProduct>;
  abstract deleteProduct$(id: number, product: IProduct): Observable<any>;
  abstract updateProduct$(id: number, product: IProduct): Observable<any>;
}
