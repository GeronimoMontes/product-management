import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from '../../../@core/root/auth.service';


export interface MenuSidebar {
  icon: string;
  action: any;
  text: string;
  childs: MenuSidebar[] | undefined | null
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    protected readonly router: Router,
    protected readonly authService: AuthService
  ) { }

  ngOnInit(): void { }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  navigate(url: string) {
    if (url.includes('logout')) {
      this.logOut()
      return;
    }

    this.router.navigateByUrl(url);
    return false;
  }

  logOut() {
    this.authService.logOut$();
    return false;
  }

  @Input() menuSidebar!: MenuSidebar[];
}
