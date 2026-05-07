# Contacts Management App

Angular 17 single-page application for a customer service contact management dashboard.

## Tech Stack

- **Framework**: Angular 17 (standalone components, no NgModules)
- **Language**: TypeScript (strict mode)
- **Styling**: SCSS with CSS custom properties (no UI component libraries)
- **State**: BehaviorSubject-based state service (Facade pattern)
- **Testing**: Jasmine + Karma

## Architecture Overview

```
src/app/
├── core/
│   ├── models/
│   │   ├── contact.model.ts       # Domain models (Contact, ContactSummary, etc.)
│   │   └── api.dto.ts             # API Data Transfer Objects
│   ├── services/
│   │   ├── mock-data.ts           # Mock API data
│   │   ├── contact-api.service.ts # HTTP layer + DTO→model mapping
│   │   ├── contact-state.service.ts # BehaviorSubject state store
│   │   └── contact-facade.service.ts # Orchestration facade for components
│   └── interceptors/
│       └── mock-api.interceptor.ts # Intercepts HTTP calls, returns mock data
├── features/
│   ├── contact-list/
│   │   ├── contact-list.component.ts       # Smart container (list panel)
│   │   ├── contact-list-item.component.ts  # Presentational list row
│   │   └── contacts-page.component.ts      # Page shell with 2-panel layout
│   └── contact-details/
│       └── contact-details.component.ts    # Smart container (detail panel)
└── shared/
    ├── components/
    │   └── avatar.component.ts    # Reusable avatar with initials fallback
    └── pipes/
        └── initials.pipe.ts       # Generates "AB" initials from full name
```

## Design Patterns Used

| Pattern | Where |
|---------|-------|
| **Facade** | `ContactFacadeService` — single API surface for components |
| **Repository** | `ContactApiService` — abstracts HTTP + DTO mapping |
| **BehaviorSubject Store** | `ContactStateService` — lightweight reactive state |
| **Interceptor** | `MockApiInterceptor` — mock backend without changing component code |
| **Smart/Dumb components** | `ContactListComponent` (smart) + `ContactListItemComponent` (dumb) |
| **OnPush change detection** | All components — performance optimisation |

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Install dependencies
```bash
npm install
```

### Run development server
```bash
npm start
# → http://localhost:4200
```

### Run unit tests
```bash
npm test
```

### Build for production
```bash
npm run build
```

## API Integration

The app currently uses a `MockApiInterceptor` to simulate the backend.
To connect to a real `mockapi.io` endpoint:

1. Create a project on [mockapi.io](https://mockapi.io)
2. Create resources `/contacts` and `/contacts/:id/email_addresses`  
   matching the schemas in `src/app/core/models/api.dto.ts`
3. Update `src/environments/environment.prod.ts`:
   ```ts
   apiBaseUrl: 'https://YOUR_ID.mockapi.io/api/v1'
   ```
4. Remove the `MockApiInterceptor` from `app.config.ts`

## Responsive Design

- **Desktop (≥1024px)**: Centred card layout, list + detail side-by-side
- **Tablet (769px–1023px)**: Full-width, list + detail side-by-side
- **Mobile (≤768px)**: Single panel at a time; tapping a contact slides detail panel in; back button returns to list

## Assumptions & Simplifications

See inline `// Assumption:` and `// Simplification:` comments throughout the source for detailed notes. Key ones:

- **No real backend**: mock interceptor simulates `/contacts` and `/contacts/{id}/email_addresses`
- **No routing**: single route is sufficient for this spec; Angular Router integration is described in `app.component.ts`
- **No pagination**: mock dataset is small; pagination UI and API params are documented but not implemented
- **Error handling**: basic degradation (empty/null returns); production would use typed error classes and a global error handler
- **No CRUD**: only read operations; write operations would require mock state mutation
- **No cross-device testing beyond responsive CSS**: full QA on physical devices omitted for scope

## Tests

Unit tests cover:
- `InitialsPipe` — all edge cases
- `ContactStateService` — state mutations and filtering
- `ContactFacadeService` — orchestration including error paths  
- `ContactApiService` — DTO mapping and error handling
- `ContactListItemComponent` — rendering, events, and accessibility

End-to-end tests are omitted as advised in the spec.
