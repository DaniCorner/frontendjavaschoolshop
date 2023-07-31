import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../common/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';
  private categoryUrl = 'http://localhost:8080/api/product-category';
  private baseUrl2 = 'http://localhost:8080/api/product-categories';
  private baseUrl3 = 'http://localhost:8080/products';  

  constructor(private httpClient: HttpClient) { }

  getProduct(theProductId: number): Observable<Product> {
    const productUrl=`${this.baseUrl}/${theProductId}`;
      return this.httpClient.get<Product>(productUrl);
    }

    getSimilarMovies(theProductId: number): Observable<Product[]> {
      const similarMoviesUrl = `${this.baseUrl3}/${theProductId}/similar`;
      return this.httpClient.get<Product[]>(similarMoviesUrl);
    }

    getProductsPaginated(page: number, size: number): Observable<any> {
      const url = `${this.baseUrl}?page=${page}&size=${size}`;
      return this.httpClient.get<any>(url);
    }

    getProductListPaginate(thePage: number, 
                            thePageSize: number,
                            theCategoryId: number): Observable<GetResponseProducts> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
        +`&page=${thePage}&size=${thePageSize}`;

      return this.httpClient.get<GetResponseProducts>(searchUrl);
    }

  getProductList(theCategoryId: number): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.getProducts(searchUrl);
  }

  searchProducts(theKeyword: string): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByTitleContainingOrParametersContaining?title=${theKeyword}&parameters=${theKeyword}`;
    return this.getProducts(searchUrl);
  }

  searchProducts2(theKeyword: string, currentPage: number, pageSize: number): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByTitleContainingOrParametersContaining?title=${theKeyword}&parameters=${theKeyword}&page=${currentPage - 1}&size=${pageSize}`;
      return this.getProducts(searchUrl);
  }

      searchProductsPaginate(thePage: number, 
                                 thePageSize: number,
                                 theKeyword: string): Observable<GetResponseProducts> {

        const searchUrl = `${this.baseUrl}/search/findByTitleContainingOrParametersContaining?title=${theKeyword}&parameters=${theKeyword}`
                         +`&page=${thePage}&size=${thePageSize}`; 

        return this.httpClient.get<GetResponseProducts>(searchUrl);
        }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(map(response => response._embedded.products));
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }  

  registerProduct(product:Product) : Observable<Object> {
    return this.httpClient.post(`${this.baseUrl}`, product);
  }

  editProduct(productId: number, product: Product): Observable<any> {
    const url = `${this.baseUrl}/${productId}`;
    return this.httpClient.put<any>(url, product);
  }

  updateProduct(product: Product): Observable<any> {
    const updateUrl = `${this.baseUrl}/${product.id}`;
    return this.httpClient.put<any>(updateUrl, product);
  }

  deleteProduct(productId: string): Observable<any> {
    const deleteUrl = `${this.baseUrl}/${productId}`;
    return this.httpClient.delete(deleteUrl);
    }

  addProductCategory(category: ProductCategory): Observable<ProductCategory> {
    return this.httpClient.post<ProductCategory>(this.baseUrl2, category);
  }

  updateProductCategory(categoryId: number, category: ProductCategory): Observable<ProductCategory> {
    const url = `${this.baseUrl2}/${categoryId}`;
    return this.httpClient.put<ProductCategory>(url, category);
  }

  deleteProductCategory(categoryId: number): Observable<any> {
    const url = `${this.baseUrl2}/${categoryId}`;
    return this.httpClient.delete(url);
  }
}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number, //size of the page
    totalElements: number, // all elements
    totalPages: number, // total pages avaialble
    number: number //current page number
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}