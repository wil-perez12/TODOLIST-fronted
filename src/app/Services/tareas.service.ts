import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AppSetting } from '../Settings/AppSetting';
import { Observable } from 'rxjs';
import { IResponseTarea } from '../Interfaces/IResponseTarea';
import { ITarea } from '../Interfaces/ITarea';

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  private http = inject(HttpClient);
  private url = AppSetting.API_URL;

  constructor() { }

  // Método para obtener todas las tareas
  ListaTareas(): Observable<IResponseTarea>{
    return this.http.get<IResponseTarea>(`${this.url}Tareas/ListaTareas`);
  }

  // Método para obterner una tarea por id
  ListaTareasById(id: number): Observable<IResponseTarea>{
    return this.http.get<IResponseTarea>(`${this.url}Tareas/TareasPor/${id}`);
  }

  // Método para obterner una tarea por id
  ListaTareasByEstado(estado: string): Observable<IResponseTarea>{
    return this.http.get<IResponseTarea>(`${this.url}Tareas/TareasBy/${estado}`);
  }

  // Método para obterner una tarea por id de usuario
  ListaTareasByUserId(id:number): Observable<IResponseTarea>{
    return this.http.get<IResponseTarea>(`${this.url}Tareas/TareasBy/Usuario/${id}`);
  }

// Método para crear una tarea
  CrearTarea(objeto: ITarea): Observable<IResponseTarea> {
    return this.http.post<IResponseTarea>(`${this.url}Tareas/New/tarea`, objeto);
  }

  // Método para editar una tarea
  EditarTarea(id:number, objeto: ITarea): Observable<IResponseTarea> {
    return this.http.put<IResponseTarea>(`${this.url}Tareas/update/tarea/${id}`, objeto);
  }

  // Método para eliminar una tarea
  EliminarTarea(id: number): Observable<IResponseTarea> {
    return this.http.delete<IResponseTarea>(`${this.url}Tareas/delete/${id}`);
  }
}
