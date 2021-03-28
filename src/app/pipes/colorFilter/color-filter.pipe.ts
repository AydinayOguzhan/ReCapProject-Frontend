import { Pipe, PipeTransform } from '@angular/core';
import { Car } from 'src/app/models/car/car';
import { CarDetail } from 'src/app/models/carDetails/carDetail';

@Pipe({
  name: 'colorFilter'
})
export class ColorFilterPipe implements PipeTransform {

  transform(value: CarDetail[], filterText:string): CarDetail[] {
    filterText = filterText?filterText.toLocaleLowerCase():""
    return filterText?value.filter((c:CarDetail)=>c.colorName.toLocaleLowerCase().indexOf(filterText)!==-1):value
  }
}
