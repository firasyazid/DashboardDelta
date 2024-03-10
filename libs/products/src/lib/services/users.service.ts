import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { User } from '../models/user';
import { Session } from '../models/session';
import { Catalogues } from '../models/catalogues';
import {Showroom} from '../models/showroom'
import {Rate} from '../models/rate'
import { Livraison } from '../models/livraisons';
import { Commande } from '../models/commande';
import { Commercial } from '../models/commercial';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
 
  private baseUrl = 'https://deltacuisineapp.azurewebsites.net/api/v1/session';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('https://deltacuisineapp.azurewebsites.net/api/v1/users/');
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`https://deltacuisineapp.azurewebsites.net/api/v1/users/${userId}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>('https://deltacuisineapp.azurewebsites.net/api/v1/users/', user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`https://deltacuisineapp.azurewebsites.net/api/v1/users/${user.id}`, user);
  }

  deleteUser(userId: string): Observable<object> {
    return this.http.delete<object>(`https://deltacuisineapp.azurewebsites.net/api/v1/users/${userId}`);

  }

  getUsersCount(): Observable<number> {
    return this.http
      .get<number>(`https://deltacuisineapp.azurewebsites.net/api/v1/users/get/count`)
      .pipe(map((objectValue: any) => objectValue.userCount));
  }

  getSession(): Observable<Session[]> {
    return this.http.get<Session[]>('https://deltacuisineapp.azurewebsites.net/api/v1/session/display');
  }

  
   getSessionById(sessionId: string): Observable<Session> {
    return this.http.get<Session>(`https://deltacuisineapp.azurewebsites.net/api/v1/session/display/${sessionId}`);
  }

  getSessionsSum(): Observable<number> {
    return this.http
      .get<number>(`https://deltacuisineapp.azurewebsites.net/api/v1/session/sum`)
      .pipe(map((objectValue: any) => objectValue.totalSum));
  }

  
  getSessionsSumMonth(): Observable<number> {
    return this.http
      .get<number>(`https://deltacuisineapp.azurewebsites.net/api/v1/session/sumMonth`)
      .pipe(map((objectValue: any) => objectValue.totalSum));
  }


  createSession(session: Session): Observable<Session> {
    return this.http.post<Session>('https://deltacuisineapp.azurewebsites.net/api/v1/session/add', session);
  }

 
  getLastSession(): Observable<Session> {
     return this.http.get<Session>(('https://deltacuisineapp.azurewebsites.net/api/v1/session/last-session'));
   }

   updateSession(sess: Session): Observable<Session> {
    return this.http.put<Session>(`https://deltacuisineapp.azurewebsites.net/api/v1/session/${sess.id}`, sess);
  }
  

  incrementCompteur(sessionId: string, postName: string): Observable<any> {
    const url = `${this.baseUrl}/${sessionId}/postes/${postName}/increment`;
    return this.http.put(url, {});
  }
  decrementCompteur(sessionId: string, postName: string): Observable<any> {
    const url = `${this.baseUrl}/${sessionId}/postes/${postName}/decrement`;
    return this.http.put(url, {});
  }

  getStat(): Observable<any> {
    return this.http.get<any>('https://deltacuisineapp.azurewebsites.net/api/v1/session/sum-by-day');
  }
 

  getCatalogues(): Observable<Catalogues[]> {
    return this.http.get<Catalogues[]>('https://deltacuisineapp.azurewebsites.net/api/v1/catalogues/');
  }

  deletecatalogues(userId: string): Observable<object> {
    return this.http.delete<object>(`https://deltacuisineapp.azurewebsites.net/api/v1/catalogues/${userId}`);
  }

  getShowroom(): Observable<Showroom[]> {
    return this.http.get<Showroom[]>('https://deltacuisineapp.azurewebsites.net/api/v1/showrooms/');
  }

  deleteShowroom(userId: string): Observable<object> {
    return this.http.delete<object>(`https://deltacuisineapp.azurewebsites.net/api/v1/showrooms/${userId}`);
  }

  createShowroom(user: Showroom): Observable<Showroom> {
    return this.http.post<Showroom>('https://deltacuisineapp.azurewebsites.net/api/v1/showrooms/', user);
  }


  createRate(rate: Rate): Observable<Rate> {
    return this.http.post<Rate>('https://deltacuisineapp.azurewebsites.net/api/v1/conversions/', rate);
  }

  getRate(): Observable<Rate[]> {
    return this.http.get<Rate[]>('https://deltacuisineapp.azurewebsites.net/api/v1/conversions/');
  }


  deleteRate(rateId: string): Observable<object> {
    return this.http.delete<object>(`https://deltacuisineapp.azurewebsites.net/api/v1/conversions/${rateId}`);
  }


  updateRate(rate: Rate): Observable<Rate> {
    return this.http.put<Rate>(`https://deltacuisineapp.azurewebsites.net/api/v1/conversions/${rate.id}`, rate);
  }

  getshowroomsCount(): Observable<number> {
    return this.http
      .get<number>(`https://deltacuisineapp.azurewebsites.net/api/v1/showrooms/get/count`)
      .pipe(map((objectValue: any) => objectValue.userCount));
  }

  getArtCount(): Observable<number> {
    return this.http
      .get<number>(`https://deltacuisineapp.azurewebsites.net/api/v1/articles/get/count`)
      .pipe(map((objectValue: any) => objectValue.userCount));
  }
  getDevisCount(): Observable<number> {
    return this.http
      .get<number>(`https://deltacuisineapp.azurewebsites.net/api/v1/devis/get/count`)
      .pipe(map((objectValue: any) => objectValue.userCount));
  } 

  getLivraisons(): Observable<Livraison[]> {
    return this.http.get<Livraison[]>('https://deltacuisineapp.azurewebsites.net/api/v1/livraisons/');
  }

  updateLivr(livr: Livraison): Observable<Livraison> {
    return this.http.put<Livraison>(`https://deltacuisineapp.azurewebsites.net/api/v1/livraisons/${livr.id}`, livr);
  }

  
  getlivrid(userId: string): Observable<Livraison> {
    return this.http.get<Livraison>(`https://deltacuisineapp.azurewebsites.net/api/v1/livraisons/${userId}`);
  }


  deleteLivr(rateId: string): Observable<object> {
    return this.http.delete<object>(`https://deltacuisineapp.azurewebsites.net/api/v1/livraisons/${rateId}`);
  }
  getCmd(): Observable<Commande[]> {
    return this.http.get<Commande[]>('https://deltacuisineapp.azurewebsites.net/api/v1/commandes/');
  }
  
  deleteCmd(rateId: string): Observable<object> {
    return this.http.delete<object>(`https://deltacuisineapp.azurewebsites.net/api/v1/commandes/${rateId}`);
  }


  updateCmd(livr: Commande): Observable<Commande> {
    return this.http.put<Commande>(`https://deltacuisineapp.azurewebsites.net/api/v1/commandes/${livr.id}`, livr);
  }


  getcmdid(userId: string): Observable<Commande> {
    return this.http.get<Commande>(`https://deltacuisineapp.azurewebsites.net/api/v1/commandes/${userId}`);
  }


  getCommercial(): Observable<Commercial[]> {
    return this.http.get<Commercial[]>('https://deltacuisineapp.azurewebsites.net/api/v1/commercials/');
  }

  createCommercial(rate: Commercial): Observable<Commercial> {
    return this.http.post<Commercial>('https://deltacuisineapp.azurewebsites.net/api/v1/commercials/', rate);
  }

  deleteCom(rateId: string): Observable<object> {
    return this.http.delete<object>(`https://deltacuisineapp.azurewebsites.net/api/v1/commercials/${rateId}`);
  }


  updateCommercial(livr: Commercial): Observable<Commercial> {
    return this.http.put<Commercial>(`https://deltacuisineapp.azurewebsites.net/api/v1/commercials/${livr.id}`, livr);
  }
  getcommercialid(userId: string): Observable<Commercial> {
    return this.http.get<Commercial>(`https://deltacuisineapp.azurewebsites.net/api/v1/commercials/${userId}`);
  }
  

  getCommercialNameById(commercialId: string): Observable<string> {
    return this.http.get<string>(`https://deltacuisineapp.azurewebsites.net/api/v1/commercials/name/${commercialId}`);
  }

  updateShow(livr: Showroom): Observable<Showroom> {
    return this.http.put<Showroom>(`https://deltacuisineapp.azurewebsites.net/api/v1/showrooms/${livr.id}`, livr);
  }
  getShowid(userId: string): Observable<Showroom> {
    return this.http.get<Showroom>(`https://deltacuisineapp.azurewebsites.net/api/v1/showrooms/${userId}`);
  }
  }

 