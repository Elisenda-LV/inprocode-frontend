import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Graphic } from '../interfaces/graphic.interface';


const API_URL = environment.endpoint;

@Injectable({providedIn: 'root'})

export class GraphicsService {

  constructor(private httpClient: HttpClient) { }

  showGraphics():Observable<Graphic[]>{
    return this.httpClient.get<Graphic[]>(`${API_URL}graphics`)
  }


}
