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
  private readonly apiUrl = 'http://localhost:8080/api/admin';  

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

//   filterAgents$ = (type: string , response : CustomResponse) => <Observable<CustomResponse>>
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
