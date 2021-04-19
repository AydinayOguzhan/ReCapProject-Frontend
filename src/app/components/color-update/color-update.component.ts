import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color/color';
import { ColorService } from 'src/app/services/colorService/color.service';
import { LocalStorageService } from 'src/app/services/localStorageService/local-storage.service';
import { UserOperationClaimService } from 'src/app/services/userOperationClaimService/user-operation-claim.service';


@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {
  colorUpdateForm: FormGroup
  currentColor: Color
  waitForData: boolean
  ifAdmin: boolean
  colorId: number

  constructor(private formBuilder: FormBuilder, private colorService: ColorService, private toastr: ToastrService,
    private router: Router, private activatedRoute: ActivatedRoute, private userOperationClaimService: UserOperationClaimService,
    private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["colorId"]) {
        this.colorId = params["colorId"]
        this.checkUserClaims(parseInt(this.localStorageService.getVariable("id")))
      }
    })
  }

  checkUserClaims(userId: number) {
    this.userOperationClaimService.checkUserClaims(userId).subscribe(response => {
      if (response.success) {
        this.ifAdmin = response.success
        this.getById(this.colorId)
        this.createUpdateForm()
      } else {
        this.ifAdmin = response.success
      }
    }, errorResponse => {
      console.log(errorResponse.error.message)
    })
  }

  createUpdateForm() {
    this.colorUpdateForm = this.formBuilder.group({
      colorName: ["", Validators.required]
    })
  }

  getById(brandId: number) {
    this.colorService.getById(brandId).subscribe(response => {
      this.currentColor = response.data
      this.waitForData = true
      this.colorUpdateForm.setValue({ colorName: this.currentColor.colorName })
    }, errorResponse => {
      console.log(errorResponse.message)
    })
  }

  update() {
    let formColor = Object.assign({}, this.colorUpdateForm.value)
    let newColor: Color = { id: this.currentColor.id, colorName: formColor.colorName }
    if (this.colorUpdateForm.valid) {
      this.colorService.update(newColor).subscribe(response => {
        this.router.navigate(["admin/view/color"])
        this.toastr.info(response.message)
      }, errorResponse => {
        console.log(errorResponse)
      })
    }
  }

}
