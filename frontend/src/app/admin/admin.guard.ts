import { inject, isDevMode } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { DemoRoleService } from '../core/demo-role.service';

export const adminGuard: CanMatchFn = () => {
  const session = inject(DemoRoleService);
  const router = inject(Router);

  return isDevMode() && session.role() === 'admin'
    ? true
    : router.createUrlTree(['/']);
};