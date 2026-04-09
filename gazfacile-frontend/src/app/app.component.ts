import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ConsultationService } from './core/services/consultation.service';

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
export class AppComponent implements OnInit {
  private readonly consultationService = inject(ConsultationService);

  ngOnInit(): void {
    // Synchroniser le quota de consultations au démarrage
    this.consultationService.chargerStatut();
  }
}
