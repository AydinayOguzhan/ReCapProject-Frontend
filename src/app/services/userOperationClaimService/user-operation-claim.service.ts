import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { UserOperationClaim } from 'src/app/models/user/userOperationClaim';

@Injectable({
  providedIn: 'root'
})
export class UserOperationClaimService {
  apiUrl = "https://localhost:44302/api/"

  constructor(private httpClient:HttpClient) { }

  getByUserId(userId:number):Observable<ListResponseModel<UserOperationClaim>>{
    let newPath = this.apiUrl + "useroperationclaims/getbyuserid?userId=" + userId
    return this.httpClient.get<ListResponseModel<UserOperationClaim>>(newPath)
  }
}
