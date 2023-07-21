import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { JwtInterceptor } from './helpers/JwtInterceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkTableModule } from '@angular/cdk/table';
import { NgOptimizedImage } from '@angular/common';
import { SnackbarInterceptor } from './helpers/SnackbarInterceptor';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AlertComponent } from './components/shop/alert/alert.component';
import { LoadingInterceptor } from './helpers/LoadingInterceptor';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { ShopModule } from './components/shop/shop.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginBackgroundComponent } from './components/login/login-background/login-background.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AlertComponent,
    NotFoundComponent,
    LoginBackgroundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CdkTableModule,
    NgOptimizedImage,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    ShopModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SnackbarInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    AuthGuardService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
