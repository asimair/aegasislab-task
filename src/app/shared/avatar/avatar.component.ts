import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitialsPipe } from '../pipes/initials.pipe';

/**
 * AvatarComponent
 *
 * Displays a contact's avatar image with a fallback to initials.
 * Uses OnPush change detection for performance.
 *
 * @Input size - controls the rendered size ('sm' | 'md' | 'lg')
 * @Input avatarUrl - optional image URL
 * @Input name - used to generate initials fallback
 * @Input status - online status indicator
 */
@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [CommonModule, InitialsPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
 templateUrl: './avatar.component.html',
 styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent {
  @Input() avatarUrl?: string;
  @Input() name = '';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() status: 'online' | 'offline' | 'away' = 'offline';
  @Input() showStatus = true;

  onImageError(): void {
    
    this.avatarUrl = undefined;
  }
}
