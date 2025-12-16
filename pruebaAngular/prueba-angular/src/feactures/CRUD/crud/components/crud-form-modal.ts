import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface UsuarioFormData {
  id: number;
  userId: number;
  title: string;
  body: string;
}

@Component({
  selector: 'app-usuario-form-modal',
  standalone: true,
  templateUrl: './crud-form-modal.html',
  imports: [FormsModule],
})
export class CrudFormModalComponent {
  @Input() visible = false;
  @Input() titulo = 'Nuevo usuario';
  @Input() usuario: UsuarioFormData | null = null;

  @Output() save = new EventEmitter<UsuarioFormData>();
  @Output() cancel = new EventEmitter<void>();

  form: UsuarioFormData = {
    id: 0,
    userId: 0,
    title: '',
    body: '',
  };

  ngOnChanges() {
    if (this.usuario) {
      this.form = { ...this.usuario };
    } else {
      this.form = {
        id: 0,
        userId: 0,
        title: '',
        body: '',
      };
    }
  }

  
  onCancelar() {
    this.cancel.emit();
  }

  onGuardar() {
    if (
      !this.form.title.trim() ||
      !this.form.body.trim()
    ) {
      return;
    }

    this.save.emit({
      id: this.form.id ?? null,
      userId: this.form.userId ?? null,
      title: this.form.title.trim(),
      body: this.form.body.trim(),
    });
  }


}
