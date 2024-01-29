import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Calendar } from '../interfaces/calendar.interface';

const API_URL = environment.endpoint;

@Injectable({providedIn: 'root'})

export class CalendarService {

  constructor(private httpClient: HttpClient) { }


  getListEvents():Observable<Calendar[]>{
    return this.httpClient.get<Calendar[]>(`${API_URL}calendars`)
  }

  getEvent(id:number):Observable<Calendar[]>{
    return this.httpClient.get<Calendar[]>(`${API_URL}calendars/${id}`)
  }

  deleteEvent(id:number):Observable<any[]>{
    return this.httpClient.delete<Calendar[]>(`${API_URL}calendars/${id}`)
  }

  postEvent(body: Calendar):Observable<any>{
    return this.httpClient.post<Calendar>(`${API_URL}calendars`, body)
  }

  updateEvent(body: Calendar):Observable<any>{
    const id = body.id;
    console.log(body);
    return this.httpClient.patch<Calendar>(`${API_URL}calendars/${id}`, body);
  }



}
