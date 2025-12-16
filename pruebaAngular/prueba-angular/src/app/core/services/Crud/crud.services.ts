import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export interface UsuarioCrud {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface UsuarioCreateUpdateDto {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private baseUrl = `https://jsonplaceholder.typicode.com/posts/`;


  constructor(private http: HttpClient) {}


  listarUno(id: number) {
    return this.http.get<UsuarioCrud>(`${this.baseUrl}/${id}`);
  }

  listar() {
    return this.http.get<UsuarioCrud[]>(this.baseUrl);
  }

  crear(data: UsuarioCreateUpdateDto) {
    return this.http.post<UsuarioCrud>(this.baseUrl, data);
  }

  actualizar(data: UsuarioCreateUpdateDto) {
    return this.http.put<UsuarioCrud>(`${this.baseUrl}`, data);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  // listarConEliminados() {
  //   return this.http.get<UsuarioCrud[]>(`${this.baseUrl}/all`);
  // }

}
