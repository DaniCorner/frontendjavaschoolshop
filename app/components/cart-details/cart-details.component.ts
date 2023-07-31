import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;
  totalPriceValue: number= 0;
  totalQuantityValue: number = 0;

  constructor(private cartService: CartService) { }

    //PARA ACTUALIZAR EL HTML DEL SHIPPING
  ngOnInit(): void {
    this.listCartDetails();
    this.cartService.totalPrice.subscribe((value: number) => {
      this.totalPrice = value;
      this.updateShippingCost();
    });
    this.cartService.totalQuantity.subscribe((value: number) => {
      this.totalQuantity = value;
      this.totalQuantityValue = value;
      this.updateShippingCost();
    });
  }

  updateShippingCost() {
    if (this.totalQuantityValue === 0 || this.totalQuantityValue > 9) {
      this.totalQuantityValue = 0;
    } else {
      this.totalQuantityValue = 5;
    }
  }
  
  getShippingCostClass(): string {
    return this.totalQuantityValue === 0 ? 'free-shipping' : 'regular-shipping';
  }

  listCartDetails() {
    // get a handle to the cart items
    this.cartItems = this.cartService.cartItems;
        // subscribe to the cart totalPrice
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    // subscribe to the cart totalQuantity
    this.cartService.totalQuantity.subscribe( 
      data => this.totalQuantity = data
    );

    // compute cart total price and quantity
    this.cartService.computeCartTotals();
  }

  incrementQuantity(theCartItem: CartItem) {
    this.cartService.addToCart(theCartItem);
  }

  decrementQuantity(theCartItem: CartItem) {
    this.cartService.decrementQuantity(theCartItem);
  }

  remove(theCartItem: CartItem) {
    this.cartService.remove(theCartItem);
  }
}
