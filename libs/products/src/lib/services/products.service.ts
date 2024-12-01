import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
 import { Product } from '../models/product';
 import { map } from 'rxjs/operators';
 
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
 
  constructor(private http: HttpClient) {}

  getContacts(): Observable<Product[]> {
    return this.http.get<Product[]>('https://deltabackend-ascph3fvcafhb9c2.francecentral-01.azurewebsites.net/api/v1/contacts/');
  }
  
  createProduct(productData: FormData): Observable<Product> {
    return this.http.post<Product>('https://deltabackend-ascph3fvcafhb9c2.francecentral-01.azurewebsites.net/api/v1/products/', productData);
  }

  getProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(`https://deltabackend-ascph3fvcafhb9c2.francecentral-01.azurewebsites.net/api/v1/products/${productId}`);
  }
  updateProduct(productData: FormData, productid: string): Observable<Product> {
    return this.http.put<Product>(`https://deltabackend-ascph3fvcafhb9c2.francecentral-01.azurewebsites.net/api/v1/products/${productid}`, productData);
  }
  getProductsCount(): Observable<number> {
    return this.http
      .get<number>(`https://deltabackend-ascph3fvcafhb9c2.francecentral-01.azurewebsites.net/api/v1/products/get/count`)
      .pipe(map((objectValue: any) => objectValue.productCount));
  }
  getFeaturedProducts(count: number): Observable<Product[]> {
    return this.http.get<Product[]>(`https://deltabackend-ascph3fvcafhb9c2.francecentral-01.azurewebsites.net/api/v1/products/get/featured/${count}`);
  }
  deleteContact(userId: string): Observable<object> {
    return this.http.delete<object>(`https://deltabackend-ascph3fvcafhb9c2.francecentral-01.azurewebsites.net/api/v1/contacts/${userId}`);
  }



}
