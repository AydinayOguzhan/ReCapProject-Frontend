import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand/brand';
import { Car } from 'src/app/models/car/car';
import { Color } from 'src/app/models/color/color';
import { BrandService } from 'src/app/services/brandService/brand.service';
import { CarDetailService } from 'src/app/services/carDetailService/car-detail.service';
import { CarService } from 'src/app/services/carService/car.service';
import { ColorService } from 'src/app/services/colorService/color.service';
import { LocalStorageService } from 'src/app/services/localStorageService/local-storage.service';
import { UserOperationClaimService } from 'src/app/services/userOperationClaimService/user-operation-claim.service';


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
  carId: number
  ifAdmin: boolean

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private carService: CarService,
    private brandService: BrandService, private colorService: ColorService, private router: Router,
    private activatedRoute: ActivatedRoute, private carDetailService: CarDetailService,
    private userOperationClaimService: UserOperationClaimService, private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["carId"]) {
        this.carId = params["carId"]
        this.checkUserClaims(parseInt(this.localStorageService.getVariable("id")))
      }
    })
  }

  checkUserClaims(userId: number) {
    this.userOperationClaimService.checkUserClaims(userId).subscribe(response => {
      if (response.success) {
        this.ifAdmin = response.success
        this.getColors()
        this.getBrands()
        this.getById(this.carId)
        this.createUpdateForm()
      } else {
        this.ifAdmin = response.success
      }
    }, errorResponse => {
      console.log(errorResponse.error.message)
    })
  }

  createUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      brandId: [0, Validators.required],
      colorId: [0, Validators.required],
      modelYear: ["", Validators.required],
      dailyPrice: ["", Validators.required],
      description: ["", Validators.required],
      findex: ["", Validators.required]
    })
  }

  update() {
    let currentCar: Car = Object.assign({}, this.carUpdateForm.value)
    let newCar: Car = {
      id: this.car.id, brandId: currentCar.brandId, colorId: currentCar.colorId, dailyPrice: currentCar.dailyPrice,
      description: currentCar.description, modelYear: currentCar.modelYear, findex: currentCar.findex
    }
    if (this.carUpdateForm.valid) {
      this.carService.update(newCar).subscribe(response => {
        this.router.navigate(["admin/view/car"])
        this.toastr.info(response.message)
      }, errorResponse => {
        console.log(errorResponse.message)
      })
    } else {
      this.toastr.error("Lütfen formu doldurunuz")
    }
  }

  getById(carId: number) {
    this.carService.getById(carId).subscribe(response => {
      this.car = response.data
      this.waitForData = true
      this.carUpdateForm.setValue({
        brandId: this.car.brandId, colorId: this.car.colorId, modelYear: this.car.modelYear,
        dailyPrice: this.car.dailyPrice, description: this.car.description, findex: this.car.findex
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

  goToCarImage() {
    this.router.navigate(["admin/carImage/" + this.carId])
  }

}

