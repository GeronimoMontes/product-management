import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>app root</h1>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  title = 'product-management';
}
