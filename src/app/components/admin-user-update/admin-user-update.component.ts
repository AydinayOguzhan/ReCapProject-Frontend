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
  currentUser: User
  currentUserClaims:UserOperationClaim[]
  admin:number
  operationClaims:Claim[]
  claimsForm:FormGroup


  constructor(private userOperationClaimService: UserOperationClaimService, private localStorageService: LocalStorageService,
    private userService: UserService, private formBuilder: FormBuilder, private toastr: ToastrService,
    private activatedRoute:ActivatedRoute, private operationClaimService:OperationClaimService) { }

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
        this.getClaims()
        this.createUpdateForm()
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
      firstName: [0, Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      status: ["", Validators.required],
      findex: [0, Validators.required]
    })
    this.waitForData = true
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

  claimsFormCreate(){
    this.createClaimsForm()
  }

  getUserById(userId: number) {
    this.userService.getByUserId(userId).subscribe(response => {
      this.currentUser = response.data
      this.updateUserForm.setValue({
        id: this.currentUser.id, firstName: this.currentUser.firstName, lastName: this.currentUser.lastName,
        status: this.currentUser.status, email: this.currentUser.email, findex: this.currentUser.findex
      })
      this.waitForData = true
      this.toastr.info(response.message)
    }, errorResponse => {
      this.toastr.error(errorResponse.error.message)
    })
  }

  getUserCaims(userId:number){
    this.userOperationClaimService.getByUserId(userId).subscribe(response=>{
      this.currentUserClaims = response.data
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

  delete(claim:UserOperationClaim){
    this.userOperationClaimService.delete(claim).subscribe(response=>{
      this.toastr.success(response.message)
      this.ngOnInit()
    },errorResponse=>{
      this.toastr.error(errorResponse.error.message)
    })
  }

}
