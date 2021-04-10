import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarImage } from 'src/app/models/carImage/carImage';
import { CarDetailService } from 'src/app/services/carDetailService/car-detail.service';
import { CarService } from 'src/app/services/carService/car.service';


@Component({
  selector: 'app-car-image-add',
  templateUrl: './car-image-add.component.html',
  styleUrls: ['./car-image-add.component.css']
})
export class CarImageAddComponent implements OnInit {
  carImageForm: FormGroup
  waitForData: boolean
  carId: number
  carImages: CarImage[]
  isDefault: boolean

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private carService: CarService, private router: Router,
    private activatedRoute: ActivatedRoute, private carDetailService: CarDetailService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.carId = params["carId"]
      this.getAllImages(params["carId"])
      this.waitForData = true
    })
    this.createCarImageForm()
  }

  createCarImageForm() {
    this.carImageForm = this.formBuilder.group({
      file: ["", Validators.required],
      fileSource: ["",]
    })
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0]
      this.carImageForm.patchValue({
        fileSource: file
      })
    }
  }

  add() {
    const formData = new FormData()
    formData.append("File", this.carImageForm.get("fileSource").value)
    formData.append("carId", this.carId.toString())
    if (this.carImageForm.valid) {
      this.carImageAdd(formData)
    } else {
      this.toastr.error("Lütfen formu doldurunuz")
    }
  }

  carImageAdd(formData: FormData) {
    this.carDetailService.add(formData).subscribe(response => {
      this.ngOnInit()
      this.toastr.info(response.message)
    }, errorResponse => {
      this.toastr.error(errorResponse.error.message)
    })
  }

  getAllImages(carImage: number) {
    this.carDetailService.getCarImagesByCarId(this.carId).subscribe(response => {
      this.carImages = response.data
    },errorResponse=>{
      this.toastr.error(errorResponse.error.message)
    })
  }

  setImageSource(path: string) {
    let newPath = this.sanitizer.bypassSecurityTrustUrl("https://localhost:44302/images/" + path)
    this.checkIfDefault(path)
    return newPath
  }

  checkIfDefault(path: string) {
    if (path == "default.jpg")
      this.isDefault = false
    else
      this.isDefault = true
  }

  delete(image: CarImage) {
    this.carDetailService.delete(image).subscribe(response=>{
      this.ngOnInit()
      this.toastr.info(response.message)
    },errorResponse=>{
      this.toastr.error(errorResponse.error.message)
    })
    console.log(image)
  }
}
