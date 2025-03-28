import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseI } from '../interfaces/response.interface';
import { ResendOtpI, SessionI } from '../interfaces/authentication.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private urlApi = environment.apiUrl;

  constructor(private _httpClient: HttpClient) {}

  listSessions(userId: number): Observable<ResponseI<SessionI[]>> {
    return this._httpClient.get<ResponseI<SessionI[]>>(
      `${this.urlApi}/ms-security/auth/sessions/${userId}`
    );
  }

  forgetPassword(email: string): Observable<ResponseI<string>> {
    return this._httpClient.post<ResponseI<string>>(
      `${this.urlApi}/ms-authentication/security/forget-password`,
      { email }
    );
  }

  resendOtp(payload: ResendOtpI): Observable<ResponseI<string>> {
    return this._httpClient.post<ResponseI<string>>(
      `${this.urlApi}/ms-authentication/security/resend-otp`,
      { ...payload }
    );
  }
}
