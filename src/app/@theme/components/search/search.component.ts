import { Component, EventEmitter, Output } from '@angular/core';
import { SearchService } from '../../../@core/root/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  constructor(protected readonly searchService: SearchService) {}

  public onSearchChange($event: any): void {
    this.searchService.changeSearchQuery($event.target.value);
  }

  @Output('onInput') onInputEvent = new EventEmitter<string>();
}
