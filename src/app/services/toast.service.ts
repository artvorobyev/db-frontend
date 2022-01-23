import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts: any[] = [];

  constructor() {}

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  showError(text: string): void {
    this.show(text || 'Произошла ошибка, попробуйте обновить страницу', {
      classname: 'bg-danger text-light',
    });
  }

  showSuccess(text: string): void {
    this.show(text, {
      classname: 'bg-success text-light',
    });
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }
}
