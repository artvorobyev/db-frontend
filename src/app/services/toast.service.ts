import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts: any[] = [];

  constructor() {}

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    console.log('show', textOrTpl);
    this.toasts.push({ textOrTpl, ...options });
  }

  showError(textOrTpl: string): void {
    this.show(textOrTpl || 'Произошла ошибка, попробуйте обновить страницу', {
      classname: 'bg-danger text-light',
    });
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }
}
