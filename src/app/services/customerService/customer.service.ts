import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/customer/customer';
import { CustomerDetail } from 'src/app/models/customer/customerDetail';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiUrl = "https://localhost:44302/api/"

  constructor(private httpClient:HttpClient) { }

  getCustomersDetails():Observable<ListResponseModel<CustomerDetail>>{
    let newPath = this.apiUrl + "customers/getallcustomerdetail"
    return this.httpClient.get<ListResponseModel<CustomerDetail>>(newPath)
  }

  getCustomerDetailByUserId(userId:number):Observable<SingleResponseModel<CustomerDetail>>{
    let newPath = this.apiUrl + "customers/getcustomerdetailbyuserid?userId=" + userId
    return this.httpClient.get<SingleResponseModel<CustomerDetail>>(newPath)
  }

  getCustomerByUserId(userId:number):Observable<SingleResponseModel<Customer>>{
    let newPath = this.apiUrl + "customers/getbyuserid?userId=" + userId
    return this.httpClient.get<SingleResponseModel<Customer>>(newPath)
  }

  add(customer:Customer):Observable<ResponseModel>{
    let newPath = this.apiUrl + "customers/add"
    return this.httpClient.post<ResponseModel>(newPath,customer)
  }

  update(customer:Customer):Observable<ResponseModel>{
    let newPath = this.apiUrl + "customers/update"
    return this.httpClient.post<ResponseModel>(newPath,customer)
  }

  delete(customer:Customer):Observable<ResponseModel>{
    let newPath = this.apiUrl + "customers/delete"
    return this.httpClient.post<ResponseModel>(newPath,customer)
  }
}
