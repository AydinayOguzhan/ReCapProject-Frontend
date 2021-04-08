import { formatDate, getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car/car';
import { CarDetail } from 'src/app/models/carDetails/carDetail';
import { CreditCard } from 'src/app/models/creditCardInformation/creditCard';
import { CustomerDetail } from 'src/app/models/customer/customerDetail';
import { Rent } from 'src/app/models/rent/rent';
import { Rental } from 'src/app/models/rental/rental';
import { CreditCardInformationService } from 'src/app/services/creditCardInformationService/credit-card-information.service';
import { CustomerService } from 'src/app/services/customerService/customer.service';
import { LocalStorageService } from 'src/app/services/localStorageService/local-storage.service';
import { RentService } from 'src/app/services/rentService/rent.service';


@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']
})
export class RentComponent implements OnInit {
  rentForm: FormGroup
  customerForm: FormGroup
  currentCar: CarDetail
  rental: Rental
  canRent: boolean
  currentCustomer: CustomerDetail
  waitForData: boolean
  currentCreditCard: CreditCard
  waitForCreditCardData: boolean

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private rentService: RentService,
    private router: Router, private toastr: ToastrService, private customerService: CustomerService,
    private localStorageService: LocalStorageService, private creditCardService: CreditCardInformationService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.getCarDetails(params["carId"])
    })
    this.getCustomerDetail(parseInt(this.localStorageService.getVariable("id")))
    this.getCreditCardByUserId(parseInt(this.localStorageService.getVariable("id")))
    this.createRentForm()
    this.createCustomerForm()
  }

  createRentForm() {
    this.rentForm = this.formBuilder.group({
      cardNumber: ["", Validators.required],
      cardName: ["", Validators.required],
      cardMonth: ["", Validators.required],
      cardYear: ["", Validators.required],
      cardSecurityNumber: ["", Validators.required],
      saveCard: [false,],
    })
  }

  createCustomerForm() {
    this.customerForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      findex: ["", Validators.required],
      companyName: ["", Validators.required],
    })
  }

  getCarDetails(carId: number) {
    this.rentService.getCarDetails(carId).subscribe(response => {
      this.currentCar = response.data
    })
  }

  rent() {
    if (this.currentCustomer != null) {
      let today = new Date()
      let creditCard = Object.assign({}, this.rentForm.value)
      let rent: Rent = { carId: this.currentCar.carId, customerId: this.currentCustomer.customerId, rentDate: today }
      let newCard: CreditCard = {
        userId: this.currentCustomer.userId, cardMonth: creditCard.cardMonth, cardName: creditCard.cardName,
        cardNumber: creditCard.cardNumber, cardSecurityNumber: creditCard.cardSecurityNumber, cardYear: creditCard.cardYear
      }
      if (this.rentForm.valid) {
        this.creditCardService.checkIfCreditCardLegit(newCard).subscribe(response => {
          this.router.navigate(["cars"])
          this.rentService.add(rent).subscribe(response => {
            if (creditCard.saveCard == true) {
              this.creditCardAdd(newCard)
              console.log(creditCard)
            } else {
            }
            this.toastr.success(response.message)
          }, errorResponse => {
            console.log(errorResponse.message)
            this.toastr.error(errorResponse.error.message)
          })
        }, errorResponse => {
          if (errorResponse.error.ValidationErrors.length > 0) {
            for (let i = 0; i < errorResponse.error.ValidationErrors.length; i++) {
              this.toastr.error(errorResponse.error.ValidationErrors[i].ErrorMessage, "Doğrulama Hatası")
            }
          }
        })
      } else {
        this.toastr.error("Please add your credit card information")
      }
    } else {
      this.toastr.info("Please add customer information")
    }
  }

  creditCardAdd(creditCard: CreditCard) {
    this.creditCardService.add(creditCard).subscribe(response => {
    }, errorResponse => {
      this.toastr.error(errorResponse.error.message)
    })
  }


  getCustomerDetail(userId: number) {
    this.customerService.getCustomerDetailByUserId(userId).subscribe(response => {
      if (response.data != null) {
        this.currentCustomer = response.data
        this.waitForData = true
        this.customerForm.setValue({
          firstName: this.currentCustomer.firstName, lastName: this.currentCustomer.lastName,
          email: this.currentCustomer.email, companyName: this.currentCustomer.companyName,findex:this.currentCustomer.findex
        })
      } else {
        this.toastr.info("Please add customer information")
      }
    }, errorResponse => {
      console.log(errorResponse.error.message)
    })
  }

  getCreditCardByUserId(userId: number) {
    this.creditCardService.getByUserId(userId).subscribe(response => {
      if (response.data != null) {
        this.currentCreditCard = response.data
        this.waitForCreditCardData = true
        this.rentForm.setValue({
          cardNumber: this.currentCreditCard.cardNumber , cardName: this.currentCreditCard.cardName,
          cardMonth: this.currentCreditCard.cardMonth, cardYear: this.currentCreditCard.cardYear, 
          cardSecurityNumber: this.currentCreditCard.cardSecurityNumber,saveCard:false
        })
      }else{
        this.waitForCreditCardData = true
      }
    },errorResponse=>{
      console.log(errorResponse.error.message)
    })
  }

}
