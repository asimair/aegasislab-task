import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactListComponent } from '../contact-list/contact-list.component';
import { ContactDetailsComponent } from '../contact-details/contact-details.component';
import { ContactFacadeService } from '../../core/services/contact-facade.service';


@Component({
  selector: 'app-contacts-page',
  standalone: true,
  imports: [CommonModule, ContactListComponent, ContactDetailsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contacts-page.component.html',
 styleUrls: ['./contacts-page.component.scss'],
 
})
export class ContactsPageComponent {
  constructor(readonly facade: ContactFacadeService) {}

  onBack(): void {
    
  }
}
