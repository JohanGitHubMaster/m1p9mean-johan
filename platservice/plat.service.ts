import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListLivraison } from 'src/app/ekaly/ListLivraison';
import { livraison } from 'src/app/plat/livraison';
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

  public updateplatresto(platresto:plat):Observable<any>
  {
    return this.httpclient.post(this.baseurl+"updateplat",platresto).pipe();
  }

  public deleteplatresto(platresto:plat):Observable<any>
  {
    return this.httpclient.post(this.baseurl+"deleteplat",platresto).pipe();
  }

  public searchplatresto(platresto:plat):Observable<any>
  {
    return this.httpclient.post(this.baseurl+"searchplat",platresto).pipe();
  }
  
  public searchplatglobal(platresto:plat):Observable<any>
  {
    return this.httpclient.post(this.baseurl+"searchplatglobal",platresto).pipe();
  }
  
  public postFile(fileToUpload:FormData):Observable<any> {
   
    return this.httpclient.post(this.baseurl+'api/upload',fileToUpload).pipe();
}
public convertimage(fileToUpload:any):Observable<any> { 
  return this.httpclient.post(this.baseurl+'convertimage',fileToUpload).pipe();
}

public insertlivraison(getlivraison:livraison):Observable<any>
  {
    return this.httpclient.post(this.baseurl+"livraison",getlivraison).pipe();
  }

  public getlivraison(objectlivraison:livraison):Observable<any>
  {
    return this.httpclient.post(this.baseurl+"listplatlivraison",objectlivraison).pipe();
  }
  public listlivraison():Observable<any>
  {
    return this.httpclient.get(this.baseurl+"listlivraison").pipe();
  }

  public updatelivraison(objectlivraison:livraison):Observable<any>
  {
    return this.httpclient.post(this.baseurl+"updateprixlivraison",objectlivraison).pipe();
  }

  public findprice(objectlivraison:livraison):Observable<any>
  {
    return this.httpclient.post(this.baseurl+"findpricelivraison",objectlivraison).pipe();
  }


  

}
