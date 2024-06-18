import {
  Component,
  OnDestroy,
  OnInit,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { DynamicComponentService } from './dynamic-component.service';

@Component({
  standalone: true,
  selector: 'dynamic',
  template: `
    <!-- <div
      style="height: 100vh; width: 100vw; z-index: 1000;"
      class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75"
      >
      <i class="fas fa-spinner fa-spin fa-3x text-white"></i>
    </div>
     -->
    <div
    data-cy="cy-table-loading"
    style="height: 100vh; width: 100vw; z-index: 1000;"
      class="fixed inset-0 rounded-xl  flex flex-row items-center justify-center bg-slate-800 bg-opacity-60 z-40"
    >
      <i class="animate-spin fas fa-spinner text-8xl"></i>
      <span class="sr-only">Loading...</span>
    </div>
  `,
})
export class DynamicComponent {
  private componentId!: string;
  private vcr!: ViewContainerRef;

  constructor(
    private dynamicComponentService: DynamicComponentService,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngAfterViewInit() {
    // Assign the ViewContainerRef from the current component
    this.vcr = this.viewContainerRef;
  }

  loadComponent() {
    const { ref, id } = this.dynamicComponentService.create(
      this.vcr,
      DynamicComponent
    );
    this.componentId = id;
  }

  destroyComponent() {
    this.dynamicComponentService.close(this.componentId);
  }
}
