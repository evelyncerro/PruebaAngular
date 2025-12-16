// ajusta tu ruta

import { UsuarioCrud } from "../../core/services/Crud/crud.services";

export interface UsuariosState {
  loading: boolean;
  data: UsuarioCrud[];
  error: string | null;
}

export const initialUsuariosState: UsuariosState = {
  loading: false,
  data: [],
  error: null,
};
