import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Calendar } from '../interfaces/calendar.interface';

const API_URL = environment.endpoint;

@Injectable({providedIn: 'root'})

export class CalendarService {

  constructor(private httpClient: HttpClient) { }


  getListMatches():Observable<Calendar[]>{
    return this.httpClient.get<Calendar[]>(`${API_URL}calendars`)
  }



}
