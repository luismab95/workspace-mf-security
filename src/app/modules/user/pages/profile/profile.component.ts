import { Component } from '@angular/core';
import { UserFormComponent } from '../../components/user-form/user-form.component';
import { PasswordFormComponent } from '../../components/password-form/password-form.component';
import { SessionRecordsComponent } from '../../components/session-records/session-records.component';

@Component({
  selector: 'mf-security-profile',
  templateUrl: './profile.component.html',
  imports: [UserFormComponent, PasswordFormComponent, SessionRecordsComponent],
})
export class ProfileComponent {}
