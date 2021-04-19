import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color/color';
import { ColorService } from 'src/app/services/colorService/color.service';
import { LocalStorageService } from 'src/app/services/localStorageService/local-storage.service';
import { UserOperationClaimService } from 'src/app/services/userOperationClaimService/user-operation-claim.service';

@Component({
  selector: 'app-color-view',
  templateUrl: './color-view.component.html',
  styleUrls: ['./color-view.component.css']
})
export class ColorViewComponent implements OnInit {
  colors: Color[]
  ifAdmin: boolean
  waitForData: boolean = false

  constructor(private colorService: ColorService, private router: Router, private toastr: ToastrService,
    private userOperationClaimService: UserOperationClaimService, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.checkUserClaims(parseInt(this.localStorageService.getVariable("id")))
  }

  checkUserClaims(userId: number) {
    this.userOperationClaimService.checkUserClaims(userId).subscribe(response => {
      if (response.success) {
        this.ifAdmin = response.success
        this.getColors()
      } else {
        this.ifAdmin = response.success
      }
    }, errorResponse => {
      console.log(errorResponse.error.message)
    })
  }

  getColors() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data
      this.waitForData = true
    }, errorResponse => {
      console.log(errorResponse.message)
    })
  }

  delete(color: Color) {
    this.colorService.delete(color).subscribe(response => {
      window.location.reload()
      this.toastr.info(response.message)
    }, errorResponse => {
      console.log(errorResponse.message)
    })
  }

  goUpdate(colorId: number) {
    let newUrl = "admin/update/color/" + colorId
    this.router.navigateByUrl(newUrl)
  }

}
