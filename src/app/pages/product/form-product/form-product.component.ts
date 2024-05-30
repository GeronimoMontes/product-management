import { Component, ElementRef, Inject, Input, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ModalService } from '../../../@core/root/modal.service';
import { Subject } from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ProductService } from '../../../@core/mock/producto.service';
import { IProduct } from '../../../@core/data/productoModel';
import { NotificationService } from '../../../@theme/components/notification/notification.service';

export enum FormProductAction {
  ADD = 'Agregar',
  UPDATE = 'Modificar',
  VIEW = 'View',
}

export interface FormProductData {
  action: FormProductAction;
  product: IProduct | undefined;
}

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.css'],
})
export class FormProductComponent implements OnInit {
  constructor(
    private el: ElementRef,
    private modalService: ModalService,
    @Inject(DOCUMENT) private document: Document,
    protected formBuilder: FormBuilder,
    protected readonly productService: ProductService,
    protected readonly notificationService: NotificationService
  ) {}

  ngOnInit() {
    console.log({ data: this.data });
    this.initForm();
    // Agrega un evento de clic en el documento para cerrar el modal al hacer clic fuera
    this.document.addEventListener('click', this.onDocumentClick.bind(this));
  }

  ngOnDestroy() {
    // Limpia el evento de clic del documento
    this.document.removeEventListener('click', this.onDocumentClick.bind(this));
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDocumentClick(event: MouseEvent) {
    const modalContent = this.el.nativeElement.querySelector('.relative');
    if (event.target === modalContent) {
      this.modalService.closeModal();
    }
  }

  closeModal() {
    this.modalService.closeModal();
  }

  private initForm() {
    this.formGroup = this.formBuilder.group({
      _id: new FormControl(this.data?.product?._id, []),
      name: new FormControl(this.data?.product?.name, []),
      description: new FormControl(this.data?.product?.description, []),
      price: new FormControl(this.data?.product?.price, []),
    });
  }

  public formSubmit() {
    this.loadingData = !this.loadingData;
    const { _id, name, description, price } = this.formGroup.value;

    if (this.data?.action === FormProductAction.UPDATE) {
      this.productService
        .updateProduct$(_id, {
          name,
          description,
          price,
        })
        .subscribe((updateProduct: IProduct) => {
          this.notificationService.showNotification({
            type: 'success',
            title: 'Producto actualizado',
            message: `El producto ${updateProduct.name} se ha actualizado de forma correcta.`,
            duration: 50000,
          });
          this.loadingData = !this.loadingData;
          this.closeModal();
        });
    } else if (this.data?.action === FormProductAction.ADD) {
      this.productService
        .createProduct$({
          name,
          description,
          price,
        })
        .subscribe((createProduct: IProduct) => {
          this.notificationService.showNotification({
            type: 'success',
            title: 'Producto Creado',
            message: `El producto ${createProduct.name} se ha creado de forma correcta.`,
            duration: 50000,
          });
          this.loadingData = !this.loadingData;
          this.closeModal();
        });
    }
  }

  /**
   * @description Obtiene el mensaje de error con respecto a la validacion violada
   * @param controlName
   * @returns
   */
  public getError(controlName: string, form: FormGroup): string {
    // para lanzar el validador necesitamos levantar las bandreas dirty y touched
    this.formGroup.get(controlName).markAsDirty();
    this.formGroup.get(controlName).markAsTouched();
    const control = this.formGroup.get(controlName);

    if (control.touched && control.errors != null)
      return control.errors.required
        ? `Campo obligatorio.`
        : control.errors.pattern && controlName === 'email'
        ? `EL formato no corresponde a un correo válido.`
        : control.errors.pattern && controlName === 'password'
        ? `Mínimo 8 caracteres con sibomolos, mayúsculas, minúsculas y numeros.`
        : '';
    return '';
  }

  /**
   * @description Valida si la informacion del input y retorna un estatus.
   * @param controlName
   * @param form
   * @returns <NbComponentStatus>
   */
  public validatorInput(controlName: string) {
    const control = this.formGroup.get(controlName);
    return !control.valid && control.dirty && control.touched
      ? 'border-red-600'
      : 'border-gray-300';
  }

  private destroy$: Subject<void> = new Subject<void>();
  public loadingData: boolean = false;
  public formGroup: any;
  @Input() data!: FormProductData;
}
