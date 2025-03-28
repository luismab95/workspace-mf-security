import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseI } from 'src/app/shared/interfaces/response.interface';
import { environment } from 'src/environments/environment';
import { UpdatePasswordI, UserI } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private urlApi = environment.apiUrl;

  constructor(private _httpClient: HttpClient) {}

  getUserById(userId: number): Observable<ResponseI<UserI>> {
    return this._httpClient.get<ResponseI<UserI>>(
      `${this.urlApi}/ms-security/user/${userId}`
    );
  }

  updateUser(userId: number, payload: UserI): Observable<ResponseI<UserI>> {
    return this._httpClient.put<ResponseI<UserI>>(
      `${this.urlApi}/ms-security/user/${userId}`,
      { ...payload }
    );
  }

  updatePassword(
    userId: number,
    payload: UpdatePasswordI
  ): Observable<ResponseI<string>> {
    return this._httpClient.patch<ResponseI<string>>(
      `${this.urlApi}/ms-security/user/pwd/${userId}`,
      { ...payload }
    );
  }
}
