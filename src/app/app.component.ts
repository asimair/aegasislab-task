import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsPageComponent } from './features/contacts-page/contacts-page.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ContactsPageComponent],
  template: `
    <div class="app-shell">
      <app-contacts-page></app-contacts-page>
    </div>
  `,
  styles: [`
    .app-shell {
      // height: 100vh;
      // overflow: hidden;
      // background: var(--color-bg);
    }
  `],
})
export class AppComponent {
  readonly title = 'Contacts Management';
}
