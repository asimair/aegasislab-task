import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { Contact } from '../../core/models/contact.model';
import { ContactFacadeService } from '../../core/services/contact-facade.service';
import { AvatarComponent } from '../../shared/avatar/avatar.component';

/**
 * ContactDetailsComponent
 *
 * Displays the full details of the currently selected contact.
 * This is a smart component that reads from the facade directly.
 *
 * Design decisions:
 * - Not all contact fields are displayed. Displayed fields were chosen to
 *   be most useful for a customer service representative:
 *     ✓ Name, job title, avatar, status
 *     ✓ Bio (context for conversation)
 *     ✓ All email addresses with primary indicator
 *     ✓ Dial-in identifier
 *     ✓ Meeting link
 *     ✓ All phone numbers with primary indicator
 *     ✓ Social links (for additional contact channels)
 *   Omitted: address, company (visible in the list view and secondary importance),
 *            createdAt (internal metadata not customer-facing).
 *
 * - The component emits a `back` event for mobile layout navigation.
 * - Uses OnPush change detection; state changes flow via observables.
 */
@Component({
  selector: 'app-contact-details',
  standalone: true,
  imports: [CommonModule, AvatarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact-details.component.html',
 styleUrls: ['./contact-details.component.scss'],
})
export class ContactDetailsComponent {
  readonly selectedContact$ = this.facade.selectedContact$;
  readonly isLoadingDetail$ = this.facade.isLoadingDetail$;
  readonly detailError$ = this.facade.detailError$;

  @Output() back = new EventEmitter<void>();

  constructor(private readonly facade: ContactFacadeService) {}

  hasSocialLinks(contact: Contact): boolean {
    const { facebook, twitter, linkedin, instagram } = contact.socialLinks;
    return !!(facebook || twitter || linkedin || instagram);
  }

  onBack(): void {
    this.facade.clearSelection();
    this.back.emit();
  }
}
