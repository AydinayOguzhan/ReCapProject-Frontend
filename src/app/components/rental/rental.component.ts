import { getLocaleDateTimeFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { onErrorResumeNext } from 'rxjs';
import { Customer } from 'src/app/models/customer/customer';
import { Rental } from 'src/app/models/rental/rental';
import { CustomerService } from 'src/app/services/customerService/customer.service';
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
  waitForData: boolean = false
  returned: boolean = true
  waitForCustomer: boolean = false
  currentCustomer:Customer

  constructor(private rentService: RentService, private localStorageService: LocalStorageService, private toastr: ToastrService,
    private customerService: CustomerService) { }

  ngOnInit(): void {
    this.userId = parseInt(this.localStorageService.getVariable("id"))
    this.checkIFCustomer(this.userId)
  }

  getRentalDetailsByCustomerId(customerId: number) {
    this.rentService.getRentalDetailsByCustomerId(customerId).subscribe(response => {
      if (response.data.length <= 0) {
        this.waitForData = false
        console.log(response.data)
      } else {
        this.rentals = response.data
        console.log(this.rentals)
        this.waitForData = true
      }
    }, errorResponse => {
      this.toastr.error(errorResponse.error.Message)
    })
  }

  //Customer bilgisinin olup olmadığını kontrol et. Yoksa uyarı döndür. Varsa işlem devam etsin.
  checkIFCustomer(userId: number) {
    this.customerService.getCustomerByUserId(userId).subscribe(response => {
      if (response.data != null) {
        this.currentCustomer = response.data
        this.getRentalDetailsByCustomerId(this.currentCustomer.id)
        this.waitForCustomer = true
      } else {
        console.log("else")
        this.waitForCustomer = false
      }
    }, errorResponse => {
      this.toastr.error(errorResponse.error.Message)
    })
  }

  returnCar(rental: Rental) {
    let today = new Date()
    rental.returnDate = today
    this.rentService.update(rental).subscribe(response => {
      this.ngOnInit()
      this.toastr.info("Car returned")
    }, errorResponse => {
      console.log(errorResponse.error.Message)
    })
  }

  setButtonClass(rental: Rental) {
    let today = new Date()
    if (rental.returnDate <= today) {
      return "btn btn-outline-success"
    } else if (rental.returnDate == null) {
      return "btn btn-outline-success invisible"
    } else {
      return "btn btn-outline-success invisible"
    }
  }
}
