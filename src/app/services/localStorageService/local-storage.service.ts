import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setVariable(key:string, value:string){
    localStorage.setItem(key,value)
  }

  getVariable(key:string){
    return localStorage.getItem(key)
  }

  deleteVariable(key:string){
    localStorage.removeItem(key)
  }
}
