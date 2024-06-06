import { Observable } from 'rxjs';
import { HeaderOption } from './headerOptions';

export interface IUser {
  idusuario: number;
  ruta_imagen: string;
}

export abstract class UserData {
  abstract getUser$(): Observable<boolean>;
  abstract logOut$(): void;
}
