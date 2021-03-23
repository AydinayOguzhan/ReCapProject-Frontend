import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from 'src/app/models/creditCardInformation/creditCard';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class BuyService {
  apiUrl="https://localhost:44302/api/"

  constructor(private httpClient:HttpClient) { }

  rent(creditCard:CreditCard):Observable<ResponseModel>{
    let newPath = this.apiUrl + "creditcardinformations/add"
    return this.httpClient.post<ResponseModel>(newPath,creditCard)    
  }
}
