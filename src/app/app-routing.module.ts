import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentComponent } from './components/rent/rent.component';
import { RentalComponent } from './components/rental/rental.component';
import { ViewCarComponent } from './components/car-view/view-car.component';
import { BrandViewComponent } from './components/brand-view/brand-view.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { ColorViewComponent } from './components/color-view/color-view.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { LoginComponent } from './components/login/login.component';
import { LoginGuard } from './guards/login/login.guard';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';
import { CustomerUpdateComponent } from './components/customer-update/customer-update.component';
import { CarImageAddComponent } from './components/car-image-add/car-image-add.component';
import { AdminRentalsComponent } from './components/admin-rentals/admin-rentals.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { AdminUserUpdateComponent } from './components/admin-user-update/admin-user-update.component';


const routes: Routes = [
  {path:"",component:CarComponent},
  {path:"cars",component:CarComponent},
  {path:"cars/brand/:brandId", component:CarComponent},
  {path:"cars/color/:colorId", component:CarComponent},
  {path:"cardetails",component:CarDetailComponent},
  {path:"cardetails/:carId",component:CarDetailComponent},

  {path:"customer/update/:userId",component:CustomerUpdateComponent},
  {path:"customers",component:CustomerUpdateComponent},
  
  {path:"admin/customers",component:CustomerComponent,canActivate:[LoginGuard]},

  {path:"rentals",component:RentalComponent,canActivate:[LoginGuard]},
  {path:"rent", component:RentComponent,canActivate:[LoginGuard]},
  {path:"rent/:carId",component:RentComponent,canActivate:[LoginGuard]},
  
  {path:"admin/view/car",component:ViewCarComponent,canActivate:[LoginGuard]},
  {path:"admin/add/car",component:CarAddComponent,canActivate:[LoginGuard]},
  {path:"admin/update/car/:carId",component:CarUpdateComponent,canActivate:[LoginGuard]},
  
  {path:"admin/rentals",component:AdminRentalsComponent,canActivate:[LoginGuard]},
  
  {path:"admin/carImage/:carId",component:CarImageAddComponent,canActivate:[LoginGuard]},

  {path:"admin/view/brand",component:BrandViewComponent,canActivate:[LoginGuard]},
  {path:"admin/add/brand",component:BrandAddComponent,canActivate:[LoginGuard]},
  {path:"admin/update/brand/:brandId",component:BrandUpdateComponent,canActivate:[LoginGuard]},

  {path:"admin/view/color",component:ColorViewComponent,canActivate:[LoginGuard]},
  {path:"admin/add/color",component:ColorAddComponent,canActivate:[LoginGuard]},
  {path:"admin/update/color/:colorId",component:ColorUpdateComponent,canActivate:[LoginGuard]},

  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},

  {path:"user/:userId",component:UserComponent,canActivate:[LoginGuard]},
  {path:"admin/users",component:AdminUsersComponent,canActivate:[LoginGuard]},
  {path:"admin/user/update/:userId",component:AdminUserUpdateComponent,canActivate:[LoginGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
