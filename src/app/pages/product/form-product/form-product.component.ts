import { Component, ElementRef, Inject, Input, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ModalService } from '../../../@core/root/modal.service';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.css'],
})
export class FormProductComponent implements OnInit {
  @Input() data: any;

  constructor(
    private el: ElementRef,
    private modalService: ModalService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    console.log({data: this.data})
    // Agrega un evento de clic en el documento para cerrar el modal al hacer clic fuera
    this.document.addEventListener('click', this.onDocumentClick.bind(this));
  }

  ngOnDestroy() {
    // Limpia el evento de clic del documento
    this.document.removeEventListener('click', this.onDocumentClick.bind(this));
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
}
