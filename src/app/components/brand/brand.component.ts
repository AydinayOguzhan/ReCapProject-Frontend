import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand/brand';
import { BrandService } from 'src/app/services/brandService/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  brands:Brand[] = []
  currentBrand:Brand
  emptyBrand:Brand = {id:0, brandName : ""}

  constructor(private brandService:BrandService) {
   }

  ngOnInit(): void {
    this.getBrands();
    this.currentBrand = this.emptyBrand
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data;
    });
  }
  
  resetCurrentBrandClass(){
    if(this.currentBrand == this.emptyBrand){
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
    this.currentBrand = this.emptyBrand
  }

  resetCurrentBrand(){
    this.currentBrand = this.emptyBrand
  }

  setCurrentBrand(brand:Brand){
    this.currentBrand = brand
  }

  setCurrentBrandClass(brand:Brand){
    if(this.currentBrand == brand){
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }

}
