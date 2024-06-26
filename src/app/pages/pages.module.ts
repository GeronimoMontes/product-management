import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';



@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule { }
