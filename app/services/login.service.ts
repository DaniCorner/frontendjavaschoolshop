import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'http://localhost:8080';

  public loginStatusSubject = new Subject<boolean>();

  constructor(private http: HttpClient,
              private cartService: CartService) { }

  public generateToken(loginData: any) {
    return this.http.post(`${this.baseUrl}/generate-token`, loginData);
  }

  public getCurrentUser() {
    return this.http.get(`${this.baseUrl}/actual-usuario`);
  }

  public loginUser(token: any) {
    this.cartService.clearCart();
    localStorage.setItem('token', token); //Set the token in LocalStorage     
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7); // Token expiration date in 7 days from now
    localStorage.setItem('tokenExpiration', expirationDate.toString());
    return true;
  }

  public isLoggedIn() {
    const tokenStr = localStorage.getItem('token');
    const tokenExpirationStr = localStorage.getItem('tokenExpiration');
    if (tokenStr === undefined || tokenStr === '' || tokenStr === null || this.isTokenExpired(tokenExpirationStr)) {
      return false;
    } else {
      return true;
    }
  }

  private isTokenExpired(expirationDate: string): boolean {
    if (expirationDate) {
      const now = new Date();
      const expiration = new Date(expirationDate);
      return now > expiration;
    }
    return true;
  }

 
  public logout() {  //Logout the user and remove the token from LocalStorage
    this.cartService.clearCart();

    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    localStorage.removeItem('user');
    return true;
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  public setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser() {
    const userStr = localStorage.getItem('user');
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }

  public getUserRole() {
    const user = this.getUser();
    return user.authorities[0].authority;
  }
}