import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand/brand';
import { Car } from 'src/app/models/car/car';
import { CarDetail } from 'src/app/models/carDetails/carDetail';
import { Color } from 'src/app/models/color/color';
import { BrandService } from 'src/app/services/brandService/brand.service';
import { CarService } from 'src/app/services/carService/car.service';
import { ColorService } from 'src/app/services/colorService/color.service';


@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {
  carUpdateForm: FormGroup

  brands: Brand[]
  colors: Color[]

  waitForData: boolean
  car: Car

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private carService: CarService,
    private brandService: BrandService, private colorService: ColorService, private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getColors()
    this.getBrands()
    this.activatedRoute.params.subscribe(params => {
      if (params["carId"]) {
        this.getById(params["carId"])
        this.createUpdateForm()
      }
    })
  }


  createUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      brandId: [0, Validators.required],
      colorId: [0, Validators.required],
      modelYear: ["", Validators.required],
      dailyPrice: ["", Validators.required],
      description: ["", Validators.required],
    })
  }

  update() {
    let currentCar:Car = Object.assign({},this.carUpdateForm.value)
    let newCar:Car = {id:this.car.id,brandId:currentCar.brandId,colorId:currentCar.colorId,dailyPrice:currentCar.dailyPrice,
    description:currentCar.description,modelYear:currentCar.modelYear}
    if (this.carUpdateForm.valid) {
      this.carService.update(newCar).subscribe(response=>{
        this.router.navigate(["admin/view/car"])
        this.toastr.info(response.message)
      },errorResponse=>{
        console.log(errorResponse.message)
      })
    }else{
      this.toastr.error("Lütfen formu doldurunuz")
    }
  }

  getById(carId: number) {
    this.carService.getById(carId).subscribe(response => {
      this.car = response.data
      this.waitForData = true
      console.log(this.car.description)
      this.carUpdateForm.setValue({
        brandId: this.car.brandId, colorId: this.car.colorId, modelYear: this.car.modelYear,
        dailyPrice: this.car.dailyPrice, description: this.car.description
      })
      console.log(this.carUpdateForm.value)
    }, errorResponse => {
      console.log("Hata")
    })
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

