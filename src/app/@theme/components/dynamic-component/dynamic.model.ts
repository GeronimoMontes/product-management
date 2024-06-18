import { Component, ViewContainerRef } from '@angular/core';
import { DynamicComponentService } from './dynamic-component.service';
import { DynamicComponent } from './dynamic.component';

@Component({
  selector: 'app',
  template: '',
})
export class DynamicComponentAbstract {
  private componentId!: string;
  private vcr!: ViewContainerRef;

  constructor(
    protected dynamicComponentService: DynamicComponentService,
    protected viewContainerRef: ViewContainerRef
  ) {}

  ngAfterViewInit() {
    // Assign the ViewContainerRef from the current component
    this.vcr = this.viewContainerRef;
  }

  loadComponent() {
    const { ref, id } = this.dynamicComponentService.createComponent(
      this.vcr,
      DynamicComponent
    );
    this.componentId = id;
  }

  destroyComponent() {
    this.dynamicComponentService.closeComponent(this.componentId);
  }
}
