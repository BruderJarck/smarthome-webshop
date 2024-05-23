import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SensorModel } from '../sensor';
import { Observable, of } from 'rxjs';
import { SensorValueModel } from '../sensor_value';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  constructor(private http: HttpClient) {}

  private baseURL = environment.baseURL
  private sensorsURL = this.baseURL + 'sensors/';
  private sensorsValueURL = this.baseURL + 'sensor-values/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access'),
    }),
  };

  getSensors(): Observable<any[]> {
    return this.http.get<SensorModel[]>(this.sensorsURL);
  }

  filterSensorsByUserId(term: string): Observable<any[]> {
    if(!term.trim()){return of([]);}
    return this.http.get<SensorModel[]>(`${this.sensorsURL}?search=${term}`)
  }

  getSensorValues(): Observable<any[]>{
    return this.http.get<SensorValueModel[]>(this.sensorsValueURL)
  }

  filterSensorsBySensorId(term: string): Observable<any[]> {
    if(!term.trim()){return of([]);}
    return this.http.get<SensorModel[]>(`${this.sensorsValueURL}?search=${term}`)
  }
}
