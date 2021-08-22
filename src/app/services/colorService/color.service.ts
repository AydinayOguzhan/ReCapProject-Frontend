import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from 'src/app/models/color/color';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  // apiUrl = "https://localhost:44302/api/"
  apiUrl = "https://carapi.aydinayoguzhan.com/api/"

  constructor(private httpClient:HttpClient) { }

  getColors():Observable<ListResponseModel<Color>>{
    let newPath = this.apiUrl +  "colors/getall"
    return this.httpClient.get<ListResponseModel<Color>>(newPath)
  }

  getById(colorId:number):Observable<SingleResponseModel<Color>>{
    let newPath = this.apiUrl + "colors/getbyid?id=" + colorId
    return this.httpClient.get<SingleResponseModel<Color>>(newPath) 
  }

  add(color:Color):Observable<ResponseModel>{
    let newPath = this.apiUrl + "colors/add"
    return this.httpClient.post<ResponseModel>(newPath, color)
  }

  update(color:Color){
    let newPath = this.apiUrl + "colors/update"
    return this.httpClient.post<ResponseModel>(newPath, color)
  }

  delete(color:Color){
    let newPath = this.apiUrl + "colors/delete"
    return this.httpClient.post<ResponseModel>(newPath, color)
  }
}
