import { Injectable } from '@angular/core';

const JWTTOKEN = 'jwtToken';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  clean(): void {
    localStorage.clear();
  }

  public saveJwtToken(jwt: string): void {
    localStorage.removeItem(JWTTOKEN);
    localStorage.setItem(JWTTOKEN, jwt);
  }

  public isLoggedIn(): boolean {
    const user = localStorage.getItem(JWTTOKEN);
    return !!user;
  }
}
