import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ThemeModule } from "../../@theme/theme.module";
import { AuthComponent } from "./auth.component";
import { AuthRoutingModule } from "./auth-routing.module";

@NgModule({
    imports: [
      AuthRoutingModule,
      CommonModule,
      ReactiveFormsModule,
      ThemeModule,
    ],
    declarations: [
      AuthComponent,
    ],
  })
  export class AuthModule { }