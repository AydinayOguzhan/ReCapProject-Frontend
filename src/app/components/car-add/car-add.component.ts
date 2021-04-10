import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand/brand';
import { Car } from 'src/app/models/car/car';
import { CarImage } from 'src/app/models/carImage/carImage';
import { Color } from 'src/app/models/color/color';
import { BrandService } from 'src/app/services/brandService/brand.service';
import { CarDetailService } from 'src/app/services/carDetailService/car-detail.service';
import { CarService } from 'src/app/services/carService/car.service';
import { ColorService } from 'src/app/services/colorService/color.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  carAddForm: FormGroup

  brands: Brand[]
  colors: Color[]


  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private carService: CarService,
    private brandService: BrandService, private colorService: ColorService, private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getBrands()
    this.getColors()
    this.createAddForm()
  }

  createAddForm() {
    this.carAddForm = this.formBuilder.group({
      brandId: [0, Validators.required],
      colorId: [0, Validators.required],
      modelYear: ["", Validators.required],
      dailyPrice: ["", Validators.required],
      description: ["", Validators.required]
    })
  }

  add() {
    if (this.carAddForm.valid) {
      let carAddModel = Object.assign({}, this.carAddForm.value)
      this.carService.add(carAddModel).subscribe(response => {
        this.router.navigate(["admin/view/car"])
        this.toastr.info(response.message)
      }, responseError => {
        console.log(responseError.error.errors)
        this.toastr.error(responseError.error.ValidationErrors)
        if (responseError.error.ValidationErrors.length > 0) {
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastr.error(responseError.error.ValidationErrors[i].ErrorMessage)
          }
        }
      })
    } else {
      this.toastr.error("Lütfen formu doldurunuz")
    }
  }

  getBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data
    })
  }

  getColors() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data
    })
  }

}
