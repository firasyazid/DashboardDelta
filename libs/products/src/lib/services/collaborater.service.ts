import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Collaborater } from '../models/collaborater';

@Injectable({
    providedIn: 'root'
  }) 

  export class CollaboraterService {

    constructor(private http: HttpClient) {}

    getCollabs(categoriesFilter?: string[]): Observable<Collaborater[]> {
      let params = new HttpParams();
      if (categoriesFilter) {
        params = params.append('categories', categoriesFilter.join(','));
      }
      return this.http.get<Collaborater[]>('https://deltacuisine-g4agfudwckhaemfm.canadacentral-01.azurewebsites.net/api/v1/collaboraters/',{ params: params });
    }

    
    getCollab(collabData: string): Observable<Collaborater> {
        return this.http.get<Collaborater>(`https://deltacuisine-g4agfudwckhaemfm.canadacentral-01.azurewebsites.net/api/v1/collaboraters/${collabData}`);
      }

    createCollab(collabData: FormData): Observable<Collaborater> {
        return this.http.post<Collaborater>('https://deltacuisine-g4agfudwckhaemfm.canadacentral-01.azurewebsites.net/api/v1/collaboraters/', collabData); 
      }
    



      updateCollab(collabData: FormData,productid: string ): Observable<Collaborater> {
        return this.http.put<Collaborater>(`https://deltacuisine-g4agfudwckhaemfm.canadacentral-01.azurewebsites.net/api/v1/collaboraters/${productid}`, collabData);
      }
    
      deleteCollab(categoryId: string): Observable<object> {
        return this.http.delete<object>(`https://deltacuisine-g4agfudwckhaemfm.canadacentral-01.azurewebsites.net/api/v1/collaboraters/${categoryId}`)
      }


      getUsersCount(): Observable<number> {
        return this.http
          .get<number>(`https://deltacuisine-g4agfudwckhaemfm.canadacentral-01.azurewebsites.net/api/v1/collaboraters/get/count`)
          .pipe(map((objectValue: any) => objectValue.userCount));
      }
     
  }