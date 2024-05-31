import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sadfasdf',
})
export class SearchPipe implements PipeTransform {
    constructor(
        
    ){}
  transform(value: any, ...args: any[]) {
    
    throw new Error('Method not implemented.');
  }
}
