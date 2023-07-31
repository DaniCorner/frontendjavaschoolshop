import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    constructor(private httpClient: HttpClient) { }

    public añadirUsuario(user:any){
      return this.httpClient.post(`${baserUrl}/usuarios/`,user);
    }

    obtenerUsuario(username: string) {
      const url = `${baserUrl}/usuarios/${username}`;
      return this.httpClient.get(url);
    }

    actualizarUsuario(username: string, usuarioActualizado: any) {
      const url = `${baserUrl}/usuarios/${username}`;
      return this.httpClient.put(url, usuarioActualizado);
    }    
}
