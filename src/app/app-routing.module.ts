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


const routes: Routes = [
  {path:"",component:CarComponent},
  {path:"cars",component:CarComponent},
  {path:"cars/brand/:brandId", component:CarComponent},
  {path:"cars/color/:colorId", component:CarComponent},
  {path:"cardetails",component:CarDetailComponent},
  {path:"cardetails/:carId",component:CarDetailComponent},
  {path:"customers",component:CustomerComponent},
  {path:"rentals",component:RentalComponent},
  {path:"rent", component:RentComponent},
  {path:"rent/:carId",component:RentComponent},
  {path:"admin/view/car",component:ViewCarComponent},
  {path:"admin/add/car",component:CarAddComponent},
  {path:"admin/update/car/:carId",component:CarUpdateComponent},

  {path:"admin/view/brand",component:RentComponent},
  {path:"admin/add/brand/:brandId",component:RentComponent},
  {path:"admin/add/color/:colorId",component:RentComponent},
  {path:"admin/view/color",component:RentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
