import { Component, HostListener, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ConsultationService } from './core/services/consultation.service';
import { AuthService } from './core/services/auth.service';
import {
  InactivityModalComponent
} from './shared/components/inactivity-modal/inactivity-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <main class="contenu-principal">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .contenu-principal {
      min-height: calc(100vh - 64px);
      background-color: var(--color-bg);
      color: var(--color-text);
    }
  `]
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly consultationService = inject(ConsultationService);
  private readonly authService = inject(AuthService);
  private readonly dialog = inject(MatDialog);

  private inactiviteSub: Subscription | null = null;

  ngOnInit(): void {
    this.consultationService.chargerStatut();
    this.ecouterInactivite();
  }

  ngOnDestroy(): void {
    this.inactiviteSub?.unsubscribe();
  }

  // ── Réinitialise le timer sur toute interaction utilisateur ───────────────

  @HostListener('document:mousemove')
  @HostListener('document:click')
  @HostListener('document:keydown')
  @HostListener('document:touchstart')
  onActivite(): void {
    this.authService.resetActivityTimer();
  }

  // ── Modale d'inactivité ───────────────────────────────────────────────────

  private ecouterInactivite(): void {
    this.inactiviteSub = this.authService.inactivite$.subscribe(() => {
      // Ne pas empiler plusieurs modales
      if (this.dialog.openDialogs.length > 0) return;

      const ref = this.dialog.open(InactivityModalComponent, {
        disableClose: true,
        data: { countdown: 60 }
      });

      ref.afterClosed().subscribe((rester: boolean | undefined) => {
        if (rester) {
          // L'utilisateur est là → redémarre le timer
          this.authService.resetActivityTimer();
        } else {
          this.authService.logout();
        }
      });
    });
  }
}
