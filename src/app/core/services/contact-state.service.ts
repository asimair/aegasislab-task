import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

import { Contact, ContactSummary } from '../models/contact.model';


@Injectable({ providedIn: 'root' })
export class ContactStateService {
  private readonly _contacts$ = new BehaviorSubject<ContactSummary[]>([]);
  private readonly _selectedContact$ = new BehaviorSubject<Contact | null>(null);
  private readonly _searchQuery$ = new BehaviorSubject<string>('');
  private readonly _isLoadingList$ = new BehaviorSubject<boolean>(false);
  private readonly _isLoadingDetail$ = new BehaviorSubject<boolean>(false);
  private readonly _listError$ = new BehaviorSubject<string | null>(null);
  private readonly _detailError$ = new BehaviorSubject<string | null>(null);

  // ─── Public read-only streams ─────────────────────────────────────────────

  readonly contacts$: Observable<ContactSummary[]> = this._contacts$.asObservable();
  readonly selectedContact$: Observable<Contact | null> = this._selectedContact$.asObservable();
  readonly searchQuery$: Observable<string> = this._searchQuery$.asObservable();
  readonly isLoadingList$: Observable<boolean> = this._isLoadingList$.asObservable();
  readonly isLoadingDetail$: Observable<boolean> = this._isLoadingDetail$.asObservable();
  readonly listError$: Observable<string | null> = this._listError$.asObservable();
  readonly detailError$: Observable<string | null> = this._detailError$.asObservable();

  /**
   * Filtered contacts based on the current search query.
   * Searches across name, job title, and primary email.
   */
  readonly filteredContacts$: Observable<ContactSummary[]> = combineLatest([
    this._contacts$,
    this._searchQuery$,
  ]).pipe(
    map(([contacts, query]) => {
      if (!query.trim()) return contacts;
      const lower = query.toLowerCase();
      return contacts.filter(
        (c) =>
          c.fullName.toLowerCase().includes(lower) ||
          c.jobTitle.toLowerCase().includes(lower) ||
          (c.primaryEmail?.toLowerCase().includes(lower) ?? false)
      );
    }),
    distinctUntilChanged()
  );

  // ─── Mutation methods ─────────────────────────────────────────────────────

  setContacts(contacts: ContactSummary[]): void {
    this._contacts$.next(contacts);
  }

  setSelectedContact(contact: Contact | null): void {
    this._selectedContact$.next(contact);
  }

  setSearchQuery(query: string): void {
    this._searchQuery$.next(query);
  }

  setLoadingList(loading: boolean): void {
    this._isLoadingList$.next(loading);
  }

  setLoadingDetail(loading: boolean): void {
    this._isLoadingDetail$.next(loading);
  }

  setListError(error: string | null): void {
    this._listError$.next(error);
  }

  setDetailError(error: string | null): void {
    this._detailError$.next(error);
  }

  clearSelectedContact(): void {
    this._selectedContact$.next(null);
  }
}
