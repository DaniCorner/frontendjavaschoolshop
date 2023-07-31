import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';
import { timeoutWith } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  currentCategoryName: string = "";
  searchMode: boolean = false;

      //propiedades paginación
      thePageNumber: number=1;
      thePageSize: number=16;
      theTotalElements: number=0;
      previousKeyword: string ="";

      constructor(private productService: ProductService,
                  private cartService: CartService,
                  private route: ActivatedRoute) { }

//Evento paramMap que se dispara cada vez que hay cambios en
//los parámetros de la URL. Con Subscribe(), 
//se especifica una función de devolución de llamada
  //que se ejecuta con cada cambio en los parámetros de la URL.
  ngOnInit() {
        this.route.paramMap.subscribe(() => {
        this.listProducts();
      });
  }

  //Snapshot recibe la info de manera estática, en el momento en que se realiza la petición
  listProducts() {
          this.searchMode = this.route.snapshot.paramMap.has('keyword');
          if (this.searchMode) {
          this.handleSearchProducts();
          }
        else {
        this.handleListProducts();
      }
}

handleSearchProducts() {
  const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;
    //Si tenemos una keyword diferente que la anterior, es decir
    //si se ha hecho una nueva búsqueda. En ese caso 
    //se establece pagenumber en 1

  if(this.previousKeyword != theKeyword) {
            this.thePageNumber = 1;
        }
        this.previousKeyword = theKeyword;
        console.log(`keyword=${theKeyword}, thePageNumber=${this.thePageNumber}`);

        // ahora busca el producto con la keyword
        this.productService.searchProductsPaginate(this.thePageNumber -1,
                                                  this.thePageSize,
                                                  theKeyword).subscribe(this.processResult());
}

handleListProducts() {
      // comprueba si "id" está disponible
      const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
      if (hasCategoryId) {
      // toma el parámetro id y lo pasa a number
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
        }
        else {
        // si no hay una categoría selecciona, default es 1
        this.currentCategoryId = 5;
        }
        if(this.previousCategoryId != this.currentCategoryId) {
          this.thePageNumber=1;
        }
        this.previousCategoryId=this.currentCategoryId;
      console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);
      // now get the products for the given category id
      this.productService.getProductListPaginate(this.thePageNumber -1,
                                                this.thePageSize,
                                                this.currentCategoryId)
                                                .subscribe(this.processResult());
}

    //Procesa los resultados en función del parámetro recibido
  processResult() {
    return (data:any)=>{
      this.products=data._embedded.products;
      this.thePageNumber=data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements= data.page.totalElements;
      };
    }


    //Actualiza el tamaño de la página en función búsqueda
  updatePageSize(pageSize: string) {
    this.thePageSize = +pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }

  addToCart(theProduct : Product) {
    console.log(`Adding to cart: ${theProduct.title}, ${theProduct.price}`);

    // TODO ... do the real work
    const theCartItem = new CartItem(theProduct);

    this.cartService.addToCart(theCartItem);
  }

  deleteProduct(productId: string) {
    this.productService.deleteProduct(productId).subscribe(() => {
      // Vuelve a cargar la lista de productos después de eliminar
      this.listProducts();
    });
  }
}
