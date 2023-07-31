import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product;
  
  constructor(private productService: ProductService,
              private cartService: CartService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }

  handleProductDetails() {
    const theProductId: number = +this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(theProductId).subscribe((data) => {
      this.product = data;
      this.loadSimilarMovies();
    });
  }

  loadSimilarMovies() {
    const productId: number = parseInt(this.product.id.toString());
    this.productService.getSimilarMovies(productId).subscribe(
      (data: Product[]) => {
        this.product.similarMovies = data;
        console.log(this.product.similarMovies); // Check the retrieved data
      },
      (error) => {
        console.log('Error retrieving similar movies:', error);
      }
    );
  } 
  addToCart() {
    console.log(`Adding to cart: ${this.product.title}, ${this.product.price}`);
    const theCartItem = new CartItem(this.product);
    this.cartService.addToCart(theCartItem);    
  }

  reloadPage() {
    window.location.reload();
  }
}
