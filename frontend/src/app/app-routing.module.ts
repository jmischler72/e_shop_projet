import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EcommerceComponent} from "./ecommerce/ecommerce.component";

const routes: Routes = [  { path: '', component: EcommerceComponent },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
