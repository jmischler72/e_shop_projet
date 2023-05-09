import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";
import {StorageService} from "../../services/auth/storage.service";
import {JwtTokenResponse} from "../../models/auth/JwtTokenResponse";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService
  ) {
  }

  ngOnInit() {

    if (this.storageService.isLoggedIn()){
      this.router.navigateByUrl('/');
    }

    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit() {
    const val = this.loginForm.value;
    if(val.email && val.password){
      this.authService.login( val.email, val.password).subscribe(
        (res: JwtTokenResponse) => {
          this.storageService.saveJwtToken(res.accessToken);
          console.log("User is logged in");
          this.router.navigateByUrl('/');
        },
      );
    }
  }
}
