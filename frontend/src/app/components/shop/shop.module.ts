import { NgModule } from '@angular/core';
import { UserComponent } from './user/user.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop.component';
import { ProductsCarouselComponent } from './home/products-carousel/products-carousel.component';
import { ProductsListComponent } from './home/products-list/products-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchbarProductsComponent } from './home/products-list/searchbar-products/searchbar-products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { ShopRoutingModule } from './shop-routing.module';
import { OutsideClickDirective } from './home/products-list/searchbar-products/outside-click.directive';
import { ShoppingCartComponent } from './home/shopping-cart/shopping-cart.component';
import { FooterComponent } from './footer/footer.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsTableComponent } from './home/products-list/products-table/products-table.component';
import { QuantitySelectorComponent } from '../reusable/quantity-selector/quantity-selector.component';

@NgModule({
  declarations: [
    ShopComponent,
    HomeComponent,
    UserComponent,
    CartComponent,
    ProductsCarouselComponent,
    ProductsListComponent,
    NavbarComponent,
    SearchbarProductsComponent,
    OutsideClickDirective,
    ShoppingCartComponent,
    FooterComponent,
    ProductDetailsComponent,
    ProductsTableComponent,
    QuantitySelectorComponent,
  ],
  imports: [
    RouterModule,
    FormsModule,
    MatIconModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    CdkTableModule,
    NgOptimizedImage,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    CommonModule,
    ShopRoutingModule,
  ],
  exports: [],
})
export class ShopModule {}
