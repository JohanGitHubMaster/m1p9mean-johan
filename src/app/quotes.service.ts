import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Quote } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Quotes } from './quotes';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {

  // public baseurl = "http://localhost:3000/listquotes"
  public baseurl = "https://nodemongotestapp.herokuapp.com/listquotes"
  public baseaddurl = "http://localhost:3000/quotesinsertangular"
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient:HttpClient) { }

  public getQuotes():Observable<any>
  {
    console.log(this.baseurl);
    return this.httpClient.get(this.baseurl);
  }

  public AddQuotes(data:Quotes):Observable<any>
  {
    console.log(this.baseurl);
    return this.httpClient.post(this.baseaddurl,data).pipe();
  }

  public DeleteQuotes(id:any):Observable<any>
  {
    let url = `http://localhost:3000/deletequotes/${id}`;
    console.log(this.baseurl);
    // return this.httpClient.post(this.baseaddurl,id).pipe();
    return this.httpClient.delete(url, { headers: this.httpHeaders}).pipe();
  }
}
