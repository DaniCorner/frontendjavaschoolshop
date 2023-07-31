import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Purchase } from '../common/purchase';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private purchaseUrl = 'http://localhost:8080/api/checkout/purchase';

  constructor(private httpClient: HttpClient,
              private cartService: CartService) { }

  placeOrder(purchase: Purchase): Observable<any> { //Observable: handle request, events, forms, animations
        return this.httpClient.post<Purchase>(this.purchaseUrl, purchase).pipe( //Pipe: chain multiple operators for Observable
      tap(() => { //Tap: side effects, changes that not modify databse but give info about data flow
        this.cartService.clearCart(); //Obser, pipe and tap: reactive programming
      })
    );
  }  
}
