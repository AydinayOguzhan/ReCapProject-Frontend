import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, Validators, FormBuilder  } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand/brand';
import { Car } from 'src/app/models/car/car';
import { Color } from 'src/app/models/color/color';
import { BrandService } from 'src/app/services/brandService/brand.service';
import { CarService } from 'src/app/services/carService/car.service';
import { ColorService } from 'src/app/services/colorService/color.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  carAddForm:FormGroup 
  car:Car
  brands:Brand[]
  currentBrandId:number
  colors:Color[]
  currentColorId:number

  constructor(private formBuilder:FormBuilder, private toastr:ToastrService, private carService:CarService, 
    private brandService:BrandService, private colorService:ColorService, private router:Router) { }

  ngOnInit(): void {
    this.createAddForm()
    this.getBrands()
    this.getColors()
  }

  createAddForm(){
    this.carAddForm = this.formBuilder.group({
      brandId:[0, Validators.required],
      colorId:[0,Validators.required],
      modelYear:["",Validators.required],
      dailyPrice:["",Validators.required],
      description:["",Validators.required],
    })
  }

  add(){
    if (this.carAddForm.valid) {
      let carAddModel = Object.assign({},this.carAddForm.value)
      this.carService.add(carAddModel).subscribe(response=>{
        this.router.navigate(["admin/view/car"])
        this.toastr.info("Ekleme işlemi başarılı")
      },responseError=>{
        console.log(responseError.error.errors)
        this.toastr.error(responseError.error.ValidationErrors)
        if (responseError.error.ValidationErrors.length>0) {
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastr.error(responseError.error.ValidationErrors[i].ErrorMessage)            
          }
        }
      })
      console.log(carAddModel)
    }else{
      this.toastr.error("Lütfen formu doldurunuz")
    }
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data
    })
  }

  setCurrentColor(colorId:number){
    this.currentColorId = colorId
    console.log(this.currentColorId)
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data
    })
  }

}
