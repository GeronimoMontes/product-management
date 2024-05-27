import { Injectable } from "@angular/core";
import { TokenStoreService } from "./token.service";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: "root"
})
export class AuthService {

    constructor(
        protected readonly tokenService: TokenStoreService,
        protected readonly httpClient: HttpClient
    ) { }

    private isAuthenticate(): Observable<boolean> {
        this.tokenService.get()
        return new Observable((observable) => {
            return observable.next(this.tokenService.get() ? true : false);
        })
    }

    auth(body: { username: string, password: string }): any {
    const url= `${environment.API_URL}auth/login`;
        const options = {
            headers: {

            }
        }
        this.httpClient.post(url, body, options)
        .map(
            res =>
        );
    }

    get authenticate(): Observable<boolean> {
        return this.isAuthenticate();
    }
}