import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer/customer';
import { CustomerDetail } from 'src/app/models/customer/customerDetail';
import { CustomerService } from 'src/app/services/customerService/customer.service';
import { LocalStorageService } from 'src/app/services/localStorageService/local-storage.service';
import { UserOperationClaimService } from 'src/app/services/userOperationClaimService/user-operation-claim.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customers:CustomerDetail[] = []
  ifAdmin: boolean
  waitForData: boolean = false

  constructor(private customerService:CustomerService,private userOperationClaimService: UserOperationClaimService,
    private localStorageService: LocalStorageService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.checkUserClaims(parseInt(this.localStorageService.getVariable("id")))
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

  getCustomers(){
    this.customerService.getCustomers().subscribe(response=>{
      this.customers = response.data
      this.waitForData = true
      this.toastr.info(response.message)
    },errorResponse=>{
      this.toastr.error(errorResponse.error.message)
    })
  }

  delete(customer:CustomerDetail){
    let deleteCustomer:Customer = {id:customer.customerId, userId:customer.userId, companyName:customer.companyName}
    this.customerService.delete(deleteCustomer).subscribe(response=>{
      this.toastr.success(response.message)
      this.ngOnInit()
    },errorResponse=>{
      this.toastr.error(errorResponse.error.message)
    })
  }
}
