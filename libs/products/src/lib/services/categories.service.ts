import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { Product } from '../models/product';
 

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
 

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Product[]> {
    return this.http.get<Category[]>('https://deltacuisine-g4agfudwckhaemfm.canadacentral-01.azurewebsites.net/api/v1/categories/')
  }

  createCategory(category: Category) :Observable<Category> {
    return this.http.post<Category>('https://deltacuisine-g4agfudwckhaemfm.canadacentral-01.azurewebsites.net/api/v1/categories/',category)
  }

  getCategory(categoryId : string): Observable<Category> {
    return this.http.get<Category>(`https://deltacuisine-g4agfudwckhaemfm.canadacentral-01.azurewebsites.net/api/v1/categories/${categoryId}`)
  }


  updateCategory(category: Category) :Observable<Category> {
    return this.http.put<Category>('https://deltacuisine-g4agfudwckhaemfm.canadacentral-01.azurewebsites.net/api/v1/categories/'+ category.id,category)
  }
 
  deleteCategory(categoryId: string): Observable<object> {
    return this.http.delete<object>(`https://deltacuisine-g4agfudwckhaemfm.canadacentral-01.azurewebsites.net/api/v1/categories/${categoryId}`)
  }
}
