## Installed dependencies
- node -v 
  `v24.16.0`

- npm -v
  `11.13.0`

- npm list -g --depth=0
  `@angular/cli@22.0.4`

## ng create config / setup 
- SSR and SSG disabled for purpose of this demo
- using scss styling 
- frontend mimicking https://www.themealdb.com/ - free APIs available

## Setup app directory / structure
- [cheatsheet](https://gist.github.com/VaLeXaR/2d3e814e29b12809b5fd91773820cf31) used
- created app-routing.module.ts
- ng g m dashboard --routing --flat
- ng g c dashboard/meals-component
- ng g c dashboard/cocktails-component
- ng g c core/components/navigation
- ng g s core/services/search
- ng g c core/shared/footer
- ng g c core/components/card