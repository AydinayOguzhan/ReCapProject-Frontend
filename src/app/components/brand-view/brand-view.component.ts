import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand/brand';
import { BrandService } from 'src/app/services/brandService/brand.service';

@Component({
  selector: 'app-brand-view',
  templateUrl: './brand-view.component.html',
  styleUrls: ['./brand-view.component.css']
})
export class BrandViewComponent implements OnInit {
  brands:Brand[]

  constructor(private brandService:BrandService, private router:Router, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getBrands()
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data
    },errorResponse=>{
      console.log(errorResponse.message)
    })
  }

  delete(brand:Brand){
    this.brandService.delete(brand).subscribe(response=>{
      window.location.reload()
      this.toastr.info(response.message)
    },errorResponse=>{
      console.log(errorResponse.message)
    })
  }

  goUpdate(brandId:number){  
    let newUrl = "admin/update/brand/" + brandId
    this.router.navigateByUrl(newUrl)  
  }

}
