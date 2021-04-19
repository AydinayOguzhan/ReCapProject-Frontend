import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand/brand';
import { BrandService } from 'src/app/services/brandService/brand.service';
import { LocalStorageService } from 'src/app/services/localStorageService/local-storage.service';
import { UserOperationClaimService } from 'src/app/services/userOperationClaimService/user-operation-claim.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {
  brandAddForm: FormGroup
  ifAdmin: boolean
  waitForData: boolean = false

  constructor(private formBuilder: FormBuilder, private brandService: BrandService, private toastr: ToastrService,
    private router: Router, private userOperationClaimService: UserOperationClaimService,
    private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.checkUserClaims(parseInt(this.localStorageService.getVariable("id")))
  }

  checkUserClaims(userId: number) {
    this.userOperationClaimService.checkUserClaims(userId).subscribe(response => {
      if (response.success) {
        this.ifAdmin = response.success
        this.createAddForm()
      } else {
        this.ifAdmin = response.success
      }
    }, errorResponse => {
      console.log(errorResponse.error.message)
    })
  }


  createAddForm() {
    this.brandAddForm = this.formBuilder.group({
      brandName: ["", Validators.required]
    })
    this.waitForData = true
  }

  add() {
    if (this.brandAddForm.valid) {
      let newBrand: Brand = Object.assign({}, this.brandAddForm.value)
      this.brandService.add(newBrand).subscribe(response => {
        this.router.navigate(["admin/view/brand"])
        this.toastr.info(response.message)
      }, errorResponse => {
        this.toastr.error(errorResponse.message)
      })
    } else {
      this.toastr.error("Lütfen formu doldurun")
    }
  }

}
