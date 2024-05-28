import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from './producto.service';
import { UserProviderService } from './UserProvider.service';
import { HttpClientModule } from '@angular/common/http';

const SERVICES = [
  ProductService,
  UserProviderService,
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class MockDataModule {
  static forRoot(): ModuleWithProviders<MockDataModule> {
    return {
      ngModule: MockDataModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
