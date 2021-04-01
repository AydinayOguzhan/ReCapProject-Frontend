import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand/brand';
import { BrandService } from 'src/app/services/brandService/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {
  brandAddForm:FormGroup

  constructor(private formBuilder: FormBuilder, private brandService:BrandService, private toastr:ToastrService,
    private router:Router) { }

  ngOnInit(): void {
    this.createAddForm()
  }

  createAddForm() {
    this.brandAddForm = this.formBuilder.group({
      brandName: ["", Validators.required]
    })
  }

  add(){
    if (this.brandAddForm.valid) {
      let newBrand:Brand = Object.assign({},this.brandAddForm.value)
      this.brandService.add(newBrand).subscribe(response=>{
        this.router.navigate(["admin/view/brand"])
        this.toastr.info(response.message)
      },errorResponse=>{
        this.toastr.error(errorResponse.message)
      })
    }else{
      this.toastr.error("Lütfen formu doldurun")
    }
  }

}
