import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Subject, tap} from "rxjs";

import {AuthResponse} from "../interfaces/Auth-response";
import { Admin } from '../interfaces/Admin.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly URL : string = 'https://jabak-lah-app.herokuapp.com/api/auth';

  constructor(private http : HttpClient) { }

  authenticate(username : string, password : string){
    return this.http.post<AuthResponse>(`${this.URL}/authenticate`, { username : username, password : password})
      .pipe(tap(console.log));
  }
}
