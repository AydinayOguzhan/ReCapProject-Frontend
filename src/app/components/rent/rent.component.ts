import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, Validators, FormBuilder  } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car/car';
import { CarDetail } from 'src/app/models/carDetails/carDetail';
import { Rental } from 'src/app/models/rental/rental';
import { RentService } from 'src/app/services/rentService/rent.service';


@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']
})
export class RentComponent implements OnInit {
  rentForm:FormGroup
  currentCar:CarDetail
  rental:Rental
  canRent:boolean
  
  constructor(private formBuilder:FormBuilder, private activatedRoute:ActivatedRoute, private rentService:RentService,
    private router:Router, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.getCarDetails(params["carId"])
      this.canItBeRented(params["carId"])
    })
    this.createRentForm()
  }


  createRentForm(){
    this.rentForm = this.formBuilder.group({
      cardNumber:["",Validators.required],
      cardName:["",Validators.required],
      cardMonth:["",Validators.required],
      cardYear:["",Validators.required],
      cardSecurityNumber:["",Validators.required]
    })
  }

  getCarDetails(carId:number){
    this.rentService.getCarDetails(carId).subscribe(response=>{
      this.currentCar = response.data
    })
  }

  canItBeRented(carId:number){
    this.rentService.canItBeRented(carId).subscribe(response=>{
      if (response.data.returnDate == null) {
        return this.canRent = false
      }else{
        return this.canRent = true
      }
    })
  }

  rent(){
    if (this.rentForm.valid) {
      if (this.canRent == true) {
        this.router.navigate(["cars"])
        this.toastr.success("Kiralama işlemi başarılı.")      
        
      }else{
        this.toastr.error("Bu araç şu anda kiralanamaz")
      }
    }else{
      this.toastr.error("Lütfen kredi kartı bilgilerinizi giriniz")
    }
  }

}
