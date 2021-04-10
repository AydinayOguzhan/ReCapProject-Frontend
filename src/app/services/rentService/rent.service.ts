import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetail } from 'src/app/models/carDetails/carDetail';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Rent } from 'src/app/models/rent/rent';
import { Rental } from 'src/app/models/rental/rental';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RentService {
  apiUrl = "https://localhost:44302/api/"

  constructor(private httpClient:HttpClient) { }

  getRentals():Observable<ListResponseModel<Rental>>{
    let newPath = this.apiUrl + "rentals/getallrentaldetail"
    return this.httpClient.get<ListResponseModel<Rental>>(newPath)
  }

  getCarDetails(carId:number):Observable<SingleResponseModel<CarDetail>>{
    let newPath = this.apiUrl + "cars/getdetailsbycarid?id=" + carId
    return this.httpClient.get<SingleResponseModel<CarDetail>>(newPath)
  }

  canItBeRented(carId:number):Observable<SingleResponseModel<Rental>>{
    let newPath = this.apiUrl + "rentals/getrentaldetailbycarid?carId=" + carId
    return this.httpClient.get<SingleResponseModel<Rental>>(newPath)
  }

  getRentalDetailByUserId(userId:number):Observable<ListResponseModel<Rental>>{
    let newPath = this.apiUrl + "rentals/getrentaldetailsbyuserid?userId=" + userId
    return this.httpClient.get<ListResponseModel<Rental>>(newPath)
  }

  add(rent:Rent):Observable<ResponseModel>{
    let newPath = this.apiUrl + "rentals/add"
    return this.httpClient.post<ResponseModel>(newPath,rent)
  }

  update(rent:Rent):Observable<ResponseModel>{
    let newPath = this.apiUrl + "rentals/update"
    return this.httpClient.post<ResponseModel>(newPath,rent)
  }
}
