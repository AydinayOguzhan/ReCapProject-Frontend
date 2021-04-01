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

  {path:"admin/view/brand",component:BrandViewComponent},
  {path:"admin/add/brand",component:BrandAddComponent},
  {path:"admin/update/brand/:brandId",component:BrandUpdateComponent},

  {path:"admin/view/color",component:ColorViewComponent},
  {path:"admin/add/color",component:ColorAddComponent},
  {path:"admin/update/color/:colorId",component:ColorUpdateComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
