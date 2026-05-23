import {
  Component,
  ViewChild,
  inject,
  OnInit,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RevendeurService } from '../../core/services/revendeur.service';
import { AuthService } from '../../core/services/auth.service';
import { ConsultationService } from '../../core/services/consultation.service';
import { MapComponent } from '../map/map.component';
import { RevendeurListComponent } from '../revendeur/revendeur-list/revendeur-list.component';
import {
  CommandeFormComponent,
  DialogCommandeData
} from '../commande/commande-form/commande-form.component';
import { Revendeur, Role } from '../../core/models/revendeur.model';
import {
  FreeConsultationDialogComponent
} from '../../shared/components/free-consultation-dialog/free-consultation-dialog.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatDialogModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MapComponent,
    RevendeurListComponent
  ],
  template: `
    <!-- ════════ UTILISATEUR CONNECTÉ : vue carte + liste ════════ -->
    @if (authService.estConnecte()) {
      <div class="page-accueil">
        <section class="heros">
          <div class="heros-contenu">
            <p class="heros-surtitre">Gaz domestique · Bénin · Temps réel</p>
            <h1 class="heros-titre">
              Le gaz, <span class="accent">plus proche</span> de vous
            </h1>
            <p class="heros-desc">
              Trouvez un revendeur de gaz près de chez vous en quelques secondes.
            </p>
            <div class="marques-logos">
              <span class="marque-badge">Bénin Petro</span>
              <span class="marque-badge">Oryx</span>
              <span class="marque-badge">ProGaz</span>
              <span class="marque-badge">JNP</span>
            </div>
          </div>
        </section>

        @if (consultationService.statut().limite > 0) {
          <div class="quota-bande">
            <div class="quota-icone">
              <mat-icon>visibility</mat-icon>
            </div>
            <div class="quota-texte">
              <strong>Consultations gratuites</strong>
              <span>
                Vous avez
                <b>{{ consultationService.statut().consultationsRestantes }}</b>
                consultation{{ consultationService.statut().consultationsRestantes > 1 ? 's' : '' }}
                restante{{ consultationService.statut().consultationsRestantes > 1 ? 's' : '' }}.
                Après, un abonnement sera nécessaire.
              </span>
            </div>
            <a routerLink="/abonnement/renouveler" class="quota-action">
              S'abonner
            </a>
          </div>
        }

        <div class="vue-principale">
          @if (carteVisible()) {
            <div class="panneau-carte">
              <app-map
                #carteRef
                [revendeursSignal]="revendeurService.revendeurs"
                (commanderClique)="ouvrirDialogCommande($event)"
              ></app-map>
            </div>
          }
          <div class="panneau-liste" [class.avec-carte]="carteVisible()">
            <app-revendeur-list
              [carteVisible]="carteVisible()"
              (toggleCarte)="togglerCarte()"
              (revendeurSelectionne)="onRevendeurSelectionne($event)"
              (commanderRevendeur)="ouvrirDialogCommande($event)"
            ></app-revendeur-list>
          </div>
        </div>
      </div>
    }

    <!-- ════════ VISITEUR NON CONNECTÉ : landing page ════════ -->
    @else {
      <div class="landing">

        <!-- HERO -->
        <section class="landing-hero">
          <div class="hero-inner">
            <p class="hero-label">La plateforme n°1 du gaz domestique au Bénin</p>
            <h1 class="hero-titre">
              Trouvez du <span class="accent">gaz</span> près de chez vous,<br>
              en quelques secondes
            </h1>
            <p class="hero-desc">
              GazFacile connecte les clients aux revendeurs de gaz les plus proches.
              Consultez les stocks en temps réel, comparez les prix et commandez en ligne.
            </p>
            <div class="hero-actions">
              <a routerLink="/auth/register" class="btn-hero btn-primary">
                Créer mon compte gratuitement
              </a>
              <a routerLink="/auth/login" class="btn-hero btn-secondary">
                J'ai déjà un compte
              </a>
            </div>
            <p class="hero-note">Inscription gratuite — pas de carte bancaire requise</p>
          </div>

          <!-- Image/illustration floutée de la carte -->
          <div class="hero-visual">
            <div class="visual-blur">
              <div class="fake-map">
                <div class="fake-pin" style="top:30%;left:40%"></div>
                <div class="fake-pin" style="top:50%;left:60%"></div>
                <div class="fake-pin" style="top:35%;left:72%"></div>
                <div class="fake-pin" style="top:65%;left:35%"></div>
                <div class="fake-pin" style="top:45%;left:50%"></div>
              </div>
              <div class="visual-overlay">
                <mat-icon class="lock-icon">lock</mat-icon>
                <p>Connectez-vous pour voir la carte interactive</p>
              </div>
            </div>
          </div>
        </section>

        <!-- COMMENT ÇA MARCHE -->
        <section class="section-comment">
          <div class="section-inner">
            <h2 class="section-titre">Comment ça marche ?</h2>
            <p class="section-sous-titre">3 étapes simples pour ne plus jamais manquer de gaz</p>

            <div class="etapes">
              <div class="etape">
                <div class="etape-numero">1</div>
                <div class="etape-icone"><mat-icon>person_add</mat-icon></div>
                <h3>Inscrivez-vous</h3>
                <p>Créez votre compte en moins d'une minute avec votre numéro de téléphone.</p>
              </div>
              <div class="etape-fleche"><mat-icon>arrow_forward</mat-icon></div>
              <div class="etape">
                <div class="etape-numero">2</div>
                <div class="etape-icone"><mat-icon>search</mat-icon></div>
                <h3>Trouvez un revendeur</h3>
                <p>Localisez les dépôts de gaz les plus proches avec les stocks en temps réel.</p>
              </div>
              <div class="etape-fleche"><mat-icon>arrow_forward</mat-icon></div>
              <div class="etape">
                <div class="etape-numero">3</div>
                <div class="etape-icone"><mat-icon>shopping_cart</mat-icon></div>
                <h3>Commandez</h3>
                <p>Passez commande en ligne ou rendez-vous directement chez le revendeur.</p>
              </div>
            </div>
          </div>
        </section>

        <!-- AVANTAGES -->
        <section class="section-avantages">
          <div class="section-inner">
            <h2 class="section-titre">Pourquoi GazFacile ?</h2>

            <div class="grille-avantages">
              <div class="avantage">
                <mat-icon>my_location</mat-icon>
                <h3>Géolocalisation précise</h3>
                <p>Trouvez le revendeur le plus proche grâce à la carte interactive GPS.</p>
              </div>
              <div class="avantage">
                <mat-icon>update</mat-icon>
                <h3>Stocks en temps réel</h3>
                <p>Vérifiez la disponibilité avant de vous déplacer. Fini les trajets inutiles.</p>
              </div>
              <div class="avantage">
                <mat-icon>compare_arrows</mat-icon>
                <h3>Comparez les prix</h3>
                <p>Consultez les catalogues des revendeurs et trouvez le meilleur prix.</p>
              </div>
              <div class="avantage">
                <mat-icon>local_shipping</mat-icon>
                <h3>Livraison à domicile</h3>
                <p>Commandez en ligne et faites-vous livrer directement chez vous.</p>
              </div>
              <div class="avantage">
                <mat-icon>verified</mat-icon>
                <h3>Revendeurs vérifiés</h3>
                <p>Tous les revendeurs sont identifiés avec leur profil et leurs avis.</p>
              </div>
              <div class="avantage">
                <mat-icon>phone_android</mat-icon>
                <h3>Paiement Mobile Money</h3>
                <p>Payez facilement via MTN MoMo, Moov Money ou Celtiis Cash.</p>
              </div>
            </div>
          </div>
        </section>

        <!-- CHIFFRES / CONFIANCE -->
        <section class="section-confiance">
          <div class="section-inner">
            <div class="confiance-grille">
              <div class="confiance-item">
                <span class="confiance-chiffre">100+</span>
                <span class="confiance-label">Revendeurs inscrits</span>
              </div>
              <div class="confiance-item">
                <span class="confiance-chiffre">12</span>
                <span class="confiance-label">Villes couvertes</span>
              </div>
              <div class="confiance-item">
                <span class="confiance-chiffre">24/7</span>
                <span class="confiance-label">Disponibilité</span>
              </div>
              <div class="confiance-item">
                <span class="confiance-chiffre">100%</span>
                <span class="confiance-label">Sécurisé</span>
              </div>
            </div>
          </div>
        </section>

        <!-- MARQUES PARTENAIRES -->
        <section class="section-marques">
          <div class="section-inner">
            <h2 class="section-titre">Les marques disponibles</h2>
            <div class="marques-grille">
              <div class="marque-card">
                <span class="marque-nom">Bénin Petro</span>
                <span class="marque-info">6kg · 12kg · 25kg · 38kg</span>
              </div>
              <div class="marque-card">
                <span class="marque-nom">Oryx</span>
                <span class="marque-info">6kg · 12kg · 25kg</span>
              </div>
              <div class="marque-card">
                <span class="marque-nom">ProGaz</span>
                <span class="marque-info">3kg · 6kg · 12kg</span>
              </div>
              <div class="marque-card">
                <span class="marque-nom">JNP</span>
                <span class="marque-info">6kg · 12kg</span>
              </div>
            </div>
          </div>
        </section>

        <!-- SECTION REVENDEURS -->
        <section class="section-revendeur">
          <div class="section-inner">
            <div class="revendeur-bloc">
              <div class="revendeur-texte">
                <h2>Vous êtes revendeur de gaz ?</h2>
                <p>Rejoignez GazFacile et rendez votre dépôt visible par des milliers de clients au Bénin.
                   Gérez votre catalogue, recevez des commandes en ligne et développez votre activité.</p>
                <ul class="revendeur-avantages">
                  <li><mat-icon>visibility</mat-icon> Visibilité sur la carte interactive</li>
                  <li><mat-icon>shopping_bag</mat-icon> Commandes en ligne</li>
                  <li><mat-icon>notifications_active</mat-icon> Notifications en temps réel</li>
                  <li><mat-icon>trending_up</mat-icon> Développez votre clientèle</li>
                </ul>
                <a routerLink="/auth/register" class="btn-hero btn-primary">
                  Inscrire mon dépôt
                </a>
              </div>
              <div class="revendeur-visual">
                <div class="phone-mockup">
                  <div class="phone-header">
                    <span class="phone-dot"></span>
                    <span class="phone-dot"></span>
                    <span class="phone-dot"></span>
                  </div>
                  <div class="phone-body">
                    <div class="mock-card">
                      <mat-icon>store</mat-icon>
                      <span>Mon dépôt</span>
                    </div>
                    <div class="mock-card">
                      <mat-icon>inventory_2</mat-icon>
                      <span>Catalogue</span>
                    </div>
                    <div class="mock-card">
                      <mat-icon>receipt_long</mat-icon>
                      <span>Commandes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- CTA FINAL -->
        <section class="section-cta">
          <div class="section-inner">
            <h2>Prêt à trouver du gaz facilement ?</h2>
            <p>Rejoignez la communauté GazFacile dès maintenant.</p>
            <div class="hero-actions">
              <a routerLink="/auth/register" class="btn-hero btn-primary">
                S'inscrire maintenant
              </a>
              <a routerLink="/auth/login" class="btn-hero btn-secondary">
                Se connecter
              </a>
            </div>
          </div>
        </section>

        <!-- FOOTER -->
        <footer class="landing-footer">
          <div class="section-inner">
            <div class="footer-grille">
              <div class="footer-col">
                <img src="assets/logo.svg" alt="GazFacile" class="footer-logo">
                <p>La plateforme de référence pour le gaz domestique au Bénin.</p>
              </div>
              <div class="footer-col">
                <h4>Liens utiles</h4>
                <a routerLink="/auth/register">Inscription</a>
                <a routerLink="/auth/login">Connexion</a>
              </div>
              <div class="footer-col">
                <h4>Contact</h4>
                <p>Cotonou, Bénin</p>
                <a href="tel:+2290156324868">+229 015 632 4868</a>
                <a href="mailto:facile.gaz&#64;gmail.com">facile.gaz&#64;gmail.com</a>
              </div>
            </div>
            <div class="footer-bottom">
              <p>&copy; 2026 GazFacile. Tous droits réservés.</p>
            </div>
          </div>
        </footer>
      </div>
    }
  `,
  styles: [`
    /* ══════════════════════════════════════════════
       VUE CONNECTÉE (carte + liste)
       ══════════════════════════════════════════════ */
    .page-accueil {
      display: flex;
      flex-direction: column;
      height: calc(100vh - 64px);
    }

    .heros {
      background-color: var(--color-primary);
      padding: 24px 32px 20px;
      flex-shrink: 0;
    }

    .heros-contenu {
      max-width: 1200px;
      margin: 0 auto;
    }

    .heros-surtitre {
      font-family: 'Montserrat', sans-serif;
      font-size: 0.7rem;
      font-weight: 600;
      letter-spacing: 0.14em;
      color: rgba(255,255,255,0.6);
      text-transform: uppercase;
      margin-bottom: 6px;
    }

    .heros-titre {
      font-family: 'Montserrat', sans-serif;
      font-size: 2rem;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 1.15;
      margin-bottom: 8px;

      .accent { color: var(--color-accent); }
    }

    .heros-desc {
      font-family: 'Montserrat', sans-serif;
      font-size: 0.85rem;
      color: rgba(255,255,255,0.7);
      margin-bottom: 14px;
      line-height: 1.5;
    }

    .marques-logos {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
    }

    .marque-badge {
      background-color: rgba(255,255,255,0.12);
      color: rgba(255,255,255,0.9);
      border: 1px solid rgba(255,255,255,0.25);
      padding: 4px 12px;
      font-family: 'Montserrat', sans-serif;
      font-size: 0.72rem;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      border-radius: var(--radius-sm);
    }

    .vue-principale {
      display: flex;
      flex: 1;
      overflow: hidden;
    }

    .quota-bande {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 14px 32px;
      background: #fff8df;
      border-bottom: 1px solid #f2d27a;
      color: #2f2610;
      font-family: 'Montserrat', sans-serif;
      flex-shrink: 0;
      box-shadow: 0 2px 10px rgba(47, 38, 16, 0.08);
    }

    .quota-icone {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: var(--color-accent);
      color: #3a2a00;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;

      mat-icon {
        font-size: 1.35rem;
        width: 1.35rem;
        height: 1.35rem;
      }
    }

    .quota-texte {
      display: flex;
      flex-direction: column;
      gap: 3px;
      min-width: 0;
      flex: 1;

      strong {
        font-size: 0.92rem;
        color: #2f2610;
      }

      span {
        font-size: 0.82rem;
        color: #67572d;
        line-height: 1.35;
      }

      b {
        color: #111827;
        font-size: 1rem;
      }
    }

    .quota-action {
      border: 1px solid #a77c00;
      color: #5d4500;
      border-radius: var(--radius-sm);
      padding: 8px 14px;
      font-size: 0.78rem;
      font-weight: 800;
      text-decoration: none;
      white-space: nowrap;
      background: rgba(255,255,255,0.6);

      &:hover {
        background: white;
      }
    }

    .panneau-carte {
      flex: 0 0 60%;
      max-width: 60%;
      height: 100%;
    }

    .panneau-liste {
      flex: 1;
      min-width: 0;
      height: 100%;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      background-color: var(--color-surface);

      &.avec-carte {
        border-left: 2px solid var(--color-border);
      }
    }

    @media (max-width: 900px) {
      .page-accueil { height: auto; }
      .vue-principale { flex-direction: column; }
      .panneau-carte { flex: 0 0 50vh; max-width: 100%; height: 50vh; }
      .panneau-liste { flex: 1; max-width: 100%; height: auto; min-height: 400px; }
      .panneau-liste.avec-carte { border-top: 2px solid var(--color-border); }
      .heros-titre { font-size: 1.6rem; }
      .quota-bande { padding: 12px 16px; }
    }

    @media (max-width: 480px) {
      .heros { padding: 16px; }
      .heros-titre { font-size: 1.3rem; }
      .heros-desc { display: none; }
      .marques-logos { display: none; }
      .quota-bande { align-items: flex-start; }
      .quota-action { display: none; }
    }

    /* ══════════════════════════════════════════════
       LANDING PAGE (visiteur non connecté)
       ══════════════════════════════════════════════ */
    .landing {
      background: var(--color-bg);
    }

    /* ── Hero ── */
    .landing-hero {
      background: linear-gradient(160deg, var(--color-primary) 0%, var(--color-primary-dark, #1a365d) 100%);
      padding: 80px 24px 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 60px;
      flex-wrap: wrap;
    }

    .hero-inner {
      max-width: 520px;
    }

    .hero-label {
      font-family: 'Montserrat', sans-serif;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--color-accent);
      margin-bottom: 16px;
    }

    .hero-titre {
      font-family: 'Montserrat', sans-serif;
      font-size: 2.6rem;
      font-weight: 800;
      color: #fff;
      line-height: 1.15;
      margin-bottom: 20px;

      .accent {
        color: var(--color-accent);
      }
    }

    .hero-desc {
      font-size: 1.05rem;
      color: rgba(255,255,255,0.8);
      line-height: 1.7;
      margin-bottom: 32px;
    }

    .hero-actions {
      display: flex;
      gap: 14px;
      flex-wrap: wrap;
    }

    .btn-hero {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 14px 32px;
      border-radius: 8px;
      font-family: 'Montserrat', sans-serif;
      font-size: 0.95rem;
      font-weight: 700;
      text-decoration: none;
      transition: all 0.2s;
      cursor: pointer;
      border: none;
    }

    .btn-primary {
      background: var(--color-accent);
      color: #1a1a00;

      &:hover {
        background: #e6a817;
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(249,196,3,0.3);
      }
    }

    .btn-secondary {
      background: rgba(255,255,255,0.12);
      color: #fff;
      border: 2px solid rgba(255,255,255,0.3);

      &:hover {
        background: rgba(255,255,255,0.2);
        border-color: rgba(255,255,255,0.5);
      }
    }

    .hero-note {
      font-size: 0.78rem;
      color: rgba(255,255,255,0.5);
      margin-top: 16px;
    }

    /* ── Visual carte floutée ── */
    .hero-visual {
      width: 400px;
      max-width: 100%;
    }

    .visual-blur {
      position: relative;
      width: 100%;
      aspect-ratio: 4/3;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }

    .fake-map {
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, #e8f4e8 0%, #d4e8d4 30%, #c8dcc8 60%, #b8d0b8 100%);
      filter: blur(3px);
    }

    .fake-pin {
      position: absolute;
      width: 14px;
      height: 14px;
      background: var(--color-primary);
      border: 3px solid #fff;
      border-radius: 50%;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);

      &::after {
        content: '';
        position: absolute;
        bottom: -6px;
        left: 50%;
        transform: translateX(-50%);
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 6px solid var(--color-primary);
      }
    }

    .visual-overlay {
      position: absolute;
      inset: 0;
      background: rgba(0,0,0,0.5);
      backdrop-filter: blur(4px);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
      color: #fff;

      p {
        font-size: 0.9rem;
        font-weight: 600;
        text-align: center;
      }
    }

    .lock-icon {
      font-size: 3rem !important;
      width: 3rem !important;
      height: 3rem !important;
      color: rgba(255,255,255,0.8);
    }

    /* ── Sections communes ── */
    .section-inner {
      max-width: 1100px;
      margin: 0 auto;
      padding: 0 24px;
    }

    .section-titre {
      font-family: 'Montserrat', sans-serif;
      font-size: 1.8rem;
      font-weight: 800;
      color: var(--color-text);
      text-align: center;
      margin-bottom: 8px;
    }

    .section-sous-titre {
      text-align: center;
      color: var(--color-text-muted);
      font-size: 0.95rem;
      margin-bottom: 48px;
    }

    /* ── Comment ça marche ── */
    .section-comment {
      padding: 80px 24px;
      background: var(--color-surface);
    }

    .etapes {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      gap: 16px;
      flex-wrap: wrap;
    }

    .etape {
      text-align: center;
      max-width: 260px;
      position: relative;
    }

    .etape-numero {
      position: absolute;
      top: -12px;
      right: -8px;
      width: 28px;
      height: 28px;
      background: var(--color-accent);
      color: #1a1a00;
      font-family: 'Montserrat', sans-serif;
      font-weight: 800;
      font-size: 0.8rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1;
    }

    .etape-icone {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      background: color-mix(in srgb, var(--color-primary) 10%, transparent);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 16px;

      mat-icon {
        font-size: 2rem;
        width: 2rem;
        height: 2rem;
        color: var(--color-primary);
      }
    }

    .etape h3 {
      font-family: 'Montserrat', sans-serif;
      font-size: 1rem;
      font-weight: 700;
      color: var(--color-text);
      margin-bottom: 8px;
    }

    .etape p {
      font-size: 0.85rem;
      color: var(--color-text-muted);
      line-height: 1.5;
    }

    .etape-fleche {
      display: flex;
      align-items: center;
      padding-top: 30px;
      color: var(--color-primary);
      opacity: 0.3;

      mat-icon {
        font-size: 2rem;
        width: 2rem;
        height: 2rem;
      }
    }

    /* ── Avantages ── */
    .section-avantages {
      padding: 80px 24px;
      background: var(--color-bg);
    }

    .grille-avantages {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 32px;
    }

    .avantage {
      text-align: center;
      padding: 32px 24px;
      border-radius: 12px;
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      transition: transform 0.2s, box-shadow 0.2s;

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 32px rgba(0,0,0,0.08);
      }

      mat-icon {
        font-size: 2.5rem;
        width: 2.5rem;
        height: 2.5rem;
        color: var(--color-primary);
        margin-bottom: 16px;
      }

      h3 {
        font-family: 'Montserrat', sans-serif;
        font-size: 1rem;
        font-weight: 700;
        color: var(--color-text);
        margin-bottom: 8px;
      }

      p {
        font-size: 0.85rem;
        color: var(--color-text-muted);
        line-height: 1.5;
      }
    }

    /* ── Chiffres confiance ── */
    .section-confiance {
      padding: 60px 24px;
      background: var(--color-primary);
    }

    .confiance-grille {
      display: flex;
      justify-content: center;
      gap: 60px;
      flex-wrap: wrap;
    }

    .confiance-item {
      text-align: center;
    }

    .confiance-chiffre {
      display: block;
      font-family: 'Montserrat', sans-serif;
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--color-accent);
    }

    .confiance-label {
      font-size: 0.85rem;
      color: rgba(255,255,255,0.8);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      font-weight: 600;
    }

    /* ── Marques ── */
    .section-marques {
      padding: 80px 24px;
      background: var(--color-surface);
    }

    .marques-grille {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
      margin-top: 40px;
    }

    .marque-card {
      text-align: center;
      padding: 28px 16px;
      border: 2px solid var(--color-border);
      border-radius: 12px;
      transition: border-color 0.2s;

      &:hover {
        border-color: var(--color-primary);
      }
    }

    .marque-nom {
      display: block;
      font-family: 'Montserrat', sans-serif;
      font-size: 1.1rem;
      font-weight: 800;
      color: var(--color-text);
      margin-bottom: 8px;
    }

    .marque-info {
      font-size: 0.8rem;
      color: var(--color-text-muted);
    }

    /* ── Section revendeur ── */
    .section-revendeur {
      padding: 80px 24px;
      background: var(--color-bg);
    }

    .revendeur-bloc {
      display: flex;
      align-items: center;
      gap: 60px;
      flex-wrap: wrap;
      justify-content: center;
    }

    .revendeur-texte {
      max-width: 480px;

      h2 {
        font-family: 'Montserrat', sans-serif;
        font-size: 1.6rem;
        font-weight: 800;
        color: var(--color-text);
        margin-bottom: 16px;
      }

      > p {
        font-size: 0.95rem;
        color: var(--color-text-muted);
        line-height: 1.7;
        margin-bottom: 24px;
      }
    }

    .revendeur-avantages {
      list-style: none;
      padding: 0;
      margin: 0 0 32px;
      display: flex;
      flex-direction: column;
      gap: 12px;

      li {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 0.9rem;
        color: var(--color-text);

        mat-icon {
          color: var(--color-primary);
          font-size: 1.2rem;
          width: 1.2rem;
          height: 1.2rem;
        }
      }
    }

    /* Phone mockup */
    .phone-mockup {
      width: 260px;
      background: var(--color-surface);
      border-radius: 24px;
      border: 3px solid var(--color-border);
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0,0,0,0.1);
    }

    .phone-header {
      background: var(--color-primary);
      padding: 12px 16px;
      display: flex;
      gap: 6px;
    }

    .phone-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: rgba(255,255,255,0.3);
    }

    .phone-body {
      padding: 20px 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .mock-card {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 16px;
      background: color-mix(in srgb, var(--color-primary) 6%, transparent);
      border-radius: 10px;
      border: 1px solid var(--color-border);

      mat-icon {
        color: var(--color-primary);
      }

      span {
        font-family: 'Montserrat', sans-serif;
        font-weight: 600;
        font-size: 0.88rem;
        color: var(--color-text);
      }
    }

    /* ── CTA final ── */
    .section-cta {
      padding: 80px 24px;
      background: linear-gradient(160deg, var(--color-primary) 0%, var(--color-primary-dark, #1a365d) 100%);
      text-align: center;

      h2 {
        font-family: 'Montserrat', sans-serif;
        font-size: 2rem;
        font-weight: 800;
        color: #fff;
        margin-bottom: 12px;
      }

      p {
        font-size: 1rem;
        color: rgba(255,255,255,0.7);
        margin-bottom: 32px;
      }

      .hero-actions {
        justify-content: center;
      }
    }

    /* ── Footer ── */
    .landing-footer {
      background: var(--color-primary);
      color: rgba(255,255,255,0.7);
      padding: 48px 24px 24px;
    }

    .footer-grille {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      gap: 40px;
      margin-bottom: 32px;
    }

    .footer-logo {
      height: 32px;
      margin-bottom: 12px;
      filter: brightness(0) invert(1);
    }

    .footer-col {
      p {
        font-size: 0.85rem;
        line-height: 1.6;
        margin: 0 0 6px;
      }

      h4 {
        font-family: 'Montserrat', sans-serif;
        font-size: 0.85rem;
        font-weight: 700;
        color: #fff;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        margin-bottom: 16px;
      }

      a {
        display: block;
        color: rgba(255,255,255,0.6);
        font-size: 0.85rem;
        margin-bottom: 8px;
        text-decoration: none;
        transition: color 0.2s;

        &:hover { color: var(--color-accent); }
      }
    }

    .footer-bottom {
      border-top: 1px solid rgba(255,255,255,0.1);
      padding-top: 20px;
      text-align: center;

      p {
        font-size: 0.78rem;
        color: rgba(255,255,255,0.4);
        margin: 0;
      }
    }

    /* ── Responsive ── */
    @media (max-width: 900px) {
      .hero-titre { font-size: 2rem; }
      .hero-visual { width: 340px; }
      .grille-avantages { grid-template-columns: repeat(2, 1fr); }
      .marques-grille { grid-template-columns: repeat(2, 1fr); }
      .footer-grille { grid-template-columns: 1fr; }
      .etape-fleche { display: none; }
    }

    @media (max-width: 600px) {
      .landing-hero { padding: 48px 16px 40px; }
      .hero-titre { font-size: 1.6rem; }
      .hero-desc { font-size: 0.9rem; }
      .hero-visual { width: 100%; }
      .btn-hero { width: 100%; text-align: center; padding: 14px 20px; }
      .grille-avantages { grid-template-columns: 1fr; }
      .marques-grille { grid-template-columns: repeat(2, 1fr); }
      .confiance-grille { gap: 30px; }
      .confiance-chiffre { font-size: 2rem; }
      .section-titre { font-size: 1.4rem; }
      .section-cta h2 { font-size: 1.5rem; }
      .revendeur-bloc { gap: 32px; }
      .phone-mockup { width: 220px; }
    }
  `]
})
export class HomeComponent implements OnInit {
  readonly revendeurService = inject(RevendeurService);
  readonly authService = inject(AuthService);
  readonly consultationService = inject(ConsultationService);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);

  @ViewChild('carteRef') private carteRef: MapComponent | undefined;

  readonly carteVisible = signal(false);

  ngOnInit(): void {
    if (this.authService.estConnecte()) {
      this.revendeurService.loadAll();
      this.consultationService.chargerStatut();
      window.setTimeout(() => this.afficherPopupConsultationsGratuites(), 800);
    }
  }

  togglerCarte(): void {
    this.carteVisible.set(!this.carteVisible());
  }

  onRevendeurSelectionne(revendeurId: string): void {
    if (!this.carteVisible()) {
      this.carteVisible.set(true);
      setTimeout(() => this.carteRef?.focusRevendeur(revendeurId), 300);
    } else {
      this.carteRef?.focusRevendeur(revendeurId);
    }
  }

  ouvrirDialogCommande(revendeur: Revendeur): void {
    const dialogRef = this.dialog.open<CommandeFormComponent, DialogCommandeData>(
      CommandeFormComponent,
      {
        data: { revendeur },
        width: '540px',
        maxWidth: '95vw',
        panelClass: 'dialog-gaz'
      }
    );

    dialogRef.afterClosed().subscribe(commande => {
      if (commande) {
        this.snackBar.open(
          `Commande confirmée ! Référence : ${commande.id?.substring(0, 8).toUpperCase()}`,
          'OK',
          { duration: 5000 }
        );
      }
    });
  }

  private afficherPopupConsultationsGratuites(): void {
    const user = this.authService.currentUser();
    const statut = this.consultationService.statut();

    if (!user?.roles?.includes(Role.CLIENT) || statut.limite <= 0 || statut.consultationsRestantes <= 0) {
      return;
    }

    const clePopup = `gf_free_consult_popup_${user.telephone}`;
    if (localStorage.getItem(clePopup)) {
      return;
    }

    localStorage.setItem(clePopup, '1');
    this.dialog.open(FreeConsultationDialogComponent, {
      width: '440px',
      maxWidth: '95vw',
      data: {
        restantes: statut.consultationsRestantes,
        limite: statut.limite
      }
    });
  }
}
