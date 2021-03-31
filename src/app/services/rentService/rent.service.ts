import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetail } from 'src/app/models/carDetails/carDetail';
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

  getCarDetails(carId:number):Observable<SingleResponseModel<CarDetail>>{
    let newPath = this.apiUrl + "cars/getdetailsbycarid?id=" + carId
    return this.httpClient.get<SingleResponseModel<CarDetail>>(newPath)
  }

  canItBeRented(carId:number):Observable<SingleResponseModel<Rental>>{
    let newPath = this.apiUrl + "rentals/getrentaldetailbycarid?carId=" + carId
    return this.httpClient.get<SingleResponseModel<Rental>>(newPath)
  }

  add(rent:Rent):Observable<ResponseModel>{
    let newPath = this.apiUrl + "rentals/add"
    return this.httpClient.post<ResponseModel>(newPath,rent)
  }
}
