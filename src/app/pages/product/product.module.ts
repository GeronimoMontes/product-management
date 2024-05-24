import { NgModule } from "@angular/core";
import { ProductComponent } from "./product.component";
import { ProductRoutingModule } from "./product-routing.module";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { ThemeModule } from "../../@theme/theme.module";
import { TableProductComponent } from "./table-product/table-product.component";

@NgModule({
  imports: [
    ProductRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    ThemeModule,
  ],
  declarations: [
    ProductComponent,
    TableProductComponent,
  ],
})
export class ProductModule { }