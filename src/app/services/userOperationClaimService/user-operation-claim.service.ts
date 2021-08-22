import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { UserOperationClaim } from 'src/app/models/user/userOperationClaim';
import { UserOperationClaimDetail } from 'src/app/models/user/userOperationClaimDetail';
import { LocalStorageService } from '../localStorageService/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserOperationClaimService {
  // apiUrl = "https://localhost:44302/api/"
  apiUrl = "https://carapi.aydinayoguzhan.com/api/"

  constructor(private httpClient:HttpClient, private localStorageService:LocalStorageService) { }

  getAll():Observable<ListResponseModel<UserOperationClaim>>{
    let newPath = this.apiUrl + "useroperationclaims/getall"
    return this.httpClient.get<ListResponseModel<UserOperationClaim>>(newPath)
  }

  checkUserClaims(userId:number):Observable<ResponseModel>{
    let newPath = this.apiUrl + "useroperationclaims/checkifitsadmin?userId=" + userId
    return this.httpClient.get<ResponseModel>(newPath)
  }

  getByUserId(userId:number):Observable<ListResponseModel<UserOperationClaim>>{
    let newPath = this.apiUrl + "useroperationclaims/getbyuserid?userId=" + userId
    return this.httpClient.get<ListResponseModel<UserOperationClaim>>(newPath)
  }

  delete(userOperationClaim:UserOperationClaim):Observable<ResponseModel>{
    let newPath = this.apiUrl + "useroperationclaims/delete"
    return this.httpClient.post<ResponseModel>(newPath,userOperationClaim) 
  }

  add(userOperationClaim:UserOperationClaim):Observable<ResponseModel>{
    let newPath = this.apiUrl + "useroperationclaims/add"
    return this.httpClient.post<ResponseModel>(newPath,userOperationClaim)
  }

  getUserClaimsDetailsByUserId(userId:number):Observable<ListResponseModel<UserOperationClaimDetail>>{
    let newPath = this.apiUrl + "useroperationclaims/getclaimsdetailsbyuserid?userId=" + userId
    return this.httpClient.get<ListResponseModel<UserOperationClaimDetail>>(newPath)
  }
}
