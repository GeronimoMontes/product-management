import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from './producto.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';

const SERVICES = [ProductService, AuthService];

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [...SERVICES],
})
export class MockDataModule {
  static forRoot(): ModuleWithProviders<MockDataModule> {
    return {
      ngModule: MockDataModule,
      providers: [...SERVICES],
    };
  }
}
