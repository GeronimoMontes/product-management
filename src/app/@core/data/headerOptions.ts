import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export abstract class HeaderOption {
  protected baseURL: string = environment.API_URL;

  constructor(httpClient: HttpClient) { }

  get token(): string {
    const token = localStorage.getItem('auth_app_token');
    return token ? JSON.parse(token).value : "undefined_token";
  }

  protected getOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      }),
    };
  }
}
