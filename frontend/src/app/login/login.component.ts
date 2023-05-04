import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService, JwtResponse} from "../services/authServices/auth.service";
import {StorageService} from "../services/authServices/storage.service";
import {JwtTokenResponse} from "../services/authServices/JwtTokenResponse";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  private error = {};
  private loginError: string;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService
  ) {
  }

  ngOnInit() {
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
