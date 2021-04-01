import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color/color';
import { ColorService } from 'src/app/services/colorService/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {
  colorAddForm:FormGroup

  constructor(private colorService:ColorService, private formBuilder:FormBuilder, private toastr:ToastrService,
    private router:Router) { }

  ngOnInit(): void {
    this.createAddForm()
  }

  createAddForm() {
    this.colorAddForm = this.formBuilder.group({
      colorName: ["", Validators.required]
    })
  }

  
  add(){
    if (this.colorAddForm.valid) {
      let newColor:Color = Object.assign({},this.colorAddForm.value)
      this.colorService.add(newColor).subscribe(response=>{
        this.router.navigate(["admin/view/color"])
        this.toastr.info(response.message)
      },errorResponse=>{
        this.toastr.error(errorResponse.message)
      })
    }else{
      this.toastr.error("Lütfen formu doldurun")
    }
  }

}
