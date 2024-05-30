import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../@core/root/auth.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(
    protected readonly authService: AuthService,
    protected formBuilder: FormBuilder
  ) {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.formGroup = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        //  8 letras, con al menos un símbolo, letras mayúsculas y minúsculas y un número
        Validators.pattern(
          /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,30}$/
        ),
        Validators.minLength(8),
        Validators.maxLength(30),
      ]),
    });
  }

  public formSubmit() {
    this.loadingData = true;

    const { username, password } = this.formGroup.value;
    const body = {
      username: username,
      password: password,
    };
    this.authService
      .login$(body)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        console.log('asdfasdf');
        this.loadingData = false;
      });
  }

  /**
   * @description Obtiene el mensaje de error con respecto a la validacion violada
   * @param controlName
   * @returns
   */
  public getError(controlName: string): string {
    // para lanzar el validador necesitamos levantar las bandreas dirty y touched
    this.formGroup.get(controlName).markAsDirty();
    this.formGroup.get(controlName).markAsTouched();
    const control = this.formGroup.get(controlName);

    if (control.touched && control.errors != null)
      return control.errors.required
        ? `${controlName} field is required.`
        : control.errors.pattern && controlName === 'email'
        ? `EL formato no corresponde a un correo válido.`
        : control.errors.pattern && controlName === 'password'
        ? `Mínimo 8 caracteres con sibomolos, mayúsculas, minúsculas y numeros.`
        : '';
    return '';
  }

  public controlValid(controlName: string, form: any): boolean {
    const control = form.get(controlName);
    return control.dirty && control.touched && control.valid;
  }

  private destroy$: Subject<void> = new Subject<void>();
  public loadingData: boolean = false;
  public formGroup: any;
}
