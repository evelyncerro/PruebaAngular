import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CrudService } from '../../core/services/Crud/crud.services';
import { UsuariosActions } from './usuarios.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class UsuariosEffects {
  private actions$ = inject(Actions);
  private crudService = inject(CrudService);

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsuariosActions.load),
      mergeMap(() =>
        this.crudService.listar().pipe(
          map(data => UsuariosActions.loadSuccess({ data })),
          catchError(err =>
            of(UsuariosActions.loadFailure({ error: err?.message ?? 'Error al cargar usuarios' }))
          )
        )
      )
    )
  );
}
