import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../../core/services/auth.service';
import { Role } from '../../../core/models/revendeur.model';
import { NotificationBellComponent } from '../../../features/notifications/notification-bell/notification-bell.component';

/**
 * Barre de navigation principale de GazFacile.
 * Affiche les liens selon le rôle de l'utilisateur connecté.
 */
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    NotificationBellComponent
  ],
  template: `
    <mat-toolbar class="navbar">
      <!-- Logo -->
      <a routerLink="/" class="logo">
        <img src="assets/logo.svg" alt="GazFacile" class="logo-img">
      </a>

      <span class="spacer"></span>

      <!-- Navigation desktop -->
      <nav class="nav-desktop">
        <a mat-button routerLink="/" routerLinkActive="actif" [routerLinkActiveOptions]="{exact: true}">
          <mat-icon>home</mat-icon>
          Accueil
        </a>

        @if (authService.hasRole(Role.REVENDEUR)) {
          <a mat-button routerLink="/revendeur/inscription">
            <mat-icon>store</mat-icon>
            Mon dépôt
          </a>
          <a mat-button routerLink="/revendeur/catalogue" routerLinkActive="actif">
            <mat-icon>inventory_2</mat-icon>
            Mon catalogue
          </a>
          <a mat-button routerLink="/revendeur/abonnement" routerLinkActive="actif">
            <mat-icon>workspace_premium</mat-icon>
            Abonnement
          </a>
        }

        @if (authService.hasRole(Role.ADMIN)) {
          <a mat-button routerLink="/admin" routerLinkActive="actif">
            <mat-icon>dashboard</mat-icon>
            Dashboard
          </a>
        }

        @if (!authService.estConnecte()) {
          <a mat-button routerLink="/auth/login">Connexion</a>
          <a mat-raised-button routerLink="/auth/register" class="btn-register">
            Inscription
          </a>
        } @else {
          <app-notification-bell></app-notification-bell>
          <button mat-button [matMenuTriggerFor]="menuUtilisateur" class="btn-user">
            <mat-icon>account_circle</mat-icon>
            {{ authService.currentUser()?.nom || authService.currentUser()?.telephone }}
            <mat-icon>arrow_drop_down</mat-icon>
          </button>
          <mat-menu #menuUtilisateur="matMenu">
            <button mat-menu-item (click)="authService.logout()">
              <mat-icon>logout</mat-icon>
              Déconnexion
            </button>
          </mat-menu>
        }
      </nav>

      <!-- Menu mobile -->
      <button mat-icon-button class="nav-mobile-btn" [matMenuTriggerFor]="menuMobile">
        <mat-icon>menu</mat-icon>
      </button>
      <mat-menu #menuMobile="matMenu">
        <a mat-menu-item routerLink="/">
          <mat-icon>home</mat-icon>
          Accueil
        </a>
        @if (authService.hasRole(Role.REVENDEUR)) {
          <a mat-menu-item routerLink="/revendeur/inscription">
            <mat-icon>store</mat-icon>
            Mon dépôt
          </a>
          <a mat-menu-item routerLink="/revendeur/catalogue">
            <mat-icon>inventory_2</mat-icon>
            Mon catalogue
          </a>
          <a mat-menu-item routerLink="/revendeur/abonnement">
            <mat-icon>workspace_premium</mat-icon>
            Abonnement
          </a>
        }
        @if (authService.hasRole(Role.ADMIN)) {
          <a mat-menu-item routerLink="/admin">
            <mat-icon>dashboard</mat-icon>
            Dashboard Admin
          </a>
        }
        @if (!authService.estConnecte()) {
          <a mat-menu-item routerLink="/auth/login">
            <mat-icon>login</mat-icon>
            Connexion
          </a>
          <a mat-menu-item routerLink="/auth/register">
            <mat-icon>person_add</mat-icon>
            Inscription
          </a>
        } @else {
          <button mat-menu-item (click)="authService.logout()">
            <mat-icon>logout</mat-icon>
            Déconnexion ({{ authService.currentUser()?.nom }})
          </button>
        }
      </mat-menu>
    </mat-toolbar>
  `,
  styles: [`
    .navbar {
      background-color: white !important;
      border-bottom: 1px solid var(--color-border);
      height: 64px;
      padding: 0 24px;
      position: sticky;
      top: 0;
      z-index: 1000;
      box-shadow: 0 2px 12px rgba(44, 71, 112, 0.1);
    }

    .logo {
      display: flex;
      align-items: center;
      text-decoration: none;
      cursor: pointer;

      .logo-img {
        height: 36px;
        width: auto;
        display: block;
      }
    }

    .spacer {
      flex: 1;
    }

    .nav-desktop {
      display: flex;
      align-items: center;
      gap: 4px;

      a, button {
        color: var(--color-primary) !important;
        transition: color 0.2s;

        &:hover, &.actif {
          color: var(--color-accent) !important;
        }

        mat-icon {
          margin-right: 4px;
          font-size: 1.1rem;
          height: 1.1rem;
          width: 1.1rem;
        }
      }
    }

    .btn-register {
      background-color: var(--color-accent) !important;
      color: white !important;
      
      padding: 0 20px !important;
      margin-left: 8px;
      font-weight: 700 !important;
      text-transform: uppercase;
      letter-spacing: 0.05em;

      &:hover {
        background-color: var(--color-accent-dark) !important;
        color: white !important;
      }
    }

    .btn-user {
      display: flex;
      align-items: center;
      gap: 4px;
      color: var(--color-primary) !important;
    }

    .nav-mobile-btn {
      display: none !important;
      color: var(--color-primary) !important;
    }

    @media (max-width: 768px) {
      .nav-desktop {
        display: none;
      }

      .nav-mobile-btn {
        display: flex !important;
      }
    }
  `]
})
export class NavbarComponent {
  readonly authService = inject(AuthService);
  readonly Role = Role;
}
