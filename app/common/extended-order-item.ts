import { Order } from "./order";
import { OrderItem } from "./order-item";

export class ExtendedOrderItem {
    imageUrl: string;
    unitPrice: number;
    quantity: number;
    productId: string;
    order: Order; // Add the order property
  
    constructor(
      imageUrl: string,
      unitPrice: number,
      quantity: number,
      productId: string,
      order: Order
    ) {
      this.imageUrl = imageUrl;
      this.unitPrice = unitPrice;
      this.quantity = quantity;
      this.productId = productId;
      this.order = order;
    }
  }
  