import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { AlertService } from '../../services/alert/alert.service';
import { SpinnerService } from '../../services/spinner/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
    public spinnerService: SpinnerService
  ) {}

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      console.log('d');
      this.router.navigateByUrl('');
    }

    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.email?.value, this.password?.value).subscribe({
      next: () => {
        console.log('User is logged in');
        this.router.navigateByUrl('/');
      },
      error: error => {
        this.alertService.error(error);
      },
    });
  }
}
