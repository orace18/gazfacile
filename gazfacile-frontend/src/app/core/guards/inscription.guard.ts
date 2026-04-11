import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { InscriptionStateService } from '../services/inscription-state.service';

export const inscriptionGuard: CanActivateFn = () => {
  const state = inject(InscriptionStateService);
  const router = inject(Router);

  if (!state.role()) {
    return router.createUrlTree(['/auth/register']);
  }
  return true;
};

export const inscriptionClientGuard: CanActivateFn = () => {
  const state = inject(InscriptionStateService);
  const router = inject(Router);

  if (!state.clientNeed()) {
    return router.createUrlTree(['/auth/register/client']);
  }
  return true;
};

export const inscriptionPlanGuard: CanActivateFn = () => {
  const state = inject(InscriptionStateService);
  const router = inject(Router);

  if (!state.selectedPlan()) {
    return router.createUrlTree(['/auth/register']);
  }
  return true;
};
