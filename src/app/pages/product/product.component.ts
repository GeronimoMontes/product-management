import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  endScroll($event: any) {
    console.log($event.target.scrollTop + $event.target.offsetHeight >= $event.target.scrollHeight)
  }

}
