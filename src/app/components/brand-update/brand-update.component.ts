import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand/brand';
import { BrandService } from 'src/app/services/brandService/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {
  brandUpdateForm:FormGroup
  
  currentBrand:Brand
  waitForData:boolean

  constructor(private formBuilder: FormBuilder, private brandService:BrandService, private toastr:ToastrService,
    private router:Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if (params["brandId"]) {
        this.getById(params["brandId"])
        this.createUpdateForm()
      }
    })
  }
  
  createUpdateForm() {
    this.brandUpdateForm = this.formBuilder.group({
      brandName: ["", Validators.required]
    })
  }

  getById(brandId:number){
    this.brandService.getById(brandId).subscribe(response=>{
      this.currentBrand = response.data
      this.waitForData = true
      this.brandUpdateForm.setValue({brandName:this.currentBrand.brandName})
    },errorResponse=>{
      console.log(errorResponse.message)
    })
  }

  update(){
    let formBrand = Object.assign({},this.brandUpdateForm.value)
    let newBrand:Brand = {id:this.currentBrand.id,brandName:formBrand.brandName}
    if (this.brandUpdateForm.valid) {
      this.brandService.update(newBrand).subscribe(response=>{
        this.router.navigate(["admin/view/brand"])
        this.toastr.info(response.message)
      },errorResponse=>{
        console.log(errorResponse)
      })
    }
  }
}
