import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car/car';
import { CarDetail } from 'src/app/models/carDetails/carDetail';
import { CarImage } from 'src/app/models/carImage/carImage';
import { CarDetailService } from 'src/app/services/carDetailService/car-detail.service';
import { CarService } from 'src/app/services/carService/car.service';
import { DomSanitizer } from '@angular/platform-browser';
import { VirtualTimeScheduler } from 'rxjs';

@Component({
  selector: 'app-view-car',
  templateUrl: './view-car.component.html',
  styleUrls: ['./view-car.component.css']
})
export class ViewCarComponent implements OnInit {
  carDetails: CarDetail[]
  cars: Car[]
  currentCar:Car
  carImages:CarImage[]

  constructor(private carService: CarService, private toastr: ToastrService,
     private router: Router, private carDetailService:CarDetailService, private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.getCars()
    this.get()
    this.getAll()
  }

  getCars() {
    this.carService.getCars().subscribe(response => {
      this.carDetails = response.data
      // console.log(this.carDetails)
    }, errorResult => {
      this.toastr.error("Bir hata oluştu", "Üzgünüz")
    })
  }

  get() {
    this.carService.get().subscribe(response => {
      this.cars = response.data
    }, errorResult => {
      this.toastr.error("Bir hata oluştu", "Üzgünüz")
    })
  }

  getById(carId: number) {
    this.carService.getById(carId).subscribe(response => {
      this.currentCar = response.data
    }, errorResult => {
      this.toastr.error("Bir hata oluştu")
    })
  }

  delete(car: CarDetail) {
    for (let i = 0; i < this.cars.length; i++) {
      if (this.cars[i].id === car.carId) {
        console.log(this.cars[i].id)
        this.carService.delete(this.cars[i]).subscribe(response => {
          window.location.reload()
          this.toastr.info("İşlem başarılı")
        }, errorResponse => {
          console.log(errorResponse.error)
        })
      }
    }
  }

  getAll() {
    this.carDetailService.getAll().subscribe(response=>{
      this.carImages = response.data
    })
  }


  goUpdate(carId:number){  
    let newUrl = "admin/update/car/" + carId
    this.router.navigateByUrl(newUrl)  
  }
}
