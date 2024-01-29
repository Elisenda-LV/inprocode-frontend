import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { MyCalendar } from '../interfaces/calendar.interface';

const API_URL = environment.endpoint;

@Injectable({providedIn: 'root'})

export class CalendarService {

  constructor(private httpClient: HttpClient) { }


  getListEvents():Observable<MyCalendar[]>{
    return this.httpClient.get<MyCalendar[]>(`${API_URL}calendars`)
  }

  getEvent(id:number):Observable<MyCalendar[]>{
    return this.httpClient.get<MyCalendar[]>(`${API_URL}calendars/${id}`)
  }

  deleteEvent(id:number):Observable<any[]>{
    return this.httpClient.delete<MyCalendar[]>(`${API_URL}calendars/${id}`)
  }

  postEvent(body: MyCalendar):Observable<any>{
    return this.httpClient.post<MyCalendar>(`${API_URL}calendars`, body)
  }

  updateEvent(body: MyCalendar):Observable<any>{
    const id = body.id;
    console.log(body);
    return this.httpClient.patch<MyCalendar>(`${API_URL}calendars/${id}`, body);
  }



}
