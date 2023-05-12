import { Injectable } from '@angular/core';

const JWTTOKEN = 'jwtToken';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  removeJwtToken(): void {
    localStorage.removeItem(JWTTOKEN);
  }

  public saveJwtToken(jwt: string): void {
    localStorage.removeItem(JWTTOKEN);
    localStorage.setItem(JWTTOKEN, jwt);
  }


  public isJwtTokenValid(){
    const token = localStorage.getItem(JWTTOKEN);

    if(!!token){
      const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
      if ((Math.floor((new Date).getTime() / 1000)) >= expiry){
        this.removeJwtToken();
        return false;
      }else{
        return true;
      }
    }
    return false;
  }

  public getJwtToken(): string | null {
    return localStorage.getItem(JWTTOKEN);
  }
}
