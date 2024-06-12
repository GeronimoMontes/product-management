import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ProductService } from '../../../@core/mock/producto.service';

export function uniqueNameValidator(
  productService: ProductService
): AsyncValidatorFn {
  return (
    control: AbstractControl
  ): Observable<{ [key: string]: any } | null> => {
    if (!control.value) {
      return of(null);
    }
    const value = control.value
      .split(' ')
      .filter((e: string) => e !== '')
      .join(' ')
      .trim();
    return productService.isNameTaken(value).pipe(
      map((isTaken) => (isTaken ? { uniqueName: true } : null)),
      catchError(() => of(null)) // Manejo de errores opcional
    );
  };
}
