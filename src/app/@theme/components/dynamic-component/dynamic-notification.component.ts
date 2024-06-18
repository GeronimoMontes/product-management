import { Component } from '@angular/core';

@Component({
  selector: 'app-notification',
  template: `
    <div class="fixed bottom-5 right-5 w-80 z-50 cursor-pointer">
      <div
        class="w-full max-w-sm bg-white rounded-xl shadow-lg pointer-events-auto transition transform ease-out duration-300"
      >
        <div class="rounded-xl bg-white p-2">
          <div class="flex items-start">
            <div class="flex-shrink-0 m-auto">
              <i class="fas fa-question-circle text-yellow-500 fa-2x"></i>
            </div>
            <div class="ml-3 w-0 flex-1 pt-0.5">
              <p class="text-sm font-medium text-gray-900">
                notification.title
              </p>
              <p class="mt-1 text-sm text-gray-500">notification.message</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class DynamicNotificationComponent {}
