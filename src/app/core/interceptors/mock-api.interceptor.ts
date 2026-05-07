import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { MOCK_CONTACTS, MOCK_EMAIL_ADDRESSES } from '../services/mock-data';
import { environment } from '../../../environments/environment';


@Injectable()
export class MockApiInterceptor implements HttpInterceptor {
  private readonly SIMULATED_DELAY_MS = 300;

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const url = req.url;
    const baseUrl = environment.apiBaseUrl;

    if (!url.startsWith(baseUrl)) {
      return next.handle(req);
    }

    const path = url.replace(baseUrl, '');

    const emailMatch = path.match(/^\/contacts\/([^/]+)\/email_addresses$/);
    if (emailMatch) {
      const id = emailMatch[1];
      const emails = MOCK_EMAIL_ADDRESSES[id] ?? [];
      return this.respond(emails);
    }

   
    const contactMatch = path.match(/^\/contacts\/([^/]+)$/);
    if (contactMatch) {
      const id = contactMatch[1];
      const contact = MOCK_CONTACTS.find((c) => c.id === id);
      return contact ? this.respond(contact) : this.respond(null, 404);
    }

   
    if (path === '/contacts') {
      return this.respond(MOCK_CONTACTS);
    }

    
    return next.handle(req);
  }

  private respond<T>(body: T, status = 200): Observable<HttpEvent<T>> {
    return of(new HttpResponse<T>({ status, body })).pipe(
      delay(this.SIMULATED_DELAY_MS)
    );
  }
}
