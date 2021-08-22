import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from 'src/app/models/brand/brand';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  // apiUrl = "https://localhost:44302/api/"
  apiUrl = "https://carapi.aydinayoguzhan.com/api/"

  constructor(private httpClient: HttpClient) { }

  getBrands(): Observable<ListResponseModel<Brand>> {
    let newPath = this.apiUrl + "brands/getall"
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }

  getById(brandId:number):Observable<SingleResponseModel<Brand>>{
    let newPath = this.apiUrl + "brands/getbyid?id=" + brandId
    return this.httpClient.get<SingleResponseModel<Brand>>(newPath)
  }

  delete(brand:Brand):Observable<ResponseModel>{
    let newPath = this.apiUrl + "brands/delete"
    return this.httpClient.post<ResponseModel>(newPath,brand) 
  }

  add(brand:Brand):Observable<ResponseModel>{
    let newPath = this.apiUrl + "brands/add"
    return this.httpClient.post<ResponseModel>(newPath,brand)
  }

  update(brand:Brand):Observable<ResponseModel>{
    let newPath = this.apiUrl + "brands/update"
    return this.httpClient.post<ResponseModel>(newPath, brand)
  }
}
