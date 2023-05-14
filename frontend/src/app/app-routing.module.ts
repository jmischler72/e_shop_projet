import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./shopComponents/home/home.component";
import {LoginComponent} from "./shopComponents/login/login.component";
import {UserComponent} from "./shopComponents/user/user.component";
import {CartComponent} from "./shopComponents/cart/cart.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'user', component: UserComponent},
  {path: 'signup', component: UserComponent},
  {path: 'cart', component: CartComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
