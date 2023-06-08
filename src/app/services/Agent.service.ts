import { Injectable } from "@angular/core";
import{HttpClient, HttpHeaders} from "@angular/common/http"
import { Observable, catchError, of, tap } from "rxjs";
import { CustomResponse } from "../interfaces/Custom-response";
import { Agent } from "../interfaces/Agent.interface";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
    providedIn: 'root'
  })
export class AgentService {
  private readonly apiUrl = 'https://jabak-lah-app.herokuapp.com/api/admin';  

  constructor(private http: HttpClient) {}

  agents$ = <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.apiUrl}/agents`)
    .pipe(
      tap(console.log),
      catchError(() => {
        return of('error')
      })
    );

  saveAgent$ = (agent:Agent) => <Observable<CustomResponse>>
  this.http.post<CustomResponse>(`${this.apiUrl}/saveAgent` ,agent, httpOptions)
  .pipe(
    tap(console.log),
    catchError(() => {
      return of('error')
    })
  );

  updateAgent$ = (agentId:number, agent:Agent) => <Observable<CustomResponse>>
  this.http.put<CustomResponse>(`${this.apiUrl}/updateAgent/${agentId}` , agent, httpOptions)
  .pipe(
    tap(console.log),
    catchError(() => {
      return of('error')
    })
  );


  filterAgents$ = (name: string, response: CustomResponse) => <Observable<CustomResponse>>
    new Observable<CustomResponse>(
      subscriber => {
        console.log(response);
        const filteredAgents = (response.data.agents as Agent[]).filter(agent =>
          agent?.lastName!.toLowerCase().includes(name.toLowerCase()) ||
          agent?.firstName!.toLowerCase().includes(name.toLowerCase()) ||
          agent?.email!.toLowerCase().includes(name.toLowerCase()) ||
          agent?.username!.toLowerCase().includes(name.toLowerCase())
        );
        const filteredResponse: CustomResponse = {
          ...response,
          message: filteredAgents.length > 0
            ? `clients filtered by name "${name}"`
            : `No clients found with name "${name}"`,
          data: { agents: filteredAgents },
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
      
  resetPassword$ = (agentId: number) => <Observable<CustomResponse>>
  this.http.put<CustomResponse>(`${this.apiUrl}/resetPasswordAgent/${agentId}`, null)
  .pipe(
    tap(console.log)
  );


  agent$ =  (agentId: number) => <Observable<CustomResponse>>
  this.http.get<CustomResponse>(`${this.apiUrl}/agent/${agentId}`)
  .pipe(
    tap(console.log),
    catchError(() => {
      return of('error')
    })
  );

  deleteAgent$ = (agentId: number) => <Observable<CustomResponse>>
  this.http.delete<CustomResponse>(`${this.apiUrl}/deletAgent/${agentId}`)
  .pipe(
    tap(console.log),
    catchError(() => {
      return of('error')
    })
  );
}
