import { LOCALE_ID, NgModule } from '@angular/core';

import localeEs from '@angular/common/locales/es';
import {  registerLocaleData } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


registerLocaleData(localeEs);

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ThemeModule.forRoot(),
        CoreModule.forRoot()
],
    providers: [{ provide: LOCALE_ID, useValue: 'es-*' }],
    bootstrap: [AppComponent]
})
export class AppModule { }