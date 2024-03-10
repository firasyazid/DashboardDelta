import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Claim } from '../../models/claim';


@Injectable({
    providedIn: 'root'
  })
  export class ClaimService {
   
    constructor(private http: HttpClient) {}
  
    getClaim(): Observable<Claim[]> {
      return this.http.get<Claim[]>('http://localhost:3308/Claims/Listclaims');
    }

    deleteClaim(claimId: string): Observable<object> {
      return this.http.delete<object>(`http://localhost:3308/Claims/delete-claim/${claimId}`)
    }
    createClaim(claim: Claim): Observable<Claim> {
      return this.http.post<Claim>('http://localhost:3308/Claims/add-claim/', claim);
    }
    updateClaim(claim: Claim):Observable <Claim> {
      return this.http.put<Claim>('http://localhost:3308/Claims/'+ claim.id,claim)
    }
  
    getclaimByid(claimid: string): Observable<Claim> {
      return this.http.get<Claim>(` http://localhost:3308/Claims/find-claim/${claimid}`);
    }
    getClaimsCount(): Observable<number> {
      return this.http
        .get<number>(`http://localhost:3308/Claims/countClaims`)
     }

     getClaimsMonthly(): Observable<any> {
      return this.http.get(`http://localhost:3308/Claims/claims/monthly`);
    }


 }