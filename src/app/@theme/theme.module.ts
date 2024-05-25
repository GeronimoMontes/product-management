import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components';
import { FooterComponent } from './components/footer/footer.component';

const NB_MODULES: any[] = [
	ReactiveFormsModule,
	FormsModule,
	RouterModule,
];

const COMPONENTS: any[] = [
	HeaderComponent,
	FooterComponent,
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