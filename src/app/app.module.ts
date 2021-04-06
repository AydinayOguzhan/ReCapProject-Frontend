import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaviComponent } from './components/navi/navi.component';
import { CarComponent } from './components/car/car.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { RouterModule } from '@angular/router';
import { CarDetailComponent } from './components/car-detail/car-detail.component';

import {ToastrModule} from 'ngx-toastr';
import { CarFilterPipe } from './pipes/carFilterPipe/car-filter.pipe';
import { BrandFilterPipe } from './pipes/brandFilter/brand-filter.pipe';
import { ColorFilterPipe } from './pipes/colorFilter/color-filter.pipe';
import { RentComponent } from './components/rent/rent.component';
import { ViewCarComponent } from './components/car-view/view-car.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { BrandViewComponent } from './components/brand-view/brand-view.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { ColorViewComponent } from './components/color-view/color-view.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth/auth.interceptor';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';
import { CustomerUpdateComponent } from './components/customer-update/customer-update.component';

@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    CarComponent,
    BrandComponent,
    ColorComponent,
    CustomerComponent,
    RentalComponent,
    CarDetailComponent,
    CarFilterPipe,
    BrandFilterPipe,
    ColorFilterPipe,
    RentComponent,
    ViewCarComponent,
    CarAddComponent,
    CarUpdateComponent,
    BrandViewComponent,
    BrandAddComponent,
    BrandUpdateComponent,
    ColorViewComponent,
    ColorAddComponent,
    ColorUpdateComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    CustomerUpdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
