import { Component, ElementRef, ViewChild } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'masterangular';
  onActivate(){ 
    
    var scroll = window.scrollY;
    while(scroll>1)
    {      
        scroll = scroll*0.99;
        window.scroll(0,scroll);
       
    }     
  }   

   delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
deconnecter()
{
  var usersession = (sessionStorage.getItem('user'));
  if(usersession!=null)
  {
    sessionStorage.removeItem('user');
    console.log("deconnection fait");
  }
  console.log("test lien");
}
            
            
}
