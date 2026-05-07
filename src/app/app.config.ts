import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MockApiInterceptor } from './core/interceptors/mock-api.interceptor';

/**
 * Application configuration.
 *
 * Registers:
 * - HttpClient with DI-based interceptors
 * - MockApiInterceptor to simulate the backend
 *
 * In production the MockApiInterceptor would be replaced (or conditionally
 * omitted) and the real API base URL would be used from the environment config.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MockApiInterceptor,
      multi: true,
    },
  ],
};
