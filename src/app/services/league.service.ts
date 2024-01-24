import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { League } from '../interfaces/league.interface';



@Injectable({providedIn: 'root'})


export class LeagueService {

  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/leagues/';
  }

  getListLeagues(): Observable<League[]>{
    return this.http.get<League[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }

  deleteLeagues(id: number): Observable<any>{
    return this.http.delete<any>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  addLeague(body: League): Observable<any>{
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, body)
  }

  updateLeague(body: League):Observable<any>{
    const id = body.id;
    console.log(body);
    return this.http.patch<League>(`${this.myAppUrl}${this.myApiUrl}${id}`, body);
  }


}
