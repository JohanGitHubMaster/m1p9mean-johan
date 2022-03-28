import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { plat } from 'src/app/plat/plat';

@Injectable({
  providedIn: 'root'
})
export class PlatService {
  public baseurl = "https://nodemongotestapp.herokuapp.com/";
  constructor(private httpclient:HttpClient) { }

  public getplat():Observable<any>
  {
    return this.httpclient.get(this.baseurl+"listplats").pipe();
  }
  public insertplat(client:plat):Observable<any>
  {
    return this.httpclient.post(this.baseurl+"insertionplats",client).pipe();
  }

}
