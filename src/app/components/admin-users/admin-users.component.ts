import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user/userModel';
import { LocalStorageService } from 'src/app/services/localStorageService/local-storage.service';
import { UserOperationClaimService } from 'src/app/services/userOperationClaimService/user-operation-claim.service';
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  ifAdmin: boolean
  waitForData: boolean = false
  users:User[]

  constructor(private userOperationClaimService: UserOperationClaimService, private localStorageService: LocalStorageService,
    private userService:UserService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.checkUserClaims(parseInt(this.localStorageService.getVariable("id")))
  }

  checkUserClaims(userId: number) {
    this.userOperationClaimService.checkUserClaims(userId).subscribe(response => {
      if (response.success) {
        this.ifAdmin = response.success
        this.getUsers()
      } else {
        this.ifAdmin = response.success
      }
    }, errorResponse => {
      console.log(errorResponse.error.message)
    })
  }

  getUsers(){
    this.userService.getAll().subscribe(response=>{
      this.users = response.data
      this.waitForData = true
      this.toastr.info(response.message)
    },errorResponse=>{
      this.toastr.error(errorResponse.error.message)
    })
  }

  delete(user:User){
    console.log(user)
  }

  editClaims(userId:number){
    console.log(userId)
  }
}
