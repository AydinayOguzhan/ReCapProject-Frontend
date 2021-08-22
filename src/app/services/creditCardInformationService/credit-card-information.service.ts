import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from 'src/app/models/creditCardInformation/creditCard';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardInformationService {
  // apiUrl = "https://localhost:44302/api/"
  apiUrl = "https://carapi.aydinayoguzhan.com/api/"

  constructor(private httpClient:HttpClient) { }

  getByUserId(userId:number):Observable<SingleResponseModel<CreditCard>>{
    let newPath = this.apiUrl + "creditcardinformations/getbyuserid?userId=" + userId
    return this.httpClient.get<SingleResponseModel<CreditCard>>(newPath)
  }

  checkIfCreditCardLegit(creditCard:CreditCard):Observable<ResponseModel>{
    let newPath = this.apiUrl + "creditcardinformations/checkifcreditcardlegit"
    return this.httpClient.post<ResponseModel>(newPath,creditCard)
  }

  add(creditCardInformation:CreditCard):Observable<ResponseModel>{
    let newPath = this.apiUrl + "creditcardinformations/add"
    return this.httpClient.post<ResponseModel>(newPath,creditCardInformation)
  }
}
