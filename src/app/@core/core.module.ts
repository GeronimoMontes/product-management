import { CommonModule } from '@angular/common';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { MockDataModule } from './mock/mock-data.module';
import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  AuthInterceptorService,
  ErrorInterceptorService,
  URLInterceptorService,
} from './http';
import { ProductData } from './data/productoModel';
import { ProductService } from './mock/producto.service';
import { authGuard } from './guards';

const GUARDS: any[] = [];

const DATA_SERVICES: any = [{ provide: ProductData, useClass: ProductService }];

const INTERCEPTORES = [
  { provide: HTTP_INTERCEPTORS, useClass: URLInterceptorService, multi: true },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptorService,
    multi: true,
  },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
];

const providersArray = MockDataModule.forRoot().providers;
const providers = providersArray !== undefined ? [...providersArray] : [];

export const NB_CORE_PROVIDERS = [
  providers,
  ...INTERCEPTORES,
  ...GUARDS,
  ...DATA_SERVICES,
];

@NgModule({
  imports: [CommonModule],
  exports: [],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [...NB_CORE_PROVIDERS, ...GUARDS],
    };
  }
}
