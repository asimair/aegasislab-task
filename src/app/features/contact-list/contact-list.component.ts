import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

import { ContactSummary, Contact } from '../../core/models/contact.model';
import { ContactFacadeService } from '../../core/services/contact-facade.service';
import { ContactListItemComponent } from '../contact-list-item/contact-list-item.component';


@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ContactListItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
 templateUrl: './contact-list.component.html',
 styleUrls: ['./contact-list.component.scss'],
 
})
export class ContactListComponent implements OnInit {
  searchQuery = '';

  readonly contacts$ = this.facade.contacts$;
  readonly selectedContact$ = this.facade.selectedContact$;
  readonly isLoadingList$ = this.facade.isLoadingList$;
  readonly listError$ = this.facade.listError$;

  constructor(private readonly facade: ContactFacadeService) {}

  ngOnInit(): void {
    this.facade.loadContacts();
  }

  onSearch(query: string): void {
    this.facade.search(query);
  }

  onContactSelect(contact: ContactSummary): void {
    this.facade.selectContact(contact.id);
  }

  reload(): void {
    this.facade.loadContacts();
  }

  trackById(_index: number, contact: ContactSummary): string {
    return contact.id;
  }
}
