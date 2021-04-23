import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/localStorageService/local-storage.service';
import { UserOperationClaimService } from 'src/app/services/userOperationClaimService/user-operation-claim.service';
import { UserService } from 'src/app/services/userService/user.service';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user/userModel';
import { UserOperationClaim } from 'src/app/models/user/userOperationClaim';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { OperationClaimService } from 'src/app/services/operationClaimService/operation-claim.service';
import { Claim } from 'src/app/models/claims/claims';
import { UserOperationClaimDetail } from 'src/app/models/user/userOperationClaimDetail';
import { CustomerService } from 'src/app/services/customerService/customer.service';
import { Customer } from 'src/app/models/customer/customer';

@Component({
  selector: 'app-admin-user-update',
  templateUrl: './admin-user-update.component.html',
  styleUrls: ['./admin-user-update.component.css']
})
export class AdminUserUpdateComponent implements OnInit {
  currentUserId:number
  ifAdmin: boolean
  waitForData: boolean = false
  updateUserForm: FormGroup
  customerForm: FormGroup
  currentUser: User
  currentCustomer:Customer
  currentUserClaimsDetails:UserOperationClaimDetail[]
  admin:number
  operationClaims:Claim[]
  claimsForm:FormGroup

  constructor(private userOperationClaimService: UserOperationClaimService, private localStorageService: LocalStorageService,
    private userService: UserService, private formBuilder: FormBuilder, private toastr: ToastrService,
    private activatedRoute:ActivatedRoute, private operationClaimService:OperationClaimService,
    private customerService:CustomerService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.currentUserId = parseInt(params["userId"])
    })
    this.admin = parseInt(this.localStorageService.getVariable("id"))
    this.checkUserClaims(this.admin)
    this.createClaimsForm()
  }

  checkUserClaims(userId: number) {
    this.userOperationClaimService.checkUserClaims(userId).subscribe(response => {
      if (response.success) {
        this.ifAdmin = response.success
        this.getUserById(this.currentUserId)
        this.getUserCaims(this.currentUserId)
        this.getCustomerByUserId(this.currentUserId)
        this.getClaims()
        this.createUpdateForm()
        this.createCustomerForm()
      } else {
        this.ifAdmin = response.success
      }
    }, errorResponse => {
      console.log(errorResponse.error.message)
    })
  }

  createUpdateForm() {
    this.updateUserForm = this.formBuilder.group({
      id: [0, Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      status: ["", Validators.required],
    })
    this.waitForData = true
  }

  createCustomerForm() {
    this.customerForm = this.formBuilder.group({
      id: [0, Validators.required],
      userId: [0, Validators.required],
      companyName: ["",],
      findex: [, Validators.required]
    })
  }

  createClaimsForm() {
    this.claimsForm = this.formBuilder.group({
      claim:[0, Validators.required]
    })
  }

  addClaim(){
    if (this.claimsForm.valid) {
      let formObject = Object.assign({},this.claimsForm.value)
      let newUserClaim:UserOperationClaim = {userId:this.currentUserId, operationClaimId:parseInt(formObject.claim)}
      this.userOperationClaimService.add(newUserClaim).subscribe(response=>{
        this.toastr.success(response.message)
        window.location.reload()
      },errorResponse=>{
        this.toastr.error(errorResponse.error.message)
        console.log(errorResponse.error)
      })
    }else{
      this.toastr.error("Lütfen formu doldurunuz")
    }
  }

  updateFindex(){
    if (this.updateUserForm.valid) {
      let updateUser:User = Object.assign({},this.updateUserForm.value)
      console.log(updateUser)
      this.userService.update(updateUser).subscribe(response=>{
        this.toastr.success(response.message)
        this.ngOnInit()
      },errorResponse=>{
        this.toastr.error(errorResponse.error.Message)
      })
    }
  }

  claimsFormCreate(){
    this.createClaimsForm()
  }

  getUserById(userId: number) {
    this.userService.getByUserId(userId).subscribe(response => {
      this.currentUser = response.data
      this.updateUserForm.setValue({
        id: this.currentUser.id, firstName: this.currentUser.firstName, lastName: this.currentUser.lastName,
        status: this.currentUser.status, email: this.currentUser.email
      })
      this.waitForData = true
    }, errorResponse => {
      this.toastr.error(errorResponse.error.message)
    })
  }

  getCustomerByUserId(userId:number){
    this.customerService.getCustomerByUserId(userId).subscribe(response=>{
      this.currentCustomer = response.data
      this.customerForm.setValue({id:this.currentCustomer.id,userId:this.currentCustomer.userId,
        companyName:this.currentCustomer.companyName,findex:this.currentCustomer.findex})
    },errorResponse=>{
      this.toastr.error(errorResponse.error.Message)
    })
  }

  getUserCaims(userId:number){
    this.userOperationClaimService.getUserClaimsDetailsByUserId(userId).subscribe(response=>{
      this.currentUserClaimsDetails = response.data
    },errorResponse=>{
      this.toastr.error(errorResponse.error.message)
    })
  }

  getClaims(){
    this.operationClaimService.getAll().subscribe(response=>{
      this.operationClaims = response.data
    },errorResponse=>{
      this.toastr.error(errorResponse.error.message)
      console.log(errorResponse.error)
    })
  }

  delete(claimDetail:UserOperationClaimDetail){
    let claim:UserOperationClaim = {id:claimDetail.id,operationClaimId:claimDetail.operationClaimId,
      userId:claimDetail.userId}
    this.userOperationClaimService.delete(claim).subscribe(response=>{
      this.toastr.success(response.message)
      this.ngOnInit()
    },errorResponse=>{
      this.toastr.error(errorResponse.error.message)
    })
  }

  updateCustomer(){
    if (this.customerForm.valid) {
      let updateCustomer:Customer = Object.assign({},this.customerForm.value)
      this.customerService.update(updateCustomer).subscribe(response=>{
        this.toastr.success(response.message)
        this.ngOnInit()
      },errorResponse=>{
        console.log(errorResponse.error)
        this.toastr.error(errorResponse.error.Message)
      })
    }else{
      this.toastr.error("Lütfen formu doldurunuz")
    }
  }

}
