import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup

  constructor(private formBuilder:FormBuilder,private toastr:ToastrService, private authService:AuthService,
    private router:Router) { }

  ngOnInit(): void {
    this.createLoginForm()
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }

  login(){
    if (this.loginForm.valid) {
      let user = Object.assign({},this.loginForm.value)      
      this.authService.login(user).subscribe(response=>{
        localStorage.setItem("token",response.data.token)
        localStorage.setItem("email",user.email)
        this.authService.isAuthenticated()
        this.router.navigate(["/"])
        this.toastr.info(response.message).onShown.subscribe(()=>{
          window.location.reload()
        })
      },errorResponse=>{
        this.toastr.error(errorResponse.error.message)
      })
    }else{
      this.toastr.error("Lütfen formu doldurunuz")
    }
  }
}
