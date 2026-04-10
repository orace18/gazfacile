import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';
import { revendeurGuard } from './core/guards/revendeur.guard';

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
      import('./features/auth/register/register.component').then(m => m.RegisterComponent)
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
