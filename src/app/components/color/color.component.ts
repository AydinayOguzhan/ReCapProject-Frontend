import { Component, OnInit } from '@angular/core';
import { empty } from 'rxjs';
import { Color } from 'src/app/models/color/color';
import { ColorService } from 'src/app/services/colorService/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {
  colors:Color[] = []
  currentColor:Color
  emptyColor:Color = {id:0,colorName:""}

  constructor(private colorService:ColorService) { }

  ngOnInit(): void {
    this.getColors()
    this.currentColor = this.emptyColor
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data
    })
  }

  resetCurrentColor(){
    this.currentColor = this.emptyColor
  }

  resetCurrentColorClass(){
    if(this.currentColor == this.emptyColor){
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }

  setCurrentColor(color:Color){
    this.currentColor = color
  }

  setCurrentColorClass(color:Color){
    if(this.currentColor == color){
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }
}
