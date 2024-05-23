import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { SensorDataComponent } from './components/sensor-data/sensor-data.component';
import { UserpageComponent } from './components/userpage/userpage.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { AccountService } from './shared/account.service';
import { EditAccountComponent } from './components/edit-account/edit-account.component';
import { RegisterNewUserComponent } from './components/register-new-user/register-new-user.component';
import { KasseComponent } from './components/kasse/kasse.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  {path: '', redirectTo: '/product-list', pathMatch: 'full' },
  {
    path: '',
    component: MainPageComponent,
    children: [
      { path: 'cart', component: CartComponent },
      { path: 'product-list', component: ProductListComponent },
      { path: 'detail/:id', component: ProductDetailComponent },
      { path: 'register', component: RegisterNewUserComponent },
      { path: 'checkout', component: KasseComponent},
      { path: 'error', component: ErrorComponent},
      { path: 'sensors', component: SensorDataComponent},
      { 
        path: 'user', 
        component: UserpageComponent,
        canActivate: [AccountService],
        children: [
          { path: 'edit', component: EditAccountComponent },
        ]
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
