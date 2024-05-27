import { Observable } from 'rxjs';
import { HeaderOption } from './headerOptions';

export interface IUser {
  idusuario: number;
  ruta_imagen: string;
}

export abstract class UserData extends HeaderOption {
  abstract getUser$(): Observable<IUser>;
  abstract logOut$(): void;
}
