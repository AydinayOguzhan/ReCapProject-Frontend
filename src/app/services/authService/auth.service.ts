import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginModel } from 'src/app/models/login/loginModel';
import { RegisterModel } from 'src/app/models/register/registerModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { TokenModel } from 'src/app/models/tokenModel';
import { User } from 'src/app/models/user/userModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = "https://localhost:44302/api/"
  logged:boolean

  constructor(private httpClient: HttpClient) { }

  login(loginModel: LoginModel): Observable<SingleResponseModel<TokenModel>> {
    let newPath = this.apiUrl + "auth/login"
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath, loginModel)
  }

  register(registerModel: RegisterModel):Observable<SingleResponseModel<TokenModel>>{
    let newPath = this.apiUrl + "auth/register"
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,registerModel)
  }

  update(user:User):Observable<ResponseModel>{
    let newPath = this.apiUrl + "auth/update"
    return this.httpClient.post<ResponseModel>(newPath,user)
  }

  logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("email")
  }

  isAuthenticated() {
    if (localStorage.getItem("token")) {
      this.logged = true
      return true
    }
    this.logged = false
    return false
  }
}
