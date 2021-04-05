import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { UserOperationClaim } from 'src/app/models/user/userOperationClaim';
import { LocalStorageService } from '../localStorageService/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserOperationClaimService {
  apiUrl = "https://localhost:44302/api/"

  constructor(private httpClient:HttpClient, private localStorageService:LocalStorageService) { }

  checkUserClaims(userId:number):Observable<ResponseModel>{
    let newPath = this.apiUrl + "useroperationclaims/checkifitsadmin?userId=" + userId
    return this.httpClient.get<ResponseModel>(newPath)
  }


}
