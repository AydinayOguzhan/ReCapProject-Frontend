import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user/userModel';
import { AuthService } from 'src/app/services/authService/auth.service';
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  logged:boolean
  user:User

  constructor(private authService:AuthService, private userService:UserService) { }

  ngOnInit(): void {
    this.isLoggedIn()
    console.log(this.logged)
    this.getUserByEmail(localStorage.getItem("email"))
  }

  getUserByEmail(email:string){
    this.userService.getByEmail(email).subscribe(response=>{
      this.user = response.data
      console.log(this.user)
    })
  }

  isLoggedIn(){
    this.authService.isAuthenticated()
    this.logged = this.authService.logged
  }

  logout(){
    this.authService.logout()
    this.isLoggedIn()
  }
  
}
