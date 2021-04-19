import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color/color';
import { ColorService } from 'src/app/services/colorService/color.service';
import { LocalStorageService } from 'src/app/services/localStorageService/local-storage.service';
import { UserOperationClaimService } from 'src/app/services/userOperationClaimService/user-operation-claim.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {
  colorAddForm: FormGroup
  ifAdmin: boolean
  waitForData: boolean = false

  constructor(private colorService: ColorService, private formBuilder: FormBuilder, private toastr: ToastrService,
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
    this.colorAddForm = this.formBuilder.group({
      colorName: ["", Validators.required]
    })
    this.waitForData = true
  }


  add() {
    if (this.colorAddForm.valid) {
      let newColor: Color = Object.assign({}, this.colorAddForm.value)
      this.colorService.add(newColor).subscribe(response => {
        this.router.navigate(["admin/view/color"])
        this.toastr.info(response.message)
      }, errorResponse => {
        this.toastr.error(errorResponse.message)
      })
    } else {
      this.toastr.error("Lütfen formu doldurun")
    }
  }

}
