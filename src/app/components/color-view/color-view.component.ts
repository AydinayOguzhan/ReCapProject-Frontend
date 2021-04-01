import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color/color';
import { ColorService } from 'src/app/services/colorService/color.service';

@Component({
  selector: 'app-color-view',
  templateUrl: './color-view.component.html',
  styleUrls: ['./color-view.component.css']
})
export class ColorViewComponent implements OnInit {
  colors:Color[]

  constructor(private colorService:ColorService ,private router:Router, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getColors()
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data
    },errorResponse=>{
      console.log(errorResponse.message)
    })
  }

  delete(color:Color){
    this.colorService.delete(color).subscribe(response=>{
      window.location.reload()
      this.toastr.info(response.message)
    },errorResponse=>{
      console.log(errorResponse.message)
    })
  }

  goUpdate(colorId:number){  
    let newUrl = "admin/update/color/" + colorId
    this.router.navigateByUrl(newUrl)  
  }

}
