import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { order } from 'src/app/plat/order';
import { plat } from 'src/app/plat/plat';
import { adminresto } from 'src/app/restaurant/adminresto';

@Injectable({
  providedIn: 'root'
})
export class PlatService {
  public baseurl = "https://nodemongotestapp.herokuapp.com/";
  public localurl = "http://localhost:3000/";
  constructor(private httpclient:HttpClient) { }

  public getplat():Observable<any>
  {
    return this.httpclient.get(this.baseurl+"listplats").pipe();
  }
  public insertplat(client:plat):Observable<any>
  {
    return this.httpclient.post(this.baseurl+"insertionplats",client).pipe();
  }

  public insertcommande(commande:order):Observable<any>
  {
    return this.httpclient.post(this.baseurl+"insertorder",commande).pipe();
  }

  public listplatsbyresto(listeplatresto:adminresto):Observable<any>
  {
    return this.httpclient.post(this.baseurl+"platsbyresto",listeplatresto).pipe();
  }
  
}
