import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { SessionI } from 'src/app/shared/interfaces/authentication.interface';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { decodeToken } from 'src/app/shared/utils/jwt.utils';

@Component({
  selector: 'mf-security-session-records',
  templateUrl: './session-records.component.html',
  imports: [NgClass],
})
export class SessionRecordsComponent implements OnInit, OnDestroy {
  listSession = signal<SessionI[]>([]);

  private _authenticationService = inject(AuthenticationService);
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor() {}

  ngOnInit(): void {
    const tokenPayload = decodeToken();
    this._authenticationService
      .listSessions(tokenPayload.id)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (response) => {
          this.listSession.set(response.data);
        },
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
