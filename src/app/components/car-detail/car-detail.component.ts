import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car/car';
import { CarDetail } from 'src/app/models/carDetails/carDetail';
import { CarImage } from 'src/app/models/carImage/carImage';
import { CarDetailService } from 'src/app/services/carDetailService/car-detail.service';
import { CarService } from 'src/app/services/carService/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  car: CarDetail
  carImages: CarImage[]

  constructor(private carDetailService: CarDetailService, private activatedRoute: ActivatedRoute, private sanitizer:DomSanitizer,
    private carService:CarService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.getCarDetail(params["carId"])
      this.getCarImagesByCarId(params["carId"])
      console.log(params["carId"])
    })
  }

  setImageSource(path:string){
    let newPath = this.sanitizer.bypassSecurityTrustUrl("https://localhost:44302/images/" + path)
    return newPath
  }


  getCarDetail(carId: number) {
    this.carDetailService.getCarById(carId).subscribe(response => {
      this.car = response.data
    })
  }


  getCarImagesByCarId(carId: number) {
    this.carDetailService.getCarImagesByCarId(carId).subscribe(response=>{
      this.carImages = response.data
    })
  }

  buy(car:CarDetail){
  }
}
