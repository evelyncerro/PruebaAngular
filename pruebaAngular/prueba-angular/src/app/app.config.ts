// // app.config.ts
// import { ApplicationConfig, isDevMode } from '@angular/core';
// import { provideRouter } from '@angular/router';
// import { provideHttpClient, withFetch } from '@angular/common/http';

// import { provideState, provideStore } from '@ngrx/store';
// import { provideEffects } from '@ngrx/effects';
// import { provideStoreDevtools } from '@ngrx/store-devtools';

// import { routes } from './app.routes';

// // 1) reducers raíz (vacío si todo lo haces por feature)
// import { reducers } from './store';
// import { UsuariosEffects, usuariosFeatureKey, usuariosReducer } from './store/usuarios';

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideRouter(routes),
//     provideHttpClient(withFetch()),

//     provideStore(reducers),

//     provideStoreDevtools({
//       maxAge: 25,
//       logOnly: !isDevMode(),
//     }),

//     provideState(usuariosFeatureKey, usuariosReducer),
//     provideEffects([UsuariosEffects]),
//   ],
// };

// app.config.ts
import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import { provideAnimations } from '@angular/platform-browser/animations';


// 👉 importa SOLO lo necesario del feature usuarios
import {
  usuariosReducer,
  usuariosFeatureKey,
  UsuariosEffects,
} from './store/usuarios';

import 'zone.js';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),

    // Store raíz (vacío si todo es por features)
    provideStore(),

    // Feature usuarios
    provideState(usuariosFeatureKey, usuariosReducer),
    provideEffects([UsuariosEffects]),

    // Devtools
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),

    provideAnimations(),
    providePrimeNG({
      unstyled: true
    })
  ],
};
