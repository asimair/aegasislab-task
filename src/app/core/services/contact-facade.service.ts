import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';

import { Contact, ContactSummary } from '../models/contact.model';
import { ContactApiService } from './contact-api.service';
import { ContactStateService } from './contact-state.service';

@Injectable({ providedIn: 'root' })
export class ContactFacadeService {
  // Expose state observables directly so components can bind to them
  readonly contacts$ = this.state.filteredContacts$;
  readonly selectedContact$ = this.state.selectedContact$;
  readonly isLoadingList$ = this.state.isLoadingList$;
  readonly isLoadingDetail$ = this.state.isLoadingDetail$;
  readonly listError$ = this.state.listError$;
  readonly detailError$ = this.state.detailError$;
  readonly searchQuery$ = this.state.searchQuery$;

  constructor(
    private readonly api: ContactApiService,
    private readonly state: ContactStateService
  ) {}

  /**
   * Loads all contacts and stores them in state.
   * Should be called once on the contacts page init.
   */
  loadContacts(): void {
    this.state.setLoadingList(true);
    this.state.setListError(null);

    this.api.getContacts().pipe(
      tap((contacts) => this.state.setContacts(contacts)),
      finalize(() => this.state.setLoadingList(false))
    ).subscribe({
      error: () => this.state.setListError('Failed to load contacts. Please try again.'),
    });
  }

  /**
   * Selects a contact and loads its full details.
   * Optimistically updates selection using the summary while details load.
   */
  selectContact(id: string): void {
    this.state.setLoadingDetail(true);
    this.state.setDetailError(null);

    this.api.getContactById(id).pipe(
      tap((contact) => {
        if (contact) {
          this.state.setSelectedContact(contact);
        } else {
          this.state.setDetailError('Contact not found.');
        }
      }),
      finalize(() => this.state.setLoadingDetail(false))
    ).subscribe({
      error: () => this.state.setDetailError('Failed to load contact details.'),
    });
  }

  /**
   * Updates the search filter query.
   */
  search(query: string): void {
    this.state.setSearchQuery(query);
  }

  /**
   * Clears the currently selected contact (e.g., on mobile back navigation).
   */
  clearSelection(): void {
    this.state.clearSelectedContact();
  }
}
