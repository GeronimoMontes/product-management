import {
  Injectable,
  ViewContainerRef,
  ComponentRef,
  Injector,
  ComponentFactoryResolver,
  Type,
} from '@angular/core';
import { Utils } from './utils';

export interface ToolsDynamicComponent {
  id: string;
  componentRef: ComponentRef<any>;
  renderizado?: boolean;
  destroy?: boolean;
  // more...
}

@Injectable({
  providedIn: 'root',
})
export class DynamicComponentService {
  constructor(private cfr: ComponentFactoryResolver) {}

  private components: ToolsDynamicComponent[] = [];

  create<T>(
    vcr: ViewContainerRef,
    component: Type<T>
  ): { ref: any; id: string } {
    const factory = this.cfr.resolveComponentFactory(component);
    const componentRef = vcr.createComponent(factory);
    const id = Utils.guidGenerator();
    this.components.push({ componentRef, id });
    return { ref: componentRef, id };
  }

  close(id: string) {
    const componentIndex = this.components.findIndex((comp) => comp.id === id);
    if (componentIndex !== -1) {
      const component = this.components[componentIndex];
      component.componentRef.destroy();
      this.components.splice(componentIndex, 1);
      console.log('Component destroyed');
    }
  }
}
