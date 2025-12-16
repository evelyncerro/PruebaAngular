import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Crud } from '../feactures/CRUD/crud/crud'

@Component({
  selector: 'app-root',
  imports: [ Crud],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('prueba-angular');
}
