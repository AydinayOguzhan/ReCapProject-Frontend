import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { User } from 'src/app/models/user/userModel';
import { UserOperationClaimDetail } from 'src/app/models/user/userOperationClaimDetail';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // apiUrl = "https://localhost:44302/api/"
  apiUrl = "https://carapi.aydinayoguzhan.com/api/"

  constructor(private httpClient:HttpClient) { }

  getAll():Observable<ListResponseModel<User>>{
    let newPath = this.apiUrl + "users/getall"
    return this.httpClient.get<ListResponseModel<User>>(newPath)
  }

  getByEmail(email:string):Observable<SingleResponseModel<User>>{
    let newPath = this.apiUrl + "users/getbyemail?email=" + email
    return this.httpClient.get<SingleResponseModel<User>>(newPath)
  }

  getByUserId(userId:number):Observable<SingleResponseModel<User>>{
    let newPath = this.apiUrl + "users/getbyid?id=" + userId
    return this.httpClient.get<SingleResponseModel<User>>(newPath)
  }

  update(user:User):Observable<ResponseModel>{
    let newPath = this.apiUrl + "users/update"
    return this.httpClient.post<ResponseModel>(newPath,user)
  }

  delete(user:User):Observable<ResponseModel>{
    let newPath = this.apiUrl + "users/delete"
    return this.httpClient.post<ResponseModel>(newPath,user)
  }
}
