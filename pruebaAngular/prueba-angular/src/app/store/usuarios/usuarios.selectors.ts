import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsuariosState, usuariosFeatureKey } from './usuarios.reducer';

export const selectUsuariosState =
  createFeatureSelector<UsuariosState>(usuariosFeatureKey);

export const selectUsuarios = createSelector(
  selectUsuariosState,
  (state) => state.data
);

export const selectUsuariosLoading = createSelector(
  selectUsuariosState,
  (state) => state.loading
);

export const selectUsuariosError = createSelector(
  selectUsuariosState,
  (state) => state.error
);
