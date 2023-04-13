import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../user.service";
import {Router} from "@angular/router";

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
    private userService: UserService
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
    // @ts-ignore
    this.userService.login( this.email.value, this.password.value).subscribe((data) => {

        if (this.userService.isLoggedIn()) {
          this.router.navigate(["/"]);
        } else {
          this.loginError = 'email or password is incorrect.';
        }
      },
      error => this.error = error
    );

  }
}
