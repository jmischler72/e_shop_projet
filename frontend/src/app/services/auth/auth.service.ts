import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {JwtTokenResponse} from "../../models/auth/JwtTokenResponse";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private signInUrl = "/api/auth/signin";

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string) {
    return this.http.post<JwtTokenResponse>(this.signInUrl, {email, password})
  }


}
