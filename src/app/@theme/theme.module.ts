import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  FooterComponent,
  HeaderComponent,
  NotificationComponent,
  SidebarComponent,
  PaginateComponent,
  TableComponent,
} from './components';
import { ReplacePipe } from './pipes/replace.pipe';

const MODULES: any[] = [ReactiveFormsModule, FormsModule, RouterModule];

const COMPONENTS: any[] = [
  HeaderComponent,
  FooterComponent,
  SidebarComponent,
  NotificationComponent,
  PaginateComponent,
  TableComponent,
];

const PIPES: any[] = [ReplacePipe];

const DIRECTIVES: any[] = [];

@NgModule({
  imports: [CommonModule, ...MODULES],
  exports: [CommonModule, ...PIPES, ...COMPONENTS, ...DIRECTIVES],
  declarations: [...COMPONENTS, ...PIPES, ...DIRECTIVES],
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders<ThemeModule> {
    return {
      ngModule: ThemeModule,
    };
  }
}
