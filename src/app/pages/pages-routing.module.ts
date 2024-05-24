import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'products',
        loadChildren: () => import('./product/product.module')
          .then(m => m.ProductModule),
      }, 

      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module')
          .then(m => m.AuthModule),
      }, 
      {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full',
      }, {
        path: '**',
        redirectTo: 'products',
      },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}