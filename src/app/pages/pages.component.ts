import { Component } from '@angular/core';

@Component({
  selector: 'app-pages',
  template: `
    <app-header></app-header>
    <h1>App Page</h1>
    <router-outlet />
  `,
})
export class PagesComponent {
}

