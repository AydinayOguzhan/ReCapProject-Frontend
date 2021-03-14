import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Car } from 'src/app/models/car/car';
import { Brand } from 'src/app/models/brand/brand';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = "https://localhost:44302/api/"

  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcardetails"
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrandId(brandId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcardetailsbybrandid?brandId=" + brandId
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }
}
