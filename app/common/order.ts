import { ShippingAddress } from "./shippingaddress";

export class Order {
    id!: number;
    totalQuantity!: number;
    totalPrice!: number;
    orderTrackingNumber!: number;
    status!: string;
    newStatus!: string;
    shippingAddress!: ShippingAddress;
}
