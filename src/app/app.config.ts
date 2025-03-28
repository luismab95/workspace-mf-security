import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { ErrorHandlerInterceptor } from './shared/interceptors/error-handler.interceptor';
import { loaderInterceptor } from './shared/interceptors/loader.interceptor';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        ErrorHandlerInterceptor,
        loaderInterceptor,
        AuthInterceptor,
      ])
    ),
  ],
};
