import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer/customer';
import { AuthService } from 'src/app/services/authService/auth.service';
import { CustomerService } from 'src/app/services/customerService/customer.service';
import { LocalStorageService } from 'src/app/services/localStorageService/local-storage.service';
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup

  constructor(private formBuilder:FormBuilder,private toastr:ToastrService, private authService:AuthService,
    private router:Router, private localStorageService:LocalStorageService, private customerService:CustomerService,
    private userService:UserService) { }

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
        this.localStorageService.setVariable("token",response.data.token)
        this.localStorageService.setVariable("email",registerModel.email)
        this.getUserByEmail(registerModel.email)
        this.router.navigate(["/"])
        this.toastr.info(response.message).onShown.subscribe(()=>{
          window.location.reload()
        })
      },errorResult=>{
        this.toastr.error(errorResult.error.message)
        console.log(errorResult)
      })
    }else{
      this.toastr.error("Lütfen formu doldurunuz")
    }
  }

  getUserByEmail(email: string) {
    this.userService.getByEmail(email).subscribe(response => {
      this.localStorageService.setVariable("id", response.data.id.toString())
      console.log(response.data.id)
    },errorResponse=>{
      console.log(errorResponse.error.message)
    })
  }

}
