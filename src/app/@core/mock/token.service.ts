import { Injectable } from "@angular/core";

@Injectable()
export class TokenStoreService {
    private readonly keyStorage = "token";

    constructor() { }

    public set(token: string) { }
    public get(): string | null {
        const token = localStorage.getItem(this.keyStorage)
        return token;
    }
    public clear(): void { }
}