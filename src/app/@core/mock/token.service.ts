import { Injectable } from '@angular/core';

export type TokenStorage = string | null;

@Injectable({
  providedIn: 'root',
})
export class TokenStoreService {
  private readonly keyStorage = 'token';

  constructor() {}

  public set(token: string) {
    localStorage.setItem(this.keyStorage, token);
  }

  public get(): TokenStorage {
    const token = localStorage.getItem(this.keyStorage);
    return token;
  }
  public clear(): void {}
}
