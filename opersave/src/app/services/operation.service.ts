import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Operation } from '../interfaces/operation';
import { Observable } from 'rxjs';
import { OperationDTO } from '../interfaces/operation-dto';

@Injectable({
  providedIn: 'root'
})
export class OperationService {
  private apiUrl = 'http://localhost:8080/operations';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Operation[]> {
    return this.http.get<Operation[]>(`${this.apiUrl}`);
  }
  
  findById(id: number): Observable<Operation> {
    return this.http.get<Operation>(`${this.apiUrl}/${id}`);
  }

  findWithFilter(text: string): Observable<Operation[]> {
    const params = new HttpParams().set('text', text);
    return this.http.get<Operation[]>(`${this.apiUrl}/search`, { params });
  }

  createOperation(operation: OperationDTO): Observable<Operation> {
    return this.http.post<Operation>(this.apiUrl, operation);
  }

  updateOperation(id: number, operation: OperationDTO): Observable<Operation> {
    return this.http.put<Operation>(`${this.apiUrl}/${id}`, operation);
  }

  deleteOperation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}