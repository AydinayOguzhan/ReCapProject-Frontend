import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from 'src/app/models/car/car';
import { CarDetail } from 'src/app/models/carDetails/carDetail';
import { CarImage } from 'src/app/models/carImage/carImage';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {
  apiUrl="https://localhost:44302/api/"

  constructor(private httpClient:HttpClient) { }

  getAll():Observable<ListResponseModel<CarImage>>{
    let newPath = this.apiUrl + "carimages/getall"
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath)
  }

  getCarById(carId:number):Observable<SingleResponseModel<CarDetail>>{
    let newPath = this.apiUrl + "cars/getdetailsbycarid?id=" + carId
    return this.httpClient.get<SingleResponseModel<CarDetail>>(newPath)
  }

  getCarImagesByCarId(carId:number):Observable<ListResponseModel<CarImage>>{
    let newPath = this.apiUrl + "carimages/getbycarid?carId=" + carId
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath)
  }

  add(formData:FormData):Observable<ResponseModel>{
    let newPath = this.apiUrl + "carimages/add"
    return this.httpClient.post<ResponseModel>(newPath,formData)
  }

  delete(carImage:CarImage):Observable<ResponseModel>{
    let newPath = this.apiUrl + "carImages/delete"
    return this.httpClient.post<ResponseModel>(newPath,carImage)
  }
}
