import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from '../../../@core/root/auth.service';

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
  ) {}

  ngOnInit(): void {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  navigateHome() {
    this.router.navigateByUrl('pages/products/table');
    return false;
  }

  navigateProfile() {
    this.router.navigateByUrl('pages/products/table');
    return false;
  }


  logOut() {
    this.authService.logOut$();
    return false;
  }
}
