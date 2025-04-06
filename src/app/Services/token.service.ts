import { inject, Injectable } from '@angular/core';
import {jwtDecode} from 'jwt-decode';
import { AppSetting } from '../Settings/AppSetting';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResponseAcceso } from '../Interfaces/IResponseAcceso';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private url = AppSetting.API_URL;
  private http = inject(HttpClient);

  constructor() { }

  //descodifica el token y obetiene el subject que envia un string con el id usuario
  //ese valor lo convierto luego en un numero
  idUserByToken():number{
    const token = localStorage.getItem("token");

    if (token) {
      const decoToken = jwtDecode(token);
      const userId = Number(decoToken.sub);
      return userId;
    }else{
      return 0;
    }
  }


  //Metodo que valida el token
    ValidateToken(token:string):Observable<IResponseAcceso>{
      return this.http.get<IResponseAcceso>(`${this.url}Acceso/validarToken?token=${token}`);
    }


}


