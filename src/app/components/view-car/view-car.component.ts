import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car/car';
import { CarBase } from 'src/app/models/car/carBase';
import { CarDetail } from 'src/app/models/carDetails/carDetail';
import { CarService } from 'src/app/services/carService/car.service';

@Component({
  selector: 'app-view-car',
  templateUrl: './view-car.component.html',
  styleUrls: ['./view-car.component.css']
})
export class ViewCarComponent implements OnInit {
  carDetails: CarDetail[]
  cars: Car[]
  currentCar: CarBase

  constructor(private carService: CarService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.getCars()
    this.get()
  }

  getCars() {
    this.carService.getCars().subscribe(response => {
      this.carDetails = response.data
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

}
