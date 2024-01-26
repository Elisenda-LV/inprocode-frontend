import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Map } from '../interfaces/map.interface';
import { Observable } from 'rxjs';

const API_URL = environment.endpoint;

@Injectable({providedIn: 'root'})


export class MapService {

  constructor(private httpClient: HttpClient) { }

  getMarkers():Observable <Map[]>{
    return this.httpClient.get<Map[]>(`${API_URL}maps`)
  }


}
