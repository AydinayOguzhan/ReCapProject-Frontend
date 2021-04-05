import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user/userModel';
import { UserOperationClaim } from 'src/app/models/user/userOperationClaim';
import { AuthService } from 'src/app/services/authService/auth.service';
import { LocalStorageService } from 'src/app/services/localStorageService/local-storage.service';
import { UserOperationClaimService } from 'src/app/services/userOperationClaimService/user-operation-claim.service';
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  logged: boolean
  user: User
  userOperationClaims: UserOperationClaim[]
  ifAdmin: boolean

  constructor(private authService: AuthService, private userService: UserService,
    private userOperationClaimService: UserOperationClaimService, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn()
    if (this.logged) {
      this.getUserByEmail(this.localStorageService.getVariable("email"))
      if (this.localStorageService.getVariable("id") == null) {
        return null
      }
      this.checkUserClaims(parseInt(this.localStorageService.getVariable("id")))
    }
  }

  getUserByEmail(email: string) {
    this.userService.getByEmail(email).subscribe(response => {
      this.user = response.data
    })
  }

  isLoggedIn() {
    this.authService.isAuthenticated()
    this.logged = this.authService.logged
  }

  logout() {
    this.authService.logout()
    this.isLoggedIn()
  }

  checkUserClaims(userId:number){
    this.userOperationClaimService.checkUserClaims(userId).subscribe(response=>{
      if (response.success) {
        this.ifAdmin = response.success
      }
    },errorResponse=>{
      console.log(errorResponse.error.message)
    })
  }
  
}
