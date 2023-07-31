import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-category-list-admin',
  templateUrl: './category-list-admin.component.html',
  styleUrls: ['./category-list-admin.component.css']
})
export class CategoryListAdminComponent implements OnInit {
  productCategories: ProductCategory[] = [];
  newCategoryName: string = '';

  constructor(private productService: ProductService,
              private router: Router) {}

  ngOnInit() {
    this.listProductCategories();
  }

  listProductCategories() {
    this.productService.getProductCategories().subscribe(
      data => {
        console.log('Product Categories=' + JSON.stringify(data));
        this.productCategories = data;
      }
    );
  }

  addCategory() {
    const newCategory: ProductCategory = {
      id: null,
      categoryName: this.newCategoryName,
      isEditing: false // Agregar la propiedad isEditing con valor false
    };

    this.productService.addProductCategory(newCategory).subscribe(
      data => {
        console.log('Added Category=' + JSON.stringify(data));
        this.productCategories.push(data);
        this.newCategoryName = '';
      }
    );
  }
  
  deleteCategory(category: ProductCategory) {
    this.productService.deleteProductCategory(category.id).subscribe(
      () => {
        console.log('Deleted Category=' + category.id);
        this.productCategories = this.productCategories.filter(c => c.id !== category.id);
      }
    );
  }

  editCategory(category: ProductCategory) {
    category.isEditing = true;
  }
  
  cancelEditCategory(category: ProductCategory) {
    category.isEditing = false;
  }
  
  saveCategory(category: ProductCategory) { 
    this.productService.updateProductCategory(category.id, category).subscribe( //Call the service to update the category
      updatedCategory => {
        console.log('Updated Category=' + JSON.stringify(updatedCategory)); //Update the category in the list        
        const index = this.productCategories.findIndex(c => c.id === updatedCategory.id);
        if (index !== -1) {
          this.productCategories[index] = updatedCategory;
        }        
        category.isEditing = false; //Exit edit mode
      }
    );
  }
}