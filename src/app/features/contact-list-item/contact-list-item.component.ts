import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactSummary } from '../../core/models/contact.model';
import { AvatarComponent } from '../../shared/avatar/avatar.component';


@Component({
  selector: 'app-contact-list-item',
  standalone: true,
  imports: [CommonModule, AvatarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact-list-item.component.html',
 styleUrls: ['./contact-list-item.component.scss'],
})
export class ContactListItemComponent {
  @Input({ required: true }) contact!: ContactSummary;
  @Input() isSelected = false;

  @Output() selected = new EventEmitter<ContactSummary>();
  @Output() onMessage = new EventEmitter<ContactSummary>();
  @Output() onCall = new EventEmitter<ContactSummary>();
  @Output() onMore = new EventEmitter<ContactSummary>();

  onSelect(): void {
    this.selected.emit(this.contact);
  }
}
