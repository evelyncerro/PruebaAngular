import { createReducer, on } from '@ngrx/store';
import { UsuariosActions } from './usuarios.actions';
import { UsuarioCrud } from '../../core/services/Crud/crud.services';

export const usuariosFeatureKey = 'usuarios';

export interface UsuariosState {
  data: UsuarioCrud[];
  loading: boolean;
  error: string | null;
}

export const initialState: UsuariosState = {
  data: [],
  loading: false,
  error: null,
};

function nextId(list: UsuarioCrud[]): number {
  const max = list.reduce((acc, u) => Math.max(acc, u.id ?? 0), 0);
  return max + 1;
}

export const usuariosReducer = createReducer(
  initialState,

  on(UsuariosActions.load, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(UsuariosActions.loadSuccess, (state, { data }) => ({
    ...state,
    data,
    loading: false,
    error: null,
  })),

  on(UsuariosActions.loadFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(UsuariosActions.delete, (state, { id }) => ({
    ...state,
    data: state.data.filter(u => u.id !== id),
  })),

  on(UsuariosActions.upsert, (state, { data }) => {
    const isCreate = !data.id || data.id === 0;

    if (isCreate) {
      const created: UsuarioCrud = { ...data, id: nextId(state.data) };
      return { ...state, data: [...state.data, created] };
    }

    return {
      ...state,
      data: state.data.map(u => (u.id === data.id ? { ...u, ...data } : u)),
    };
  }),
);
