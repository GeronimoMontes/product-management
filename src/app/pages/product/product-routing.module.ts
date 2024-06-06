import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product.component';
import { TableProductComponent } from './table-product/table-product.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { FormProductComponent } from './form-product/form-product.component';
import { TableScrollProductComponent } from './table-scroll-product/table-scroll-product.component';

const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
    children: [
      {
        path: 'table-paginate',
        component: TableProductComponent,
      },
      {
        path: 'table-scroll',
        component: TableScrollProductComponent,
      },
      {
        path: 'detail/:id',
        component: ViewProductComponent,
      },
      {
        path: 'create',
        component: FormProductComponent,
      },
      {
        path: '',
        redirectTo: 'table-paginate',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'table-paginate',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule { }
