import { Injectable } from "@angular/core";
import{HttpClient, HttpHeaders} from "@angular/common/http"
import { Observable, catchError, of, tap } from "rxjs";
import { CustomResponse } from "../interfaces/Custom-response";
import { Client } from "../interfaces/Client.interface";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
    providedIn: 'root'
  })
export class ClientService {
  private readonly apiUrl = 'http://localhost:8080/api/admin';  

  constructor(private http: HttpClient) {}

  clients$ = <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.apiUrl}/clients`)
    .pipe(
      tap(console.log),
      catchError(() => {
        return of('error')
      })
    );

  saveClient$ = (client:Client) => <Observable<CustomResponse>>
  this.http.post<CustomResponse>(`${this.apiUrl}/saveClient` ,client, httpOptions)
  .pipe(
    tap(console.log),
    catchError(() => {
      return of('error')
    })
  );

  updateClient$ = ( clientId: number, client: Client) => <Observable<CustomResponse>>
  this.http.put<CustomResponse>(`${this.apiUrl}/updateClient/${clientId}` , client , httpOptions)
  .pipe(
    tap(console.log),
    catchError(() => {
      return of('error')
    })
  );

  
  resetPassword$ = (clientId: number) => <Observable<CustomResponse>>
  this.http.put<CustomResponse>(`${this.apiUrl}/resetPasswordClient/${clientId}`, null)
  .pipe(
    tap(console.log)
  );


//   filterClients$ = (type: string , response : CustomResponse) => <Observable<CustomResponse>>
//     new Observable<CustomResponse>(
//       subscriber => {
//         console.log(response);
//         subscriber.next(
//           type === 'All' ? {...response, message: `demandes filtered by ${type} type`} :
//             {
//               ...response,
//               message: (response.data.demandes as Demande[]).filter(demande => demande.type === type).length > 0 ?
//               `demandes filtered by ${type} type` : `No demandes of ${type} found`,
//               data:{ demandes : (response.data.demandes as Demande[]).filter(demande => demande.type === type)}
//             }
//         );
//         subscriber.complete();
//       }
//     )
//   .pipe(
//     tap(console.log),
//     catchError(() => {
//       return of('error')
//     })
//   );


  client$ =  (clientId: number) => <Observable<CustomResponse>>
  this.http.get<CustomResponse>(`${this.apiUrl}/client/${clientId}`)
  .pipe(
    tap(console.log),
    catchError(() => {
      return of('error')
    })
  );

  deleteClient$ = (clientId: number) => <Observable<CustomResponse>>
  this.http.delete<CustomResponse>(`${this.apiUrl}/deleteClient/${clientId}`)
  .pipe(
    tap(console.log),
    catchError(() => {
      return of('error')
    })
  );
}
