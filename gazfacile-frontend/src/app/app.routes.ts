import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';
import { revendeurGuard } from './core/guards/revendeur.guard';
import { inscriptionGuard, inscriptionClientGuard, inscriptionPlanGuard } from './core/guards/inscription.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'revendeur/inscription',
    loadComponent: () =>
      import('./features/revendeur/revendeur-form/revendeur-form.component').then(
        m => m.RevendeurFormComponent
      ),
    canActivate: [authGuard]
  },
  {
    path: 'revendeur/catalogue',
    loadComponent: () =>
      import('./features/revendeur/gestion-catalogue/gestion-catalogue.component').then(
        m => m.GestionCatalogueComponent
      ),
    canActivate: [revendeurGuard]
  },
  {
    path: 'revendeur/abonnement',
    loadComponent: () =>
      import('./features/revendeur/abonnement/abonnement.component').then(
        m => m.AbonnementComponent
      ),
    canActivate: [revendeurGuard]
  },
  {
    path: 'paiement/confirmation',
    loadComponent: () =>
      import('./features/paiement/confirmation/paiement-confirmation.component').then(
        m => m.PaiementConfirmationComponent
      )
  },
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'auth/register',
    loadComponent: () =>
      import('./features/auth/profile-choice/profile-choice.component').then(
        m => m.ProfileChoiceComponent
      )
  },
  {
    path: 'auth/register/client',
    loadComponent: () =>
      import('./features/auth/client-need/client-need.component').then(
        m => m.ClientNeedComponent
      ),
    canActivate: [inscriptionGuard]
  },
  {
    path: 'auth/register/client/plans',
    loadComponent: () =>
      import('./features/auth/client-plan/client-plan.component').then(
        m => m.ClientPlanComponent
      ),
    canActivate: [inscriptionGuard, inscriptionClientGuard]
  },
  {
    path: 'auth/register/revendeur',
    loadComponent: () =>
      import('./features/auth/revendeur-plan/revendeur-plan.component').then(
        m => m.RevendeurPlanComponent
      ),
    canActivate: [inscriptionGuard]
  },
  {
    path: 'auth/register/form',
    loadComponent: () =>
      import('./features/auth/register-form/register-form.component').then(
        m => m.RegisterFormComponent
      ),
    canActivate: [inscriptionGuard, inscriptionPlanGuard]
  },
  {
    path: 'abonnement/renouveler',
    loadComponent: () =>
      import('./features/auth/client-plan/client-plan.component').then(
        m => m.ClientPlanComponent
      ),
    canActivate: [authGuard]
  },
  {
    path: 'admin/login',
    loadComponent: () =>
      import('./features/admin/admin-login/admin-login.component').then(
        m => m.AdminLoginComponent
      )
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./features/admin/admin-dashboard/admin-dashboard.component').then(
        m => m.AdminDashboardComponent
      ),
    canActivate: [adminGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
