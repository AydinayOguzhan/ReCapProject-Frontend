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
    private userOperationClaimService: UserOperationClaimService, private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn()
    this.getUserByEmail(this.localStorageService.getVariable("email"))
    this.getUserClaim(parseInt(this.localStorageService.getVariable("id")))
  }

  getUserByEmail(email: string) {
    this.userService.getByEmail(email).subscribe(response => {
      this.user = response.data
      this.localStorageService.setVariable("id", this.user.id.toString())
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

  getUserClaim(userId: number) {
    this.userOperationClaimService.getByUserId(userId).subscribe(response => {
      this.userOperationClaims = response.data
      this.ifAdmin = true
      console.log(this.userOperationClaims)
    })
  }

  checkAdmin(claimId: number) {
    if (claimId == 1) {
      this.ifAdmin = true
    }
  }
}
