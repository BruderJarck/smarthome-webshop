import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//prime ng imports
import { ChartModule } from 'primeng/chart';
import { InputNumberModule } from 'primeng/inputnumber';

//import components from ./components
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { DiscaimerDialog, Login, NavComponent } from './components/nav/nav.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { SensorDataComponent } from './components/sensor-data/sensor-data.component';
import { ShopComponent } from './components/shop/shop.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { LoginFailedComponent } from './components/login-failed/login-failed.component';
import { RegisterNewUserComponent } from './components/register-new-user/register-new-user.component';
import { FilteringPanelComponent } from './components/filtering-panel/filtering-panel.component';

// import components from './pages';
import { SharedModule } from './shared/shared-module';
import { SharedService } from './shared/shared.service';
import { UserpageComponent } from './components/userpage/userpage.component';
import { EditAccountComponent } from './components/edit-account/edit-account.component';

import { AuthInterceptor } from './auth-interceptor';
import { KasseComponent } from './components/kasse/kasse.component';
import { UserMsgComponent } from './components/user-msg/user-msg.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';
import { SortingPanelComponent } from './components/sorting-panel/sorting-panel.component';
import { PaginationPanelComponent } from './components/pagination-panel/pagination-panel.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    // ...components,
    ShopComponent,
    CartComponent,
    NavComponent,
    Login,
    DiscaimerDialog,
    CategoriesComponent,
    SidebarComponent,
    ProductDetailComponent,
    SensorDataComponent,
    ProductListComponent,
    MainPageComponent,
    LoginFailedComponent,
    UserpageComponent,
    EditAccountComponent,
    RegisterNewUserComponent,
    KasseComponent,
    UserMsgComponent,
    FilteringPanelComponent,
    FooterComponent,
    SortingPanelComponent,
    PaginationPanelComponent

  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    //primeng modules
    ChartModule,
    InputNumberModule,
    MatDialogModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    SharedService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
