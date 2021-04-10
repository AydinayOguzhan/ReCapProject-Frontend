import { getLocaleDateTimeFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { onErrorResumeNext } from 'rxjs';
import { Rental } from 'src/app/models/rental/rental';
import { LocalStorageService } from 'src/app/services/localStorageService/local-storage.service';
import { RentService } from 'src/app/services/rentService/rent.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {
  rentals: Rental[] = []
  userId: number
  waitForData:boolean = false
  returned:boolean = true

  constructor(private rentService: RentService, private localStorageService: LocalStorageService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.userId = parseInt(this.localStorageService.getVariable("id"))
    this.getRentalDetailByUserId(this.userId)
  }

  getRentalDetailByUserId(userId:number){
    this.rentService.getRentalDetailByUserId(userId).subscribe(response=>{
      if (response.data.length <= 0) {
        this.waitForData = false
      }else{
        this.rentals = response.data
        this.waitForData = true
      }
    },errorResponse=>{
      console.log(errorResponse.error)
      this.toastr.error(errorResponse.error)
    })
  }

  returnCar(rental:Rental){
    let today = new Date()
    rental.returnDate = today
    this.rentService.update(rental).subscribe(response=>{
      this.ngOnInit()
      console.log(response.message)
    },errorResponse=>{
      console.log(errorResponse.error.message)
    })
  }

  setButtonClass(rental:Rental){
    let today = new Date()
    if (rental.returnDate <= today) {
      return "btn btn-outline-success"
    }else if(rental.returnDate == null){
      return "btn btn-outline-success invisible"
    }else{
      return "btn btn-outline-success invisible"
    }
  }
}
