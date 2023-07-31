import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  constructor() {
    this.loadCartList();
  }

  addToCart(theCartItem: CartItem) {
    let existingCartItem = this.cartItems.find(
      tempCartItem => tempCartItem.id === theCartItem.id
    );

    if (existingCartItem) {
      existingCartItem.quantity++;
    } else {
      this.cartItems.push(theCartItem);
    }

    this.computeCartTotals();
    this.saveCartList();
  }

  decrementQuantity(theCartItem: CartItem) {
    theCartItem.quantity--;

    if (theCartItem.quantity === 0) {
      this.remove(theCartItem);
    } else {
      this.computeCartTotals();
      this.saveCartList();
    }
  }

  remove(theCartItem: CartItem) {
    const itemIndex = this.cartItems.findIndex(
      tempCartItem => tempCartItem.id === theCartItem.id
    );

    if (itemIndex !== -1) {
      this.cartItems.splice(itemIndex, 1);
      this.computeCartTotals();
      this.saveCartList();
    }
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;
  
    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.price;
      totalQuantityValue += currentCartItem.quantity;
    }
  
    if (totalQuantityValue < 10 && totalQuantityValue !== 0) {
      totalPriceValue +=5;
    }
  
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  
    this.logCartData(totalPriceValue, totalQuantityValue);
  }
  

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('Content of the cart');
    for (let tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.price;
      console.log(
        `name: ${tempCartItem.title}, quantity=${tempCartItem.quantity},
      unitPrice= ${tempCartItem.price}, subTotalPrice=${subTotalPrice}`
      );
    }

    console.log(
      `totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`
    );
    console.log('----');
  }

  saveCartList() {
    localStorage.setItem('cartList', JSON.stringify(this.cartItems));
  }

  loadCartList() {
    const cartList = localStorage.getItem('cartList');
    if (cartList) {
      this.cartItems = JSON.parse(cartList);
      this.computeCartTotals();
    }
  }

  clearCart() {
    this.cartItems = [];
    this.computeCartTotals();
    this.saveCartList();
  }  
}
