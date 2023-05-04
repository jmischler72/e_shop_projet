import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

import {User} from "../../models/users/User";
import {catchError, map, throwError} from "rxjs";
import {ProductOrder} from "../../ProductOrder";
import {JwtTokenResponse} from "../../models/auth/JwtTokenResponse";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userMeUrl = "/api/users";
  private orderUrl = "/api/order";
  private errorData: { errorDesc: string; errorTitle: string };


  constructor(private http: HttpClient) {
  }

  getUserInfo(){
    return this.http.get<User>(this.userMeUrl+"/me");
  }

  getUserInfoFromId(id: number){
    return this.http.get<User>(this.userMeUrl+"/"+id);
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {

      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {

      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }

    // return an observable with a user-facing error message
    this.errorData = {
      errorTitle: 'Oops! Request for document failed',
      errorDesc: 'Something bad happened. Please try again later.'
    };
    return throwError(this.errorData);
  }

  addOrder(shoppingCart: ProductOrder[], userId: number) {

    return this.http.post<ProductOrder[]>(this.orderUrl+"/create/" +userId, {"productItems": shoppingCart})
      .pipe(map(result => {
          return result;

        }),
        catchError(this.handleError)
      );

  }
}
