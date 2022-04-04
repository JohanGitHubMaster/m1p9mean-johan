import { Component, ElementRef, ViewChild } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'masterangular';
  displayrestaurant = false;
  displayinscription = true;
  displayekaly = false;
  // sendData = {
  //   name: "this.usersession.name",
  //   };

  onActivate(){ 
    var scroll = window.scrollY;
    while(scroll>1)
    {      
        scroll = scroll*0.99;
        window.scroll(0,scroll);
        
    }     
  }   
  usertemplate()
  {
    this.displayrestaurant = false;
    this.displayinscription = true;
    this.displayekaly = false;
  }
  showrestaurant()
  {
    this.displayrestaurant = true;
    this.displayinscription = false;
    this.displayekaly = false;
  }

  showekaly()
  {
    this.displayrestaurant = false;
    this.displayinscription = false;
    this.displayekaly = true;
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
