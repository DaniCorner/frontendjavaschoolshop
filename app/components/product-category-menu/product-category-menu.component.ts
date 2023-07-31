import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {
  productCategories: ProductCategory[]=[];  
  constructor(private productService: ProductService) { }

  //Antes de renderizar la vista
  ngOnInit() {
    this.listProductCategories();
  }

  //Obtiene las categorías desde el productService
  listProductCategories() {
    //Aquí llama al método GetProd de ProductService
    // Se subscribe al Observable GetProd
    this.productService.getProductCategories().subscribe(
      //Función callback: llama a otra función de forma asíncrona, eventos
      //Data son los datos emitidos por el Observable
      data => {
        //Se muestran los datos en consola en formato JSON
        console.log('Product Categories=' + JSON.stringify(data));
        this.productCategories = data;
      }
    );
  }
}
