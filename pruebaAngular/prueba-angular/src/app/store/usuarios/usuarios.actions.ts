import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UsuarioCrud } from '../../core/services/Crud/crud.services';

export const UsuariosActions = createActionGroup({
  source: 'Usuarios',
  events: {
    'Load': emptyProps(),
    'Load Success': props<{ data: UsuarioCrud[] }>(),
    'Load Failure': props<{ error: string }>(),

    'Delete': props<{ id: number }>(),
    'Upsert': props<{ data: UsuarioCrud }>(),
  },
});

