import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './shopComponents/home/home.component';
import {ProductsComponent} from './shopComponents/home/products/products.component';
import {LoginComponent} from './shopComponents/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from '@angular/material/icon';
import {FilterPipe} from './shopComponents/home/filter.pipe';
import {ShoppingCartComponent} from './shopComponents/home/shopping-cart/shopping-cart.component'
import { JwtInterceptor } from "./helpers/JwtInterceptor";
import { NavbarComponent } from './shopComponents/home/navbar/navbar.component';
import { UserComponent } from './shopComponents/user/user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ProductsTableComponent} from "./shopComponents/home/products-table/products-table.component";
import {CdkTableModule} from "@angular/cdk/table";
import {NgOptimizedImage} from "@angular/common";
import {SnackbarInterceptor} from "./helpers/SnackbarInterceptor";
import { SearchbarProductsComponent } from './shopComponents/home/products-table/searchbar-products/searchbar-products.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import { ProductsCarouselComponent } from './shopComponents/home/products-carousel/products-carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    ProductsTableComponent,
    LoginComponent,
    FilterPipe,
    ShoppingCartComponent,
    NavbarComponent,
    UserComponent,
    SearchbarProductsComponent,
    ProductsCarouselComponent
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
    MatSelectModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}, {provide: HTTP_INTERCEPTORS, useClass: SnackbarInterceptor, multi: true},],
  bootstrap: [AppComponent]
})
export class AppModule {
}
