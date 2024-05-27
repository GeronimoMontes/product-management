import { CommonModule } from '@angular/common';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { ProductoService } from './mock/producto.service';
import { MockDataModule } from './mock/mock-data.module';
import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import {
  AnalyticsService,
  LayoutService,
  PlayerService,
  SeoService,
  StateService,
} from './utils';
import { environment } from '../../environments/environment';
import { PublicData } from './data/publicModel';
import { PublicProviderService } from './mock/PublicProvider.service';
import { RolProviderService } from './mock/rolProvider.service';
import { AuthGuard } from './guards/authGuard.guard';

const GUARDS = [
  AuthGuard,
];

const DATA_SERVICES = [
  { provide: ProductoData, useClass: ProductoService },
  { provide: PublicData, useClass: PublicProviderService },
];

const formSetting: any = {
  redirectDelay: 500,
  strategy: 'email',
  remember: true,
  showMessages: {
    success: true,
    error: true,
  },
};

export const NB_CORE_PROVIDERS = [
  ...MockDataModule.forRoot().providers,
  ...GUARDS,
  ...DATA_SERVICES,

  AnalyticsService,
  LayoutService,
  PlayerService,
  SeoService,
  StateService,
];

@NgModule({
  imports: [CommonModule],
  exports: [NbAuthModule],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [...NB_CORE_PROVIDERS],
    };
  }
}
