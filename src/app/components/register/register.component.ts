import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup

  constructor(private formBuilder:FormBuilder,private toastr:ToastrService, private authService:AuthService,
    private router:Router) { }

  ngOnInit(): void {
    this.createRegisterForm()
  }

  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required],
      firstName:["",Validators.required],
      lastName:["",Validators.required],
    })
  }

  register(){
    if (this.registerForm.valid) {
      let registerModel = Object.assign({},this.registerForm.value)
      this.authService.register(registerModel).subscribe(response=>{
        localStorage.setItem("token",response.data.token)
        localStorage.setItem("email",registerModel.email)
        this.router.navigate(["cars"])
        this.toastr.info(response.message).onShown.subscribe(()=>{
          window.location.reload()
        })
      },errorResult=>{
        this.toastr.error(errorResult.error.message)
      })
    }else{
      this.toastr.error("Lütfen formu doldurunuz")
    }
  }

}
