import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent, HeaderComponent, SidebarComponent } from './components';

const NB_MODULES: any[] = [
	ReactiveFormsModule,
	FormsModule,
	RouterModule,
];

const COMPONENTS: any[] = [
	HeaderComponent,
	FooterComponent,
	SidebarComponent,
];

const PIPES: any[] = [];

const DIRECTIVES: any[] = [];


@NgModule({
	imports: [
		CommonModule,
		...NB_MODULES,
	],
	exports: [
		CommonModule,
		...PIPES,
		...COMPONENTS,
		...DIRECTIVES,
	],
	declarations: [
		...COMPONENTS,
		...PIPES,
		...DIRECTIVES,
	],
})
export class ThemeModule {
	static forRoot(): ModuleWithProviders<ThemeModule> {
		return {
			ngModule: ThemeModule,
		}
	}
}