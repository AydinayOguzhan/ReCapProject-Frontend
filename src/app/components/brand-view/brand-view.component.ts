import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand/brand';
import { BrandService } from 'src/app/services/brandService/brand.service';
import { LocalStorageService } from 'src/app/services/localStorageService/local-storage.service';
import { UserOperationClaimService } from 'src/app/services/userOperationClaimService/user-operation-claim.service';

@Component({
  selector: 'app-brand-view',
  templateUrl: './brand-view.component.html',
  styleUrls: ['./brand-view.component.css']
})
export class BrandViewComponent implements OnInit {
  brands: Brand[]
  ifAdmin: boolean
  waitForData: boolean = false

  constructor(private brandService: BrandService, private router: Router, private toastr: ToastrService,
    private userOperationClaimService: UserOperationClaimService, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.checkUserClaims(parseInt(this.localStorageService.getVariable("id")))
  }


  checkUserClaims(userId: number) {
    this.userOperationClaimService.checkUserClaims(userId).subscribe(response => {
      if (response.success) {
        this.ifAdmin = response.success
        this.getBrands()
      } else {
        this.ifAdmin = response.success
      }
    }, errorResponse => {
      console.log(errorResponse.error.message)
    })
  }

  getBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data
      this.waitForData = true
    }, errorResponse => {
      console.log(errorResponse.message)
    })
  }

  delete(brand: Brand) {
    this.brandService.delete(brand).subscribe(response => {
      window.location.reload()
      this.toastr.info(response.message)
    }, errorResponse => {
      console.log(errorResponse.message)
    })
  }

  goUpdate(brandId: number) {
    let newUrl = "admin/update/brand/" + brandId
    this.router.navigateByUrl(newUrl)
  }

}
