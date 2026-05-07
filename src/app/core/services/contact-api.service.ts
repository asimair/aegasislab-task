import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin, delay } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import { Contact, ContactSummary, EmailAddress, OnlineStatus, PhoneNumber } from '../models/contact.model';
import { ContactApiDto, EmailAddressApiDto } from '../models/api.dto';
import { MOCK_CONTACTS, MOCK_EMAIL_ADDRESSES } from './mock-data';
import { environment } from '../../../environments/environment';


@Injectable({ providedIn: 'root' })
export class ContactApiService {
  private readonly baseUrl = environment.apiBaseUrl;

  constructor(private readonly http: HttpClient) {}

  getContacts(): Observable<ContactSummary[]> {
    return this.http.get<ContactApiDto[]>(`${this.baseUrl}/contacts`).pipe(
      map((dtos) => dtos.map(ContactApiService.mapToSummary)),
      catchError((err) => {
  
        console.error('[ContactApiService] Failed to fetch contacts', err);
        return of([]);
      })
    );
  }


  getContactById(id: string): Observable<Contact | null> {
    const contact$ = this.http.get<ContactApiDto>(`${this.baseUrl}/contacts/${id}`);
    const emails$ = this.http.get<EmailAddressApiDto[]>(`${this.baseUrl}/contacts/${id}/email_addresses`);

    return forkJoin({ contactDto: contact$, emailDtos: emails$ }).pipe(
      map(({ contactDto, emailDtos }) =>
        ContactApiService.mapToContact(contactDto, emailDtos)
      ),
      catchError((err) => {
        console.error(`[ContactApiService] Failed to fetch contact ${id}`, err);
        return of(null);
      })
    );
  }

 

  private static mapToSummary(dto: ContactApiDto): ContactSummary {
    return {
      id: dto.id,
      firstName: dto.first_name,
      lastName: dto.last_name,
      fullName: `${dto.first_name} ${dto.last_name}`,
      jobTitle: dto.job_title,
      avatarUrl: dto.avatar,
      status: ContactApiService.parseStatus(dto.status),
    };
  }

  private static mapToContact(
    dto: ContactApiDto,
    emailDtos: EmailAddressApiDto[]
  ): Contact {
    const phones: PhoneNumber[] = [];
    if (dto.phone) {
      phones.push({ number: dto.phone, isPrimary: true, label: 'Primary' });
    }
    if (dto.phone_secondary) {
      phones.push({ number: dto.phone_secondary, isPrimary: false, label: 'Secondary' });
    }

    const emails: EmailAddress[] = emailDtos.map((e) => ({
      id: e.id,
      contactId: e.contact_id,
      email: e.email,
      isPrimary: e.is_primary,
      label: e.label,
    }));

    return {
      id: dto.id,
      firstName: dto.first_name,
      lastName: dto.last_name,
      fullName: `${dto.first_name} ${dto.last_name}`,
      jobTitle: dto.job_title,
      company: dto.company,
      avatarUrl: dto.avatar,
      status: ContactApiService.parseStatus(dto.status),
      bio: dto.bio,
      address: dto.address,
      phones,
      emails,
      socialLinks: {
        facebook: dto.social_facebook,
        twitter: dto.social_twitter,
        linkedin: dto.social_linkedin,
        instagram: dto.social_instagram,
      },
      meetingLink: dto.meeting_link,
      dialIn: dto.dial_in,
      createdAt: dto.created_at ?? new Date().toISOString(),
    };
  }

  private static parseStatus(status?: string): OnlineStatus {
    if (status === 'online' || status === 'offline' || status === 'away') {
      return status;
    }
    return 'offline';
  }
}
