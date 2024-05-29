import {
  Injectable,
  ComponentFactoryResolver,
  Injector,
  ApplicationRef,
  Type,
  EmbeddedViewRef,
  ComponentRef,
} from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalComponentRef: ComponentRef<any> | null = null;
  private closeSubject: Subject<any> = new Subject();

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef
  ) {}

  openModal(component: Type<any>, data: any): Observable<any> {
    // Crear una instancia del componente del modal
    const modalFactory =
      this.componentFactoryResolver.resolveComponentFactory(component);
    this.modalComponentRef = modalFactory.create(this.injector);

    // Pasar los datos al componente del modal
    Object.assign(this.modalComponentRef.instance, { data });

    // Adjuntar la vista del componente al ApplicationRef
    this.appRef.attachView(this.modalComponentRef.hostView);

    // Agregar el componente al DOM
    const modalElement = (
      this.modalComponentRef.hostView as EmbeddedViewRef<any>
    ).rootNodes[0] as HTMLElement;
    document.body.appendChild(modalElement);

    // Retornar un Observable que se completará cuando el modal se cierre
    return this.closeSubject.asObservable();
  }

  closeModal(result: any = null) {
    if (this.modalComponentRef) {
      this.appRef.detachView(this.modalComponentRef.hostView);
      this.modalComponentRef.destroy();
      this.modalComponentRef = null;
      this.closeSubject.next(result);
      this.closeSubject.complete();
      this.closeSubject = new Subject(); // Reset the subject for future modals
    }
  }
}
