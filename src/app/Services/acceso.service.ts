import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AppSetting } from '../Settings/AppSetting';
import { IRegister } from '../Interfaces/IRegister';
import { Observable } from 'rxjs';
import { IResponseAcceso } from '../Interfaces/IResponseAcceso';
import { ILogin } from '../Interfaces/ILogin';

@Injectable({
  providedIn: 'root'
})
export class AccesoService {
  private http = inject(HttpClient);
  private url = AppSetting.API_URL;

  constructor() { }

  // Método para registro
  Register(objeto:IRegister):Observable<IResponseAcceso>{
    return this.http.post<IResponseAcceso>(`${this.url}Acceso/Registro`, objeto);
  }

   // Método para iniciar sesión
  Login(objeto:ILogin):Observable<IResponseAcceso>{
    return this.http.post<IResponseAcceso>(`${this.url}Acceso/Login`, objeto);
  }

}
