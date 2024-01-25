import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { League } from '../interfaces/league.interface';

const API_URL = environment.endpoint;

@Injectable({providedIn: 'root'})


export class LeagueService {

  constructor(private http: HttpClient) {}

  getListLeagues(): Observable<League[]>{
    return this.http.get<League[]>(`${API_URL}leagues`)
  }

  deleteLeagues(id: number): Observable<any>{
    return this.http.delete<League[]>(`${API_URL}leagues/${id}`);
  }

  addLeague(body: League): Observable<any>{
    return this.http.post<League>(`${API_URL}leagues`, body)
  }

  updateLeague(body: League):Observable<any>{
    const id = body.id;
    console.log(body);
    return this.http.patch<League>(`${API_URL}leagues/${id}`, body);
  }

}
