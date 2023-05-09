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


  public isLoggedIn(){
    const token = localStorage.getItem(JWTTOKEN);

    if(!!token){
      console.log(token);
      const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
      if ((Math.floor((new Date).getTime() / 1000)) >= expiry){
        this.clean();
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
