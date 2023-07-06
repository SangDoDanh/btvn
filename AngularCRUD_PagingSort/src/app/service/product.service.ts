import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product';
import { HttpClient, HttpParams } from '@angular/common/http';

const URL_API = 'http://localhost:3000/products';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(URL_API);
  }

  getProductsByname(productName: string): Observable<Product[]> {
    let params = new HttpParams();

    if (productName) {
      params = params.set('product_name_like', productName);
    }

    return this.httpClient.get<Product[]>(URL_API, { params });
  }

  getProductsByFilters(
    productName: string,
    minPrice: number,
    maxPrice: number,
    minAvailableSince: string,
    maxAvailableSince: string,
    status: string,
    categoryId: number,
    sortBy: string,
    sortOrder: 'asc' | 'desc'
  ): Observable<Product[]> {
    let params = new HttpParams();

    if (productName) {
      params = params.set('product_name_like', productName);
    }

    if (minPrice) {
      params = params.set('unit_price_gte', minPrice.toString());
    }

    if (maxPrice) {
      params = params.set('unit_price_lte', maxPrice.toString());
    }

    if (minAvailableSince) {
      params = params.set('available_since_gte', minAvailableSince);
    }

    if (maxAvailableSince) {
      params = params.set('available_since_lte', maxAvailableSince);
    }

    if (status) {
      params = params.set('status', status);
    }

    if (categoryId) {
      params = params.set('category_id', categoryId.toString());
    }
    if (sortBy) {
      params = params.set('_sort', sortBy);
    }

    if (sortOrder) {
      params = params.set('_order', sortOrder);
    }

    return this.httpClient.get<Product[]>(URL_API, { params });
  }
}
