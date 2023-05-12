import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {JwtTokenResponse} from "../../models/auth/JwtTokenResponse";
import {StorageService} from "./storage.service";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private signInUrl = "/api/auth/signin";

  constructor(private http: HttpClient, private storageService: StorageService) {
  }

  login(email: string, password: string) {
    return this.http.post<JwtTokenResponse>(this.signInUrl, {email, password})
      .pipe(map(res => {
        this.storageService.saveJwtToken(res.accessToken);
      }));

  }

  logout() {
    this.storageService.removeJwtToken();
  }

  isLoggedIn(): boolean {
    return this.storageService.isJwtTokenValid();
  }


}
