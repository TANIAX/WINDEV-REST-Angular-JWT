import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Client } from './../model/client';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private readonly RootUrl: string = "http://domino-gc/"
  private readonly noAuthreqHeader = new HttpHeaders({ 'No-Auth': 'True' });
  private readonly AuthJSON = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }

  getClientList() {
    return this.http.get(this.RootUrl+"Client",{ headers: this.AuthJSON });
  }
  getClient(param:string){
    return this.http.get(this.RootUrl+"Client/"+param,{ headers: this.AuthJSON });
  }
  addClient(body){
    return this.http.post(this.RootUrl+"Client",body,{ headers: this.AuthJSON });
  }
  editClient(body){
    return this.http.put(this.RootUrl+"Client",body,{ headers : this.AuthJSON });
  }
  deleteClient(param:string){
    return this.http.delete(this.RootUrl+"Client/"+param,{ headers : this.AuthJSON });
  }
}
