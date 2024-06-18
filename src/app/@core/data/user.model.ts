import { Observable } from 'rxjs';
import { HeaderOption } from './headerOptions';

export interface IUser {
  idusuario: number;
  ruta_imagen: string;
}

export interface IUserCredencials {
  username: string;
  password: string;
}

export abstract class UserData extends HeaderOption {
  abstract isAuthenticate(): Observable<boolean>;
  abstract login$(body: IUserCredencials): Observable<any>;
  abstract logOut$(): void;
}
