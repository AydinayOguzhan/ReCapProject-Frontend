import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Claim } from 'src/app/models/claims/claims';
import { ListResponseModel } from 'src/app/models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class OperationClaimService {
  apiUrl = "https://localhost:44302/api/"

  constructor(private httpClient:HttpClient) { }

  getAll():Observable<ListResponseModel<Claim>>{
    let newPath = this.apiUrl + "operationclaims/getall"
    return this.httpClient.get<ListResponseModel<Claim>>(newPath)
  }
}
