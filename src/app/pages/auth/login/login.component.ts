import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { AuthService } from '../../../@core/root/auth.service';
import {
  AbstractControl,
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
export class LoginComponent implements OnInit, OnDestroy, OnChanges {
  constructor(
    protected readonly authService: AuthService,
    protected formBuilder: FormBuilder
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log({ changes });
    throw new Error('Method not implemented.');
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.authService.logOut$();
    this.initForm();
  }

  private initForm() {
    this.formGroup = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  public async formSubmit() {
    this.loading = true;
    this.submitted = true;

    if (this.formGroup.valid) {
      const { username, password } = this.formGroup.value;
      const body = {
        username: username,
        password: password,
      };
      this.authService
        .login$(body)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res) => {
          if (!!res.exception)
            this.error_form_response = res.exception.response.error;

          this.loading = false;
        });
    } else {
      this.loading = false;
    }
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

    if (this.controlValid(controlName))
      return control.errors.required
        ? `${controlName} field is required.`
        : control.errors.pattern && controlName === 'email'
        ? `EL formato no corresponde a un correo válido.`
        : control.errors.pattern && controlName === 'password'
        ? `Mínimo 8 caracteres con sibomolos, mayúsculas, minúsculas y numeros.`
        : '';
    return '';
  }

  public controlValid(controlName: string): boolean {
    const control: any = this.formGroup.get(controlName);
    return (
      (control.dirty && control.invalid) || (this.submitted && control.invalid)
    );
  }

  private destroy$: Subject<void> = new Subject<void>();
  public error_form_response: string = '';
  public loading: boolean = false;
  public submitted: boolean = false;
  public formGroup: any;
}
