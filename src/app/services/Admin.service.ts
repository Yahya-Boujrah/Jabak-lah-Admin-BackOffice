import { Injectable } from "@angular/core";
import{HttpClient, HttpHeaders} from "@angular/common/http"
import { Observable, catchError, of, tap } from "rxjs";
import { CustomResponse } from "../interfaces/Custom-response";
import { ChangePassword } from "../interfaces/Change-password";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
    providedIn: 'root'
  })
export class AdminService {
  private readonly apiUrl = 'http://localhost:8080/api/admin';  

  constructor(private http: HttpClient) {}

  admins$ = <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.apiUrl}/admins`)
    .pipe(
      tap(console.log),
      catchError(() => {
        return of('error')
      })
    );

  admin$ = <Observable<CustomResponse>>
  this.http.get<CustomResponse>(`${this.apiUrl}/infos`)
  .pipe(
    tap(console.log)
  );

  changePassword$ = (changePassword: ChangePassword) => <Observable<CustomResponse>>
  this.http.put<CustomResponse>(`${this.apiUrl}/changePassword`, changePassword, httpOptions)
  .pipe(
    tap(console.log),
    catchError(() => {
      return of('error')
    })
  );

  //   filterAdmins$ = (type: string , response : CustomResponse) => <Observable<CustomResponse>>
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

}
