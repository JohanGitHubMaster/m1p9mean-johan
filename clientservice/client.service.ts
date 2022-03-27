import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from 'src/app/inscription-client/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
 public baseurl = "http://localhost:3000/";
  constructor(private httpclient:HttpClient) { }
  
  public getclient():Observable<any>
  {
    return this.httpclient.get(this.baseurl+"listclient").pipe();
  }
  public insertclient(client:Client):Observable<any>
  {
    return this.httpclient.post(this.baseurl+"inscriptionclient",client).pipe();
  }
}
