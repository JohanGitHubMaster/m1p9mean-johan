import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminEkaly } from 'src/app/ekaly/AdminEkaly';
import { Client } from 'src/app/inscription-client/client';
import { livreurekaly } from 'src/app/livreur/livreurekaly';
import { livraisonuser } from 'src/app/plat/livraisonuser';
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
  public getplatofclient(cliente:livraisonuser):Observable<any>
  {
    return this.httpclient.post(this.baseurl+"orderplatandclient",cliente).pipe();
  }

  public getplatofrestaurant(restoadmin:adminresto):Observable<any>
  {
    return this.httpclient.post(this.baseurl+"listplatsbyorderrestaurant",restoadmin).pipe();
  }

  public sendemail(getlivraison:any):Observable<any>
  {
    return this.httpclient.post(this.baseurl+"sendmail",getlivraison).pipe();
  }

  public insertadminEkaly(ekalyadmin:AdminEkaly):Observable<any>
  {
    return this.httpclient.post(this.baseurl+"insertadminEkaly",ekalyadmin).pipe();
  }
  
  public finduserAdminEkaly(ekalyadmin:AdminEkaly):Observable<any>
  {
    return this.httpclient.post(this.baseurl+"findadminekaly",ekalyadmin).pipe();
  }

  public insertlivreurEkaly(ekalylivreur:livreurekaly):Observable<any>
  {
    return this.httpclient.post(this.baseurl+"insertlivreur",ekalylivreur).pipe();
  }
  
  public findlivreurEkaly(ekalylivreur:livreurekaly):Observable<any>
  {
    return this.httpclient.post(this.baseurl+"findlivreur",ekalylivreur).pipe();
  }

  public getlistlivreur():Observable<any>
  {
    return this.httpclient.get(this.baseurl+"listlivreur").pipe();
  }
  
  
}
