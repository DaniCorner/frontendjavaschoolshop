import { CartItem } from './cart-item';
import { Order } from './order';

export class OrderItem {
    imageUrl: string;
    unitPrice: number;
    quantity: number;
    productId: string;
     order: Order;
  orderItems: any;

    constructor(cartItem: CartItem) {
        this.imageUrl = cartItem.imageURL;
        this.quantity = cartItem.quantity;
        this.unitPrice = cartItem.price;
        this.productId = cartItem.id;
    }    
}
