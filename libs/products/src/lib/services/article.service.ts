import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
 import { Article } from '../models/article';
 

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
 

  constructor(private http: HttpClient) {}


  getArticle(): Observable<Article[]> {
    return this.http.get<Article[]>('http://localhost:3308/Articles/list-article/')
  }

  deleteArticle(artcileid: string): Observable<object> {
    return this.http.delete<object>(`http://localhost:3308/Articles/delete-article/${artcileid}`)
  }

  createArticle(collabData: FormData): Observable<Article> {
    return this.http.post<Article>('http://localhost:3308/Articles/create/', collabData); 
  }

  getArticlebyid(productId: string): Observable<Article> {
    return this.http.get<Article>(`http://localhost:3308/Articles/find-article/${productId}`);
  }

   
  updateArticle(productData: FormData,productid: string): Observable<Article> {
    return this.http.put<Article>(`http://localhost:3308/Articles/update-article/${productid}`, productData);
  }
   
  summarizeArticle(id: string): Observable<string> {
    const url = `http://localhost:3308/Articles/summarize/${id}`;
    return this.http.post<string>(url, {});
  }

  getArticlsCount(): Observable<number> {
    return this.http
      .get<number>(`http://localhost:3308/Articles/countArticles`)
   }

   QrCode(id: string): Observable<string> {
    const url = `http://localhost:3308/Articles/qrcode/${id}`;
    return this.http.post<string>(url, {});
  }

 
}