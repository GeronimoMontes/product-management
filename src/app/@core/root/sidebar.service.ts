
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private isOpenSubject = new BehaviorSubject<boolean>(false);
  isOpen$ = this.isOpenSubject.asObservable();

  constructor() { }

  toggleSidebar() {
    this.isOpenSubject.next(!this.isOpenSubject.value);
  }

  closeSidebar() {
    this.isOpenSubject.next(false);
  }

  openSidebar() {
    this.isOpenSubject.next(true);
  }
}