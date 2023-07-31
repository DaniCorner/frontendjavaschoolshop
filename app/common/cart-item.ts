import { Product } from './product';

export class CartItem {

    id: string;
    title: string;
    imageURL: string;
    price: number;

    quantity: number;

    constructor(product: Product){
        this.id=product.id;
        this.title=product.title;
        this.imageURL=product.imageURL;
        this.price = product.price;

        this.quantity=1;

    }
}
