import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { UserData } from '../../../@core/data';
import { SidebarService } from './sidebar.service';

export interface MenuSidebar {
  icon: string;
  action: any;
  text: string;
  childs: MenuSidebar[] | undefined | null;
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  constructor(
    protected readonly router: Router,
    private sidebarService: SidebarService,
    protected readonly authService: UserData
  ) {
    this.isOpen = this.sidebarService.isOpen$;
  }

  closeSidebar() {
    const a = setTimeout(() => {
      this.sidebarService.closeSidebar();
      clearTimeout(a);
    }, 300);
  }

  ngOnInit() {
    this.sidebarService.closeSidebar(); // Para asegurarse de que el sidebar esté cerrado al iniciar el componente
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  navigate(url: string) {
    if (url.includes('logout')) {
      this.logOut();
      return;
    }

    this.router.navigateByUrl(url);
    this.sidebarService.toggleSidebar();
    return false;
  }

  logOut() {
    this.authService.logOut$();
    return false;
  }

  private destroy$: Subject<void> = new Subject<void>();
  public isOpen: Observable<boolean>;

  @Input() menuSidebar!: MenuSidebar[];
}
