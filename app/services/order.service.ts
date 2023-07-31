import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Order } from '../common/order';
import { OrderItem } from '../common/order-item';
import { ExtendedOrderItem } from '../common/extended-order-item';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = 'http://localhost:8080/orders';
  private baseUrl2 = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl);
  }

  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/${id}`);
  }

  updateOrderStatus(id: number, status: string): Observable<Order> {
    return this.http.put<Order>(`${this.baseUrl}/${id}/status`, status);
  }

  getOrderItemsByUsername(username: string): Observable<ExtendedOrderItem[]> {
    const url = `${this.baseUrl2}/order-items/username/${username}`;
    return this.http.get<OrderItem[]>(url).pipe(
      map((orderItems: OrderItem[]) => {
        return orderItems.map((orderItem: OrderItem) => {
          return new ExtendedOrderItem(
            orderItem.imageUrl,
            orderItem.unitPrice,
            orderItem.quantity,
            orderItem.productId,
            orderItem.order
          );
        });
      })
    );
  }  
}
