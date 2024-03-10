import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
 import { Produits} from '../models/produits';
 import { Articless} from '../models/articles';
 import { Devis} from '../models/devis';



 import { map } from 'rxjs/operators';
 
@Injectable({
  providedIn: 'root'
})
export class ProduitsService {
 
  constructor(private http: HttpClient) {}

  getContacts(): Observable<Produits[]> {
    return this.http.get<Produits[]>('https://deltacuisineapp.azurewebsites.net/api/v1/produits/');
  }


  deleteprod(prodId: string): Observable<object> {
    return this.http.delete<object>(`https://deltacuisineapp.azurewebsites.net/api/v1/produits/${prodId}`)
  }

  createProduit(productData: FormData): Observable<Produits> {
    return this.http.post<Produits>('https://deltacuisineapp.azurewebsites.net/api/v1/produits/', productData);
  }



  createAr(productData: FormData): Observable<Articless> {
    return this.http.post<Articless>('https://deltacuisineapp.azurewebsites.net/api/v1/articles/', productData);
  }

  getArt(): Observable<Articless[]> {
    return this.http.get<Articless[]>('https://deltacuisineapp.azurewebsites.net/api/v1/articles/');
  }
  deleteArt(prodId: string): Observable<object> {
    return this.http.delete<object>(`https://deltacuisineapp.azurewebsites.net/api/v1/articles/${prodId}`)
  }
  getDevis(): Observable<Devis[]> {
    return this.http.get<Devis[]>('https://deltacuisineapp.azurewebsites.net/api/v1/devis/');
  }

  deleteDevis(prodId: string): Observable<object> {
    return this.http.delete<object>(`https://deltacuisineapp.azurewebsites.net/api/v1/devis/${prodId}`)
  }

  createDevis(productData: FormData): Observable<Articless> {
    return this.http.post<Devis>('https://deltacuisineapp.azurewebsites.net/api/v1/devis/', productData);
  }

  ConvertDevis(devisId: string): Observable<Devis> {
    return this.http.put<Devis>(`https://deltacuisineapp.azurewebsites.net/api/v1/devis/update/${devisId}`, null);
  }


  updateDevis(devis: Devis): Observable<Devis> {
    return this.http.put<Devis>(`https://deltacuisineapp.azurewebsites.net/api/v1/devis/${devis.id}`, devis);
  }


 getDEVISBYID(userId: string): Observable<Devis> {
    return this.http.get<Devis>(`https://deltacuisineapp.azurewebsites.net/api/v1/devis/${userId}`);
  }


  updateArtice(devisId: string, formData: FormData): Observable<Articless> {
    return this.http.put<Articless>(`https://deltacuisineapp.azurewebsites.net/api/v1/articles/${devisId}`, formData);
  }
  
   
  getArticleId(userId: string): Observable<Articless> {
    return this.http.get<Articless>(`https://deltacuisineapp.azurewebsites.net/api/v1/articles/${userId}`);
  }

  updateProduit(prodId: string, formData: FormData): Observable<Produits> {
    return this.http.put<Produits>(`https://deltacuisineapp.azurewebsites.net/api/v1/produits/${prodId}`, formData);
  }

    getProduitId(userId: string): Observable<Produits> {
    return this.http.get<Produits>(`https://deltacuisineapp.azurewebsites.net/api/v1/produits/${userId}`);
    }


 }
