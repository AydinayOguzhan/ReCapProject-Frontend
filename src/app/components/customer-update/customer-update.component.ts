import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer/customer';
import { CustomerDetail } from 'src/app/models/customer/customerDetail';
import { CustomerService } from 'src/app/services/customerService/customer.service';
import { LocalStorageService } from 'src/app/services/localStorageService/local-storage.service';

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.css']
})
export class CustomerUpdateComponent implements OnInit {
  customerUpdateForm: FormGroup
  waitForData: boolean
  currentCustomerDetail: CustomerDetail
  currentUserId: number

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService,
    private router: Router, private activatedRoute: ActivatedRoute, private customerService: CustomerService,
    private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.currentUserId = parseInt(this.localStorageService.getVariable("id"))
    if (isNaN(this.currentUserId)) {
      this.toastr.error("Lütfen sistemden çıkış yapıp tekrar giriniz")
    }else{
      this.getCustomerDetailByUserId(this.currentUserId)
    }
    this.createUpdateForm()
  }

  createUpdateForm() {
    this.customerUpdateForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      findex: ["", Validators.required],
      companyName: ["", Validators.required],
    })
  }

  update() {
    let updateData = Object.assign({}, this.customerUpdateForm.value)
    if (updateData.companyName == "") {
    } else {
      let updateCustomer: Customer = {
        id: this.currentCustomerDetail.customerId, userId: this.currentCustomerDetail.userId,
        companyName: updateData.companyName, findex: 100
      }
      this.customerService.update(updateCustomer).subscribe(response => {
        this.toastr.info(response.message)
        this.ngOnInit()
      }, errorResponse => {
        this.toastr.error(errorResponse.error.message)
      })
    }
  }

  addCustomer(customer: Customer) {
    this.customerService.add(customer).subscribe(response => {
      this.toastr.info(response.message)
    }, errorResponse => {
      this.toastr.error(errorResponse.error.message)
    })
  }

  getCustomerDetailByUserId(userId: number) {
    this.customerService.getCustomerDetailByUserId(userId).subscribe(response => {
      if (response.data == null) {
        let newCustomer: Customer = { userId: this.currentUserId, companyName: "" }
        this.addCustomer(newCustomer)
        window.location.reload()

      } else {
        this.currentCustomerDetail = response.data
        this.customerUpdateForm.setValue({
          firstName: this.currentCustomerDetail.firstName, lastName: this.currentCustomerDetail.lastName,
          email: this.currentCustomerDetail.email, companyName: this.currentCustomerDetail.companyName,
          findex: this.currentCustomerDetail.findex
        })
      }
    }, errorResponse => {
      this.toastr.error(errorResponse.error)
      console.log(errorResponse.error)
    })

  }
}
