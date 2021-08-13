import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car/car';
import { CarDetail } from 'src/app/models/carDetails/carDetail';
import { CarService } from 'src/app/services/carService/car.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars: CarDetail[] = [];
  currentCar:CarDetail
  filterText:string=""
  
  
  constructor(private carService: CarService, private activatedRoute:ActivatedRoute,private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"]){
        this.getCarsByBrandId(params["brandId"])
      }else if(params["colorId"]){
        this.getCarsByColorId(params["colorId"])
      }else{
        this.getCars()
      }
    })
  }

  getCars() {
    this.carService.getCars().subscribe(response => { 
      this.cars = response.data;
      console.log(this.cars)
    })
  }

  getCarsByBrandId(brandId:number){
    this.carService.getCarsByBrandId(brandId).subscribe(response=>{
      this.cars = response.data
    })
  }

  getCarsByColorId(colorId:number){
    this.carService.getCarsByColorId(colorId).subscribe(response=>{
      this.cars = response.data
    })
  }

  setCurrentCar(car:CarDetail){
    this.currentCar = car
  }

  setImageSource(path:string){
    let newPath = this.sanitizer.bypassSecurityTrustUrl("https://localhost:44302/images/" + path)
    return newPath
  }
}
