import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from './components/user-form/user-form.component';
import { PasswordFormComponent } from './components/password-form/password-form.component';
import { SessionRecordsComponent } from './components/session-records/session-records.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { UserService } from './services/user.service';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { ErrorHandlerInterceptor } from 'src/app/shared/interceptors/error-handler.interceptor';
import { loaderInterceptor } from 'src/app/shared/interceptors/loader.interceptor';
import { AuthInterceptor } from 'src/app/shared/interceptors/auth.interceptor';
import { UserRoutingModule } from './user.routes';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    UserFormComponent,
    PasswordFormComponent,
    SessionRecordsComponent,
    UserRoutingModule,
  ],
  providers: [
    AuthenticationService,
    StorageService,
    UserService,
    provideHttpClient(
      withFetch(),
      withInterceptors([
        AuthInterceptor,
        loaderInterceptor,
        ErrorHandlerInterceptor,
      ])
    ),
  ],
})
export class UserModule {}
