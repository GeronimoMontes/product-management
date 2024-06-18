import { Component, ViewContainerRef } from '@angular/core';
import { DynamicComponentService } from './dynamic-component.service';

export class DynamicComponentAbstract {
  private componentId!: string;

  constructor(
    protected dynamicComponentService: DynamicComponentService,
    protected viewContainerRef: ViewContainerRef
  ) {}

  loadComponent(component: any) {
    const { ref, id } = this.dynamicComponentService.create(
      this.viewContainerRef,
      component
    );
    this.componentId = id;
  }

  destroyComponent() {
    this.dynamicComponentService.close(this.componentId);
  }
}
