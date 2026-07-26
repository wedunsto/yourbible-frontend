# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

"YourBible" — an Ionic/Angular hybrid mobile app (Capacitor for Android) for creating and tracking Bible study notes, with username/password authentication. Bootstrapped from the Ionic Angular blank starter.

## Commands

```bash
npm start          # ng serve — dev server on http://localhost:4200
npm run build       # ng build — production build to www/
npm run watch        # ng build --watch --configuration development
npm test            # ng test — Karma/Jasmine unit tests (Chrome, watch mode)
npm run lint         # ng lint — ESLint over src/**/*.ts and src/**/*.html
```

- Run a single spec file: `ng test --include='**/login.service.spec.ts'`
- CI-style single run: `ng test --configuration=ci --browsers=ChromeHeadless` (no watch)
- Android: this is a Capacitor app (`android/` directory, `capacitor.config.ts`). After a build, sync native with `npx cap sync android`.

Despite `@types/jest` being a dependency, tests actually run on **Karma + Jasmine** (see `karma.conf.js`, `angular.json` test target) — write specs in Jasmine style (`describe`/`it`/`expect`), not Jest.

## Architecture

Standalone Angular 20 app (no NgModules) using `@ionic/angular/standalone` components, routed with lazy-loaded `loadComponent` routes (`src/app/app.routes.ts`), bootstrapped via `src/app/app.config.ts`.

### State management: NgRx, feature-sliced

State lives under `src/app/core/states/<domain>/<feature>/`, e.g. `core/states/authentication/login/` and `core/states/bible-study-notes/create/`. Each feature slice follows the same triad:

- `*.actions.ts` — `createAction` request/success/failure trio (e.g. `accountAuthenticatedRequest` / `Success` / `Failure`)
- `*.effects.ts` — an `@Injectable()` effects class that calls the matching service in `core/services/`, maps the HTTP response to a success/failure action, and (in a second, `{ dispatch: false }` effect) performs post-success navigation via `Router`
- `*.feature.ts` — `createFeature` combining a reducer over that slice's state plus generated selectors, destructured and re-exported by name (`selectLoginState`, `selectAccessToken`, ...)

New features must be wired into `app.config.ts` manually: add `provideState(XFeature)` and include the effects class in the `provideEffects([...])` array. Note the bible-study-notes `create` feature is not yet registered there — check `app.config.ts` before assuming a feature slice is actually active in the store.

Naming is not fully consistent across slices — e.g. `core/states/bible-study-notes/create/create.effect.ts` (singular) vs. the authentication slices' `*.effects.ts` (plural). Match the existing filename in the slice you're editing rather than assuming a global convention.

### Services

HTTP services live in `core/services/<domain>/<action>/`, are `providedIn: 'root'`, inject `HttpClient`, and build URLs from `environment.apiBaseUrl + environment.endpoints.<name>` (`src/environments/environment.ts` / `environment.prod.ts`, swapped via `fileReplacements` in `angular.json` production config). Each service file also declares its own request/response TypeScript interfaces (there's no separate DTO layer) — effects import these types directly from the service file.

Note `environment.ts` (dev) and `environment.prod.ts` currently define different paths for the same logical endpoint (e.g. `userExists`) — check both when touching auth endpoints.

### Models vs. per-service DTOs

Domain models shared across the app (e.g. `BibleStudyNote`, `BibleStudyCategory`) live in `core/models/`. Request/response shapes specific to one HTTP call are defined locally in that call's service file instead (see `LoginPayload`/`LoginResponse` in `login.service.ts`).

### Pages and shared components

Routed views are `*.page.ts` under top-level feature folders (`welcome/`, `login/`, `register/`, `home/`, `create-bible-study-note/`), each a standalone component importing only the Ionic standalone components it uses (`IonContent`, `IonHeader`, ...) plus `ReactiveFormsModule` for forms. Pages build forms with `FormBuilder`, dispatch NgRx actions on submit, and expose small getter methods (`book()`, `chapter()`, ...) to read individual `AbstractControl` values out of the form group rather than subscribing to `valueChanges`.

Reusable UI lives in `shared/components/` (e.g. `FormInputComponent`, a generic Ionic form field wrapper parameterized by an `inputType` union and taking `control: input<AbstractControl | null>()`). Feature-scoped components that aren't reused elsewhere live alongside their page (e.g. `home/components/home-menu/`).

### Styling

Tailwind CSS v4 (`@tailwindcss/postcss`) plus Flowbite components, layered on top of Ionic's own theme (`src/theme/variables.scss`) and `src/global.scss`. Flowbite's JS is loaded globally via `angular.json`'s `scripts` array, not imported per-component.

### Linting conventions (enforced by `.eslintrc.json`)

- Components/pages must be suffixed `Component` or `Page`.
- Component selectors: `app-*` kebab-case elements.
- Directive selectors: `app*` camelCase attributes.
