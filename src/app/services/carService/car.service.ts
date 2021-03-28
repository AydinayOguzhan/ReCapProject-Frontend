import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Car } from 'src/app/models/car/car';
import { Brand } from 'src/app/models/brand/brand';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { CarBase } from 'src/app/models/car/carBase';
import { CarDetail } from 'src/app/models/carDetails/carDetail';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = "https://localhost:44302/api/"

  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl + "cars/getcardetails"
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  get():Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getall"
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrandId(brandId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl + "cars/getcardetailsbybrandid?brandId=" + brandId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath)
  }

  getCarsByColorId(colorId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl + "cars/getcardetailsbycolorid?colorId=" + colorId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath)
  }

  getById(carId:number):Observable<SingleResponseModel<CarBase>>{
    let newPath = this.apiUrl + "cars/getbyid?id=" + carId
    return this.httpClient.get<SingleResponseModel<CarBase>>(newPath)
  }

  add(car:Car):Observable<ResponseModel>{
    let newPath = this.apiUrl + "cars/add"
    return this.httpClient.post<ResponseModel>(newPath,car)
  }

  delete(car:Car):Observable<ResponseModel>{
    let newPath = this.apiUrl + "cars/delete"
    return this.httpClient.post<ResponseModel>(newPath,car)
  }
}
