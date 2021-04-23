import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/userService/user.service';
import { User } from 'src/app/models/user/userModel';
import { AuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  updateUserForm:FormGroup
  waitForData:boolean 
  currentUser:User

  constructor(private activatedRoute:ActivatedRoute, private formBuilder:FormBuilder,private toastr:ToastrService,
    private userService:UserService, private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.getById(params["userId"])
      this.createUpdateForm()
      console.log(params["userId"])
    })
  }

  createUpdateForm(){
    this.updateUserForm = this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required],
      firstName:["",Validators.required],
      lastName:["",Validators.required]
    })
  }

  getById(userId:number){
    this.userService.getByUserId(userId).subscribe(response=>{
      this.currentUser = response.data
      this.waitForData = true
      this.updateUserForm.setValue({firstName:this.currentUser.firstName, lastName:this.currentUser.lastName, 
      email:this.currentUser.email,password:""})
    })
  }

  update(){
    if (this.updateUserForm.valid) {
      let user = Object.assign({},this.updateUserForm.value)
      user.id = this.currentUser.id
      this.authService.update(user).subscribe(response=>{
        this.authService.logout()
        this.router.navigate(["login"]).then(()=>{
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
