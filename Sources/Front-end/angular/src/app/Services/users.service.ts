import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly RootUrl: string = "http://domino-gc/"
  private readonly noAuthreqHeader = new HttpHeaders({ 'No-Auth': 'True' });
  private readonly AuthJSON = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }

  userAuthentication(body) {
    return this.http.post(this.RootUrl + 'Token', body, { headers: this.noAuthreqHeader});
  }
  userCheckTokenValidity(){
    return this.http.get(this.RootUrl + 'Token', { headers: this.AuthJSON});
  }
}
