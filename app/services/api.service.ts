import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductQuantity } from '../common/product-quantity';
import { AddressCountDTO } from '../common/address-count-dto';
import { RevenueStats } from '../common/revenuestats';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getProductQuantities(): Observable<ProductQuantity[]> {
    const url = `${this.baseUrl}/order-items/product-quantities`;
    return this.http.get<ProductQuantity[]>(url);
  }

  getAddressCounts(): Observable<AddressCountDTO[]> {
    const url = `${this.baseUrl}/addresses/countries-with-most-occurrences`;
    return this.http.get<AddressCountDTO[]>(url);
  }

  getRevenueStats(): Observable<Object[]> {
    return this.http.get<Object[]>(`${this.baseUrl}/dates/revenue-stats`);
  }
}