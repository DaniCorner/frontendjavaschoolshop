import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';

import { Routes, RouterModule} from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';

import { HomeComponent } from './pages/home/home.component';
import { authInterceptorProviders } from './services/auth.interceptor';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/admin.guard';
import { NormalGuard } from './services/normal.guard';

import {MatButtonModule} from '@angular/material/button';
import {MatListModule } from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';

import { ProfileComponent } from './pages/admin/profile/profile.component';
import { SidebarComponent } from './pages/admin/sidebar/sidebar.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ViewOrdersComponent } from './services/view-orders/view-orders.component';
import { OrdersListComponent } from './pages/admin/orders-list/orders-list.component';
import { ProductListAdminComponent } from './pages/admin/product-list-admin/product-list-admin.component';
import { CategoryListAdminComponent } from './pages/admin/category-list-admin/category-list-admin.component';
import { StatisticsComponent } from './pages/admin/statistics/statistics.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { InfoComponent } from './pages/info/info.component';

//When I enter in the path "chekout" I'll receive all Checkoutcomponent, etc
const routes: Routes = [
  { path : 'info', component : InfoComponent, pathMatch : 'full' },
  { path : 'home', component : HomeComponent, pathMatch : 'full' },
  { path : 'signup', component : SignupComponent, pathMatch : 'full' },
  { path : 'login', component : LoginComponent, pathMatch : 'full' },
  { path:'admin', component:DashboardComponent, canActivate:[AdminGuard],
    children: [
      {path:'profile', component:ProfileComponent},
      {path: 'orders-list', component: OrdersListComponent },
      {path: 'product-list-admin', component: ProductListAdminComponent},
      {path: 'category-list-admin', component: CategoryListAdminComponent},
      {path: 'statistics', component: StatisticsComponent},
      {path: '', component: WelcomeComponent }]   },
  { path:'user-dashboard',    component:UserDashboardComponent, pathMatch:'full', canActivate:[NormalGuard]  },
  { path: 'checkout', component: CheckoutComponent},
  { path: 'cart-details', component: CartDetailsComponent},
  { path: 'products/:id', component: ProductDetailsComponent},
  { path: 'search/:keyword', component: ProductListComponent},
  { path: 'category/:id', component: ProductListComponent},
  { path: 'category', component: ProductListComponent},
  { path: 'products', component: ProductListComponent},
  //{ path: '', redirectTo: '/products', pathMatch: 'full'},
  //{ path: '**', redirectTo: '/products', pathMatch: 'full'},
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    AppComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    UserDashboardComponent,
    ProfileComponent,
    SidebarComponent,
    WelcomeComponent,
    ViewOrdersComponent,
    OrdersListComponent,
    ProductListAdminComponent,
    CategoryListAdminComponent,
    StatisticsComponent,
    InfoComponent
    ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatGridListModule
  ],
  providers: [ProductService, authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
