import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { guidGenerator } from './notification';

export interface Notification {
  id: string;
  type: 'alert' | 'info' | 'success' | 'error';
  title: string;
  message: string;
  duration: number;
}

/**
 *
 */
export const NotificationsIconsFontAsome = {
  alaert: 'fas fa-exclamation-circle',
  info: 'fas fa-question-circle',
  success: 'fas fa-check-circle',
  error: 'fas fa-bug',
};

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notifications: Notification[] = [];
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);

  get notifications$() {
    return this.notificationsSubject.asObservable();
  }

  showNotification(notification: Omit<Notification, 'id'>) {
 
    const id = guidGenerator(); // Simple unique ID generator
    const newNotification = { ...notification, id };
    this.notifications.push(newNotification);
    this.notificationsSubject.next(this.notifications);

    // Auto-remove notification after its duration
    setTimeout(() => this.removeNotification(id), notification.duration);
  }

  removeNotification(id: string) {
    this.notifications = this.notifications.filter(
      (notification) => notification.id !== id
    );
    this.notificationsSubject.next(this.notifications);
  }
}
