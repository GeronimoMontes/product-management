import Swal from 'sweetalert2'
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
  ) { }

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
      name: new FormControl(this.data?.name, [
        Validators.required,
        Validators.maxLength(300),
      ]),
      description: new FormControl(this.data?.description, [
        Validators.required,
        Validators.maxLength(300),
      ]),
      price: new FormControl(this.data?.price, [
        Validators.required,
        Validators.pattern(/^([0-9]*[.])?[0-9]+$/),
      ]),
    });
  }

  public formSubmit(form: FormGroup) {
    this.loadingData = !this.loadingData;

    if (!form.valid) {
      this.loadingData = false;
      console.log({ form });
      return;
    }
    const data = this.formGroup.value;
    const modalData: ModalProdcutData = {
      product: data,
      message: `You want to ${this.actionClick} the ${data.name} product from the system?`,
      title: `${this.actionClick.charAt(0).toUpperCase() + this.actionClick.slice(1)
        } product.`,
      icon: 'fa fa-question',
      colorBtn:
        this.actionClick === 'delete'
          ? 'bg-red-600'
          : this.actionClick === 'create'
            ? 'bg-blue-600'
            : 'bg-yellow-600',
    };

    this.closeModal(false);
    Swal.fire({
      title: 'Error!',
      text: 'Do you want to continue',
      icon: 'error',
      confirmButtonText: 'Cool'
    })
    this.modalService
      .openModal(DeleteProductComponent, modalData)
      .subscribe((response) => {
        if (response) {
          // REVIEW: generar metodo get promise event
          this.productService
            .productFetch$(this.actionClick, data)
            .subscribe((updateProduct: IProduct) => {
              this.notificationService.showNotification({
                type: 'success',
                title: 'Producto actualizado',
                message: `El producto ${updateProduct.name} se ha actualizado de forma correcta.`,
                duration: 50000,
              });
              this.loadingData = !this.loadingData;
              // REVIEW: No debe retornar false
              this.closeModal(false);
            });
        }
      });
  }

  public getError(controlName: string): string {
    // para lanzar el validador necesitamos levantar las bandreas dirty y touched
    this.formGroup.get(controlName).markAsDirty();
    this.formGroup.get(controlName).markAsTouched();
    const control = this.formGroup.get(controlName);

    if (control.touched && control.errors != null)
      return control.errors.required
        ? `${controlName} field is required.`
        : control.errors.pattern && controlName === 'price'
          ? `Ingrese solo numeros positivos.`
          : control.errors.pattern && controlName === 'password'
            ? `Mínimo 8 caracteres con sibomolos, mayúsculas, minúsculas y numeros.`
            : '';
    return '';
  }

  public controlValid(controlName: string, form: any): boolean {
    const control = form.get(controlName);
    return control.dirty && control.touched && control.valid;
  }

  eventClick() {
    console.log('click');
  }

  private destroy$: Subject<void> = new Subject<void>();
  public loadingData: boolean = false;
  public actionClick: any;
  public formGroup: any;
  @Input() data: IProduct | undefined;
}
