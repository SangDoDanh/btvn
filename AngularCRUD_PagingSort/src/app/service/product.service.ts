import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../model/product';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Status } from '../model/status';
import { Category } from '../model/category';
import { Param } from '../model/param';

const URL_API_PRODUCTS = 'http://localhost:3000/products';
const URL_API_CATEGORIES = 'http://localhost:3000/categories';
const URL_API_STATUS = 'http://localhost:3000/status';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(URL_API_PRODUCTS);
  }


  deleteProductBiId(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${URL_API_PRODUCTS}/${id}`);
  }

  updateProduct(product: Product): Observable<Product> {
    const url = `${URL_API_PRODUCTS}/${product.id}`;
    return this.httpClient.put<Product>(url, product);
  }

  createProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(URL_API_PRODUCTS, product);
  }

  searchProductsByFirstCharacter(firstChar: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(URL_API_PRODUCTS).pipe(
      map(products => {
        return products.filter(product => product.product_name?.toLowerCase().startsWith(firstChar.toLowerCase()));
      })
    );
  }

  getAllFirstLetter(products: Product[]): any[] {
    const nameSet = new Set();

    let firstLetter;
      for(let p of products) {
        firstLetter = p.product_name?.charAt(0);
        if(firstLetter) {
          nameSet.add(firstLetter.toLocaleLowerCase());
        }
      }
    
    return Array.from(nameSet);
  }

  getAllStats(): Observable<Status[]> {
    return this.httpClient.get<Status[]>(URL_API_STATUS);
  }

  getAllCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(URL_API_CATEGORIES);
  }
  
  getProductsByname(productName: string): Observable<Product[]> {
    let params = new HttpParams();

    if (productName) {
      params = params.set('product_name_like', productName);
    }

    return this.httpClient.get<Product[]>(URL_API_PRODUCTS, { params });
  }

  getProductsByFilters(param: Param): Observable<Product[]> {
    let params = new HttpParams();
    if (param.productName) {
      params = params.set('product_name_like', param.productName);
    }
    if (param.minPrice) {
      params = params.set('unit_price_gte', param.minPrice.toString());
    }
    if (param.maxPrice) {
      params = params.set('unit_price_lte', param.maxPrice);
    }
    if (param.minAvailableSince) {
      params = params.set('available_since_gte', param.minAvailableSince);
    }

    if (param.maxAvailableSince) {
      params = params.set('available_since_lte', param.maxAvailableSince);
    }

    if (param.status) {
      params = params.set('status', param.status);
    }
    if (param.categoryId) {
      params = params.set('category_id', param.categoryId.toString());
    }
    // sort by product, category, price, status, available since
    if (param.ord_name) {
      params = params.set('_sort', param.ord_name);

      if (param.ord_by) { // ASC or DESC
        params = params.set('_order', param.ord_by);
      }
    }
    return this.httpClient.get<Product[]>(URL_API_PRODUCTS, { params });
  }
}
