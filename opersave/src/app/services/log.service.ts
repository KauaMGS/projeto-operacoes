import { Injectable } from '@angular/core';
import { Log } from '../interfaces/log';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private apiUrl = 'http://localhost:8080/logs';

  constructor(private http: HttpClient) { }

  findAllLogs(): Observable<Log[]> {
    return this.http.get<Log[]>(`${this.apiUrl}`);
  }

  findLogsByOperationId(id: number): Observable<Log[]> {
    return this.http.get<Log[]>(`${this.apiUrl}/${id}`);
  }

}