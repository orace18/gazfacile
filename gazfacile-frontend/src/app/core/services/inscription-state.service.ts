import { Injectable, signal, computed } from '@angular/core';
import { Role, ClientNeed, PlanInscription } from '../models/revendeur.model';

@Injectable({ providedIn: 'root' })
export class InscriptionStateService {
  readonly role = signal<Role | null>(null);
  readonly clientNeed = signal<ClientNeed | null>(null);
  readonly selectedPlan = signal<PlanInscription | null>(null);

  readonly resumeLabel = computed(() => {
    const r = this.role();
    const plan = this.selectedPlan();
    if (!r || !plan) return '';
    const profil = r === Role.CLIENT ? 'Client' : 'Revendeur';
    return `${profil} — ${plan.nom} — ${plan.prix.toLocaleString('fr-FR')}F/${plan.duree}`;
  });

  setRole(role: Role): void {
    this.role.set(role);
    this.clientNeed.set(null);
    this.selectedPlan.set(null);
  }

  setClientNeed(need: ClientNeed): void {
    this.clientNeed.set(need);
    this.selectedPlan.set(null);
  }

  selectPlan(plan: PlanInscription): void {
    this.selectedPlan.set(plan);
  }

  reset(): void {
    this.role.set(null);
    this.clientNeed.set(null);
    this.selectedPlan.set(null);
  }
}
