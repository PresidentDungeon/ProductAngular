import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Color} from "../models/Color";

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  private colorUrl = 'https://localhost:44320/api/color';
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  addColor(color: Color): Observable<Color>{
    return this.http.post<Color>(this.colorUrl, color, this.httpOptions);
  }

  getColors(): Observable<Color[]>{
    return this.http.get<Color[]>(this.colorUrl);
  }

  getColorById(id: number): Observable<Color>{
    return this.http.get<Color>(this.colorUrl + '/' + id);
  }

  updateColor(color: Color): Observable<Color>{
    return this.http.put<Color>(this.colorUrl + '/' + color.id, color, this.httpOptions);
  }

  deleteColor(id: number): Observable<Color>{
    return this.http.delete<Color>(this.colorUrl + '/' + id, this.httpOptions);
  }
}
