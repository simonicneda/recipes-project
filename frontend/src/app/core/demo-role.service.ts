import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DemoRoleService {
  readonly role = signal<'user' | 'admin'>('user');
}