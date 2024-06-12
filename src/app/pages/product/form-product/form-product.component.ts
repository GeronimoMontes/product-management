import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ModalService } from '../../../@core/root/modal.service';
import { Subject } from 'rxjs';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ProductService } from '../../../@core/mock/producto.service';
import { IProduct } from '../../../@core/data';
import { NotificationService } from '../../../@theme/components/notification/notification.service';
import {
  DeleteProductComponent,
  ModalProdcutData,
} from '../delete-product/delete-product.component';
import Swal from 'sweetalert2';
import { uniqueNameValidator } from './unique-name.validator';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.css'],
})
export class FormProductComponent implements OnInit {
  constructor(
    private el: ElementRef,
    private modalService: ModalService,
    protected formBuilder: FormBuilder,
    protected readonly productService: ProductService,
    protected readonly notificationService: NotificationService
  ) {}

  ngOnInit() {
    console.log({ data: this.data });
    this.initForm();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // FIXME: Nunca funciono...
  onDocumentClick(event: MouseEvent) {
    const modalContent = this.el.nativeElement.querySelector('.relative');
    if (event.target === modalContent) {
      this.modalService.closeModal();
    }
  }

  closeModal(response: boolean) {
    this.modalService.closeModal(response);
  }

  private initForm() {
    this.formGroup = this.formBuilder.group({
      _id: new FormControl(this.data?._id, []),
      name: new FormControl(
        this.data?.name,
        [Validators.required, Validators.maxLength(60)],
        [uniqueNameValidator(this.productService)]
      ),
      description: new FormControl(this.data?.description, [
        Validators.required,
        Validators.maxLength(100),
      ]),
      price: new FormControl(this.data?.price, [
        Validators.required,
        Validators.pattern(/^([0-9]*[.])?[0-9]+$/),
      ]),
    });
  }

  public formSubmit() {
    this.loadingData = true;
    this.submitted = true;

    if (this.formGroup.valid) {
      const data = this.formGroup.value;

      Swal.fire({
        title: `You want to ${this.actionClick} the ${data.name} product from the system?`,
        showCancelButton: true,
        confirmButtonText: 'Acept',
      }).then((result) => {
        if (result.isConfirmed) {
          this.productService
            .productFetch$(this.actionClick, data)
            .subscribe((updateProduct: IProduct) => {
              this.notificationService.showNotification({
                type: 'success',
                title: 'Update product',
                message: `The product ${updateProduct.name} has been successfully updated.`,
                duration: 50000,
              });
              this.loadingData = !this.loadingData;
              this.closeModal(false);
            });
        }
      });
    }
  }

  public getError(controlName: string): string {
    // para lanzar el validador necesitamos levantar las bandreas dirty y touched
    this.formGroup.get(controlName).markAsDirty();
    this.formGroup.get(controlName).markAsTouched();
    const control = this.formGroup.get(controlName);

    if (control.touched && control.errors != null)
     console.log (control.errors);
      return control.errors.required
        ? `${controlName} field is required.`
        : control.errors.pattern && controlName === 'price'
        ? `Please enter only positive numbers.`
        : control.errors.pattern && controlName === 'password'
        ? `Minimum 8 characters with symbols, uppercase, lowercase, and numbers.`
        : control.errors['uniqueName'] && controlName === 'name'
        ? `The product name is already registered.`
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
  public loadingData: boolean = false;
  public submitted: boolean = false;
  public actionClick: any;
  public formGroup: any;
  @Input() data: IProduct | undefined;
}
