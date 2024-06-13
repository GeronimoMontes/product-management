import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { IProduct } from '../../../@core/data';
import { ModalService } from '../../../@core/root/modal.service';

export interface ModalProdcutData {
  product: IProduct;
  message?: string;
  title?: string;
  icon: string;
  colorBtn: string;
}

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css'],
})
export class DeleteProductComponent {
  constructor(private el: ElementRef, private modalService: ModalService) {}

  emittResponse(response: boolean) {
    this.modalService.closeModal(response);
  }

  @Input() data!: ModalProdcutData;
}
