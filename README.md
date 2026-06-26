# Quick

Angular 22 learning project built to explore modern Angular features.

## Features

- Angular 22
- Standalone Components
- Signals
- computed()
- effect()
- toSignal()
- inject()
- Angular Router
- SCSS
- Responsive layout

## Purpose

This project was built to explore Angular's latest reactive programming model while implementing a simple search application using public APIs.

# Setup documentation
## Installed dependencies
- node -v 
  `v24.16.0`

- npm -v
  `11.13.0`

- npm list -g --depth=0
  `@angular/cli@22.0.4`

## ng create config / setup 
- SSR (Server-Side Rendering) and SSG (Static Site Generation) disabled
- Styling - SCSS 
- Frontend queries public datasets from https://themealdb.com and https://thecocktaildb.com

## Setup app directory / structure
- [cheatsheet](https://github.com) used.
- Created `app.routes.ts` file handling top-level route distribution.
- Configured lazy loading via `loadChildren()` and split the sub-routing configuration into `dashboard.routes.ts`.
- Generated components, services, and structural files:
  ```bash
  ng g c dashboard/meals-component
  ng g c dashboard/cocktails-component
  ng g c dashboard/welcome
  ng g c core/components/navigation
  ng g c core/components/search
  ng g c core/components/card
  ng g s core/services/search
  ng g s core/services/navigation
  ```
- Created a structural concrete data model file: `src/app/core/models/card-item.ts`.

## Styling
- [coolors.co](https://coolors.co) used to obtain color palette.

## Core Logic & State Architecture

### 1. Unified Search Factory Pattern
- Abstracted the `MealsApi` and `CocktailsApi` repositories behind a shared interface structural contract (`BaseSearchApi`).
- Implemented a centralized runtime **Factory Switch** operation inside `SearchService` to automatically choose network targets based on a state-driven navigation context token string (`'meals' | 'cocktails' | 'welcome'`).
- Utilized the RxJS `map` operator to intercept distinct third-party JSON footprints (`meals`/`drinks`) and cleanly parse them into initialized `new CardItem()` concrete instances before data ever reached the layout screen.

### 2. Modern Angular Signal Pipelines
- Swapped standard property definitions for high-performance reactive **Angular Signals** (`signal<T>()`) to guarantee fine-grained change tracking across independent page boundaries.
- Eliminated manual memory-leaking `.subscribe()` steps and lifecycle desynchronization errors inside components by bridging asynchronous RxJS streams directly via the **`toSignal()`** and **`toObservable()`** compiler interop primitives.
- Automated instant multi-link query cancellations using an RxJS **`switchMap`** network pipe handler to shield the application layout grid from data race conditions.
- Tied the navigation context state cleanly into a parent **Dashboard router listener** (`NavigationEnd` stream events) to automatically wipe input text strings clear whenever a new nav tab link is opened.
