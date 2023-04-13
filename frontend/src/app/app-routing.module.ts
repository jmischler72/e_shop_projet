import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EcommerceComponent} from "./ecommerce/ecommerce.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [{path: '', component: EcommerceComponent},
  {path: 'login', component: LoginComponent},
  {path: 'cart', component: LoginComponent},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
