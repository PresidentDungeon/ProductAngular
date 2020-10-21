import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Type} from "../models/Type";

@Injectable({
  providedIn: 'root'
})
export class TypesService {

  private typeUrl = 'https://localhost:44320/api/producttype';
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  addType(type: Type): Observable<Type>{
    return this.http.post<Type>(this.typeUrl, type, this.httpOptions);
  }

  getTypes(): Observable<Type[]>{
    return this.http.get<Type[]>(this.typeUrl);
  }

  getTypeById(id: number): Observable<Type>{
    return this.http.get<Type>(this.typeUrl + '/' + id);
  }

  updateType(type: Type): Observable<Type>{
    return this.http.put<Type>(this.typeUrl + '/' + type.id, type, this.httpOptions);
  }

  deleteType(id: number): Observable<Type>{
    return this.http.delete<Type>(this.typeUrl + '/' + id, this.httpOptions);
  }
}
