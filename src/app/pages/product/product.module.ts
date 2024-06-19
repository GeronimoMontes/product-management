import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ThemeModule } from "../../@theme/theme.module";
import { FormProductComponent } from "./form-product/form-product.component";
import { ProductRoutingModule } from "./product-routing.module";
import { ProductComponent } from "./product.component";
import { TableProductComponent } from "./table-product/table-product.component";
import { TableScrollProductComponent } from "./table-scroll-product/table-scroll-product.component";

@NgModule({
  imports: [
    ProductRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    ThemeModule,
    FormsModule
  ],
  declarations: [
    ProductComponent,
    TableProductComponent,
    TableScrollProductComponent,
    FormProductComponent,
  ],
})
export class ProductModule { }
