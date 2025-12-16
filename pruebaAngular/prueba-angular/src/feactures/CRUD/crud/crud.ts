// import { Component, EventEmitter, OnInit, Output } from '@angular/core';
// import { CrudService, UsuarioCrud } from '../../../app/core/services/Crud/crud.services';
// import { CrudFormModalComponent } from './components/crud-form-modal';

// @Component({
//   selector: 'app-crud',
//   standalone: true,
//   imports: [CrudFormModalComponent],
//   templateUrl: './crud.html',
//   styleUrl: './crud.css',
// })
// export class Crud implements OnInit {
//   usuarios: UsuarioCrud[] = [];
//   modalVisible = false;

//   usuarioEditando: UsuarioCrud | null = null;


//   constructor(private crudService: CrudService) {}

//   ngOnInit(): void {
//     this.cargarUsuarios();
//   }

//   cargarUsuarios() {
//     this.crudService.listar().subscribe({
//       next: (res) => {
//         this.usuarios = res;
//       },
//       error: (err) => {
//         console.error('Error al cargar usuarios', err);
//       },
//     });
//   }


//   editar(usuario: UsuarioCrud) {
//     this.usuarioEditando = {
//       id: usuario.id,
//       userId: usuario.userId,
//       title: usuario.title,
//       body: usuario.body,
//     };
//     this.modalVisible = true;
//   }

//   confirmarEliminar(usuario: UsuarioCrud) {
//     const ok = confirm(`¿Eliminar el registro "${usuario.id}"?`);

//      this.usuarios = this.usuarios.filter(
//       u => u.id !== usuario.id
//     );


//     if (!ok) return;
//   }

//   abrirNuevo() {
//     this.usuarioEditando = null;
//     this.modalVisible = true;
//   }

//   onGuardarDesdeModal(data: UsuarioCrud) {

//     console.log(data);
//     const usuario = {
//       id: data.id,
//       userId: data.userId,
//       title: data.title,
//       body: data.body,
//     };

//     if (data.id == 0) {

//       this.usuarios.push(usuario);
//     }else{

//       this.usuarios.forEach(element => {
//         if (element.id ==  data.id) {
//           element.title = data.title,
//           element.body = data.body
//         }
//       });
//     }

//     this.cerrarModal();

//   }
//   cerrarModal(){
//     this.modalVisible = false;
//     this.usuarioEditando = null;
//   }
// }

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { CrudFormModalComponent } from './components/crud-form-modal';
import { UsuarioCrud } from '../../../app/core/services/Crud/crud.services';

import { UsuariosActions } from '../../../app/store/usuarios/usuarios.actions';
import { selectUsuarios, selectUsuariosLoading } from '../../../app/store/usuarios';


@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [CommonModule, CrudFormModalComponent],
  templateUrl: './crud.html',
  styleUrl: './crud.css',
})
export class Crud implements OnInit {
  usuarios$!: Observable<UsuarioCrud[]>;
  loading$!: Observable<boolean>;

  modalVisible = false;
  usuarioEditando: UsuarioCrud | null = null;


  inicio = 0;
  limite = 5;
  totalRecords = 0;
  Math = Math;


    usuariosPaginados: UsuarioCrud[] = [];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.usuarios$ = this.store.select(selectUsuarios);
    this.loading$ = this.store.select(selectUsuariosLoading);

    this.store.dispatch(UsuariosActions.load());
  }

  abrirNuevo() {
    this.usuarioEditando = null;
    this.modalVisible = true;
  }

  editar(usuario: UsuarioCrud) {
    this.usuarioEditando = { ...usuario };
    this.modalVisible = true;
  }

  confirmarEliminar(usuario: UsuarioCrud) {
    const ok = confirm(`¿Eliminar el registro "${usuario.id}"?`);
    if (!ok) return;

    this.store.dispatch(UsuariosActions.delete({ id: usuario.id }));
  }

  onGuardarDesdeModal(data: UsuarioCrud) {
    this.store.dispatch(UsuariosActions.upsert({ data }));

    this.cerrarModal();
  }

  cerrarModal() {
    this.modalVisible = false;
    this.usuarioEditando = null;
  }

}



