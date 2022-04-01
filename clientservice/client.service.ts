import { HttpClient } from '@angular/common/http';
import { Injectable, ViewContainerRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client } from 'src/app/inscription-client/client';
import { adminresto } from 'src/app/restaurant/adminresto';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
 public baseurl = "https://nodemongotestapp.herokuapp.com/";
 public localurl = "http://localhost:3000/";
  constructor(private httpclient:HttpClient) { }
  
  public getclient():Observable<any>
  {
    return this.httpclient.get(this.baseurl+"listclient").pipe();
  }
  public insertclient(client:Client):Observable<any>
  {
    return this.httpclient.post(this.baseurl+"inscriptionclient",client).pipe();
  }

  public findusertoconnect(client:Client):Observable<any>
  {
    return this.httpclient.post(this.baseurl+"finduser",client).pipe();
  }
  
  public finduserrestoAdmintoconnect(restoadmin:adminresto):Observable<any>
  {
    return this.httpclient.post(this.baseurl+"findUserAdminResto",restoadmin).pipe();
  }

  public insertadminresto(restoadmin:adminresto):Observable<any>
  {
    return this.httpclient.post(this.baseurl+"insertadminresto",restoadmin).pipe();
  }
  public getplatofclient(client:Client):Observable<any>
  {
    return this.httpclient.post(this.baseurl+"orderplatandclient",client).pipe();
  }

  public getplatofrestaurant(restoadmin:adminresto):Observable<any>
  {
    return this.httpclient.post(this.baseurl+"listplatsbyorderrestaurant",restoadmin).pipe();
  }

  
}
