import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Code } from '../../models/codepromo';



@Injectable({
    providedIn: 'root'
  })
  export class CodeService {
   
    constructor(private http: HttpClient) {}
  
    getCode(): Observable<Code[]> {
      return this.http.get<Code[]>('https://deltacuisineapp.azurewebsites.net/api/v1/codepromo/');
    }

    createCode(code: Code): Observable<Code> {
        return this.http.post<Code>('https://deltacuisineapp.azurewebsites.net/api/v1/codepromo/', code);
      }

      getcodee(codeId: string): Observable<Code> {
        return this.http.get<Code>(`https://deltacuisineapp.azurewebsites.net/api/v1/codepromo/${codeId}`);
      }
 
      updateCode(code: Code) :Observable<Code> {
        return this.http.put<Code>('https://deltacuisineapp.azurewebsites.net/api/v1/codepromo/'+ code.id,code)
      }
}