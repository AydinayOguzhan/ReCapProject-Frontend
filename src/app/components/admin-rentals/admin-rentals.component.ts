import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Rental } from 'src/app/models/rental/rental';
import { AuthService } from 'src/app/services/authService/auth.service';
import { LocalStorageService } from 'src/app/services/localStorageService/local-storage.service';
import { RentService } from 'src/app/services/rentService/rent.service';
import { UserOperationClaimService } from 'src/app/services/userOperationClaimService/user-operation-claim.service';

@Component({
  selector: 'app-admin-rentals',
  templateUrl: './admin-rentals.component.html',
  styleUrls: ['./admin-rentals.component.css']
})
export class AdminRentalsComponent implements OnInit {
  ifAdmin: boolean
  rentals: Rental[] = []
  waitForData: boolean = false

  constructor(private authService: AuthService, private userOperationClaimService: UserOperationClaimService,
    private localStorageService: LocalStorageService, private router: Router, private rentService: RentService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.checkUserClaims(parseInt(this.localStorageService.getVariable("id")))
  }

  getRentals(){
    this.rentService.getRentals().subscribe(response=>{
      this.rentals = response.data
      this.waitForData = true
    },errorResponse=>{
      this.toastr.error(errorResponse.error.message)
    })
  }

  checkUserClaims(userId: number) {
    this.userOperationClaimService.checkUserClaims(userId).subscribe(response => {
      if (response.success) {
        this.ifAdmin = response.success
        this.getRentals()
      } else {
        this.ifAdmin = response.success
      }
    }, errorResponse => {
      console.log(errorResponse.error.message)
    })
  }

  returnCar(rental:Rental){
    console.log(rental)
    let today = new Date()
    rental.returnDate = today
    this.rentService.update(rental).subscribe(response=>{
      this.ngOnInit()
      this.toastr.info("Car returned")
    },errorResponse=>{
      console.log(errorResponse.error.Message)
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
