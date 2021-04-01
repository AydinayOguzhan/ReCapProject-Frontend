import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color/color';
import { ColorService } from 'src/app/services/colorService/color.service';


@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {
  colorUpdateForm:FormGroup
  
  currentColor:Color
  waitForData:boolean

  constructor(private formBuilder: FormBuilder, private colorService:ColorService, private toastr:ToastrService,
    private router:Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void { this.activatedRoute.params.subscribe(params=>{
    if (params["colorId"]) {
      this.getById(params["colorId"])
      this.createUpdateForm()
    }
  })
  }

  createUpdateForm() {
    this.colorUpdateForm = this.formBuilder.group({
      colorName: ["", Validators.required]
    })
  }

  getById(brandId:number){
    this.colorService.getById(brandId).subscribe(response=>{
      this.currentColor = response.data
      this.waitForData = true
      this.colorUpdateForm.setValue({colorName:this.currentColor.colorName})
    },errorResponse=>{
      console.log(errorResponse.message)
    })
  }

  update(){
    let formColor = Object.assign({},this.colorUpdateForm.value)
    let newColor:Color = {id:this.currentColor.id,colorName:formColor.colorName}
    if (this.colorUpdateForm.valid) {
      this.colorService.update(newColor).subscribe(response=>{
        this.router.navigate(["admin/view/color"])
        this.toastr.info(response.message)
      },errorResponse=>{
        console.log(errorResponse)
      })
    }
  }

}
