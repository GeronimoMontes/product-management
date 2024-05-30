import { Component, OnInit } from '@angular/core';
import { NotificationService, Notification } from './notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  notifications: Notification[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.notifications$.subscribe((notifications) => {
      this.notifications = notifications;
    });
  }

  closeNotification(id: string) {
    this.notificationService.removeNotification(id);
  }

  getIconClass(notification: Notification) {
    return notification.type === 'alert'
      ? 'fas fa-exclamation-circle text-blue-500'
      : notification.type === 'info'
      ? 'fas fa-question-circle text-yellow-500'
      : notification.type === 'success'
      ? 'fas fa-check-circle text-green-500'
      : notification.type === 'error'
      ? 'fas fa-bug text-red-500'
      : '';
  }
}
