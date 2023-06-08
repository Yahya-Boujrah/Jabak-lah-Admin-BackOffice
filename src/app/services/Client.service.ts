import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"
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
  private readonly apiUrl = 'https://jabak-lah-app.herokuapp.com/api/admin';

  constructor(private http: HttpClient) { }

  clients$ = <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.apiUrl}/clients`)
      .pipe(
        tap(console.log),
        catchError(() => {
          return of('error')
        })
      );

  saveClient$ = (client: Client) => <Observable<CustomResponse>>
    this.http.post<CustomResponse>(`${this.apiUrl}/saveClient`, client, httpOptions)
      .pipe(
        tap(console.log),
        catchError(() => {
          return of('error')
        })
      );

  updateClient$ = (clientId: number, client: Client) => <Observable<CustomResponse>>
    this.http.put<CustomResponse>(`${this.apiUrl}/updateClient/${clientId}`, client, httpOptions)
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


  filterClients$ = (name: string, response: CustomResponse) => <Observable<CustomResponse>>
    new Observable<CustomResponse>(
      subscriber => {
        console.log(response);
        const filteredClients = (response.data.clients as Client[]).filter(client =>
          client?.lastName!.toLowerCase().includes(name.toLowerCase()) ||
          client?.firstName!.toLowerCase().includes(name.toLowerCase()) ||
          client?.phone!.includes(name)
        );
        const filteredResponse: CustomResponse = {
          ...response,
          message: filteredClients.length > 0
            ? `clients filtered by name "${name}"`
            : `No clients found with name "${name}"`,
          data: { clients: filteredClients },
        };

        subscriber.next(filteredResponse);
        subscriber.complete();

      }
    )
      .pipe(
        tap(console.log),
        catchError(() => {
          return of('error')
        })
      );


  client$ = (clientId: number) => <Observable<CustomResponse>>
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
