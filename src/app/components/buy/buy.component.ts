import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car/car';
import { CreditCard } from 'src/app/models/creditCardInformation/creditCard';
import { BuyService } from 'src/app/services/buyService/buy.service';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms"


@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {
  creditCardForm: FormGroup

  constructor(private buyService: BuyService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createCreditCardForm()
  }

  createCreditCardForm() {
    this.creditCardForm = this.formBuilder.group({
      cardNumber: ["", Validators.required],
      cardName: ["", Validators.required],
      cardMonth: ["", Validators.required],
      cardYear: ["", Validators.required],
      cardSecurityNumber: ["", Validators.required],
    })
  }

  rent() {
    if (this.creditCardForm.valid) {
      let creditCardModel = Object.assign({}, this.creditCardForm.value)
      this.buyService.rent(creditCardModel).subscribe(response=>{
        console.log("başarılı")
      },responseError=>{
        if (responseError.error.ValidationErrors.length>0) {
          for (let i = 0; i < responseError.error.ValidationErrors.length.length; i++) {
            console.log(responseError.error.ValidationErrors[i].ErrorMessage)
          }
        }
      })
    }else{
      console.log("hata")
    }
  }

}
