import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import { ProductCategory } from 'src/app/common/product-category';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-list-admin',
  templateUrl: './product-list-admin.component.html',
  styleUrls: ['./product-list-admin.component.css']
})
export class ProductListAdminComponent implements OnInit {
  showProductAddedAlert: boolean = false;

  products: Product[] = [];
  selectedCategory: ProductCategory; 

  currentPage: number = 1;
  pageSize: number = 20;
  totalProducts: number = 0;
  searchKeyword: string = "";

  product : Product = new Product("", "", "", 0, 0,  0, 0, 0);


  constructor(private productService: ProductService, 
              private router:Router) {}

  ngOnInit(): void {
    
    this.searchProducts2('');

  }

  saveProduct() {
    this.productService.registerProduct(this.product).subscribe(
      (data) => {
        console.log(data);
        this.showProductAddedAlert = true;
        this.product = new Product('', '', '', 0, 0, 0, 0, 0);

        setTimeout(() => {
          this.showProductAddedAlert = false;
        }, 3000);
      },
      (error) => console.log(error)
    );
  }
  goToTheList(){
    this.router.navigate(['/src/app/pages/admin/product-list-admin']);
  }

  onSubmit(){
    this.saveProduct();
  }

  searchProducts2(keyword: string): void {
    this.productService.searchProducts2(keyword, this.currentPage, this.pageSize)
      .subscribe((products: Product[]) => {
        this.products = products;
        this.totalProducts = products.length;
      });
  }

  getProducts(): void {
    this.productService.getProductsPaginated(this.currentPage, this.pageSize)
      .subscribe((data) => {
        this.products = data.products;
        this.totalProducts = data.totalProducts;
      });
  }

  editProduct(productId: string): void {
    const product = this.products.find((p) => p.id === productId);
    if (product) {
      product.isEditing = true;
    }
  }

  updateProduct(product: Product): void {
    this.productService.updateProduct(product).subscribe(() => {
      product.isEditing = false;
    });
  }

  cancelEditing(product: Product): void {
    product.isEditing = false;
  }

  deleteProduct(productId: string): void {
    this.productService.deleteProduct(productId).subscribe(() => {
      this.searchProducts2('');
    });
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.searchProducts2('');
    }
  }

  nextPage(): void {
    this.currentPage++;
    this.searchProducts2('');
  }


  searchProducts(): void {
    if (this.searchKeyword.trim().length > 0) {
      this.productService.searchProducts(this.searchKeyword)
        .subscribe((products: Product[]) => {
          this.products = products;
          this.totalProducts = products.length;
        });
    } else {
      this.getProducts();
    }
  }
}
