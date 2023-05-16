import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { AuthGuardService } from '../../services/auth/auth-guard.service';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop.component';

const routes: Routes = [
  {
    path: '',
    component: ShopComponent,
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'user',
        component: UserComponent,
        canActivate: [AuthGuardService],
      },
      { path: 'cart', component: CartComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopRoutingModule {}
