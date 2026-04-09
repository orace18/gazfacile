import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class OtpService {

  private readonly apiUrl = `${environment.apiUrl}/auth/otp`;
  private readonly http = inject(HttpClient);

  envoyer(telephone: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/envoyer`, { telephone }).pipe(
      catchError(err => throwError(() => new Error(
        err.error?.message || 'Impossible d\'envoyer le code OTP'
      )))
    );
  }

  verifier(telephone: string, code: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/verifier`, { telephone, code }).pipe(
      catchError(err => throwError(() => new Error(
        err.error?.message || 'Code OTP incorrect ou expiré'
      )))
    );
  }
}
