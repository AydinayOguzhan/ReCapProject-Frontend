import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer/customer';
import { CustomerDetail } from 'src/app/models/customer/customerDetail';
import { CustomerService } from 'src/app/services/customerService/customer.service';
import { LocalStorageService } from 'src/app/services/localStorageService/local-storage.service';
import { UserOperationClaimService } from 'src/app/services/userOperationClaimService/user-operation-claim.service';
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customers: CustomerDetail[] = []
  ifAdmin: boolean
  waitForData: boolean = false
  currentUser:number

  constructor(private customerService: CustomerService, private userOperationClaimService: UserOperationClaimService,
    private localStorageService: LocalStorageService, private toastr: ToastrService, 
    private router:Router, private userService:UserService) { }

  ngOnInit(): void {
    this.currentUser = parseInt(this.localStorageService.getVariable("id"))
    this.checkUserClaims(this.currentUser)
  }

  checkUserClaims(userId: number) {
    this.userOperationClaimService.checkUserClaims(userId).subscribe(response => {
      if (response.success) {
        this.ifAdmin = response.success
        this.getCustomers()
      } else {
        this.ifAdmin = response.success
      }
    }, errorResponse => {
      console.log(errorResponse.error.message)
    })
  }

  getCustomers() {
    this.customerService.getCustomersDetails().subscribe(response => {
      this.customers = response.data
      this.waitForData = true
    }, errorResponse => {
      this.toastr.error(errorResponse.error.message)
    })
  }

  delete(customer: CustomerDetail) {
    let deleteCustomer: Customer = {
      id: customer.customerId, userId: customer.userId, companyName: customer.companyName,
      findex: customer.findex
    }
    this.customerService.delete(deleteCustomer).subscribe(response => {
      this.toastr.success(response.message)
      this.ngOnInit()
    }, errorResponse => {
      this.toastr.error(errorResponse.error.message)
    })
  }

  goToUser(userId:number){
    this.router.navigate(["admin/user/update/" + userId])
  }
}
