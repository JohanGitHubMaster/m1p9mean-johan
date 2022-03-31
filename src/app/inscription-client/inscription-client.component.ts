import { Attribute, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClientService } from 'clientservice/client.service';
import { PlatService } from 'platservice/plat.service';
import { mergeMap, Subject, takeUntil } from 'rxjs';
import { PlatComponent } from '../plat/plat.component';
import { Client } from './client';

@Component({
  selector: 'app-inscription-client',
  templateUrl: './inscription-client.component.html',
  styleUrls: ['./inscription-client.component.css']
})


export class InscriptionClientComponent implements OnInit {
  listclient?:Client[];

 
  // @Input('app-wheels') inData: any;
  flag = true;

  userfind?:Client;
  usersession = new Client();

  // sendData = this.usersession;

  BodyFormClientAdd:FormGroup;
  BodyFormFindClient:FormGroup;
  display = true;
  displayform  = true;

  //valeur error
  passwordinfo = "";
  userinfo = "";

 
 
  
  resetFormSubject: Subject<boolean> = new Subject<boolean>();


    private destroySubject = new Subject();

  constructor(public clientservice:ClientService,
              public formBuilder: FormBuilder) 
        { 
          
          //insert client
          this.BodyFormClientAdd = this.formBuilder.group
          (
            {
              name: [''],
              lastname: [''],
              email:[''],
              password:['']
            }
          )
          //find client
          this.BodyFormFindClient = this.formBuilder.group
          (
            {
              name: [''],
              password: [''],             
            }
          )

          //dispaly false si session existe
          if(sessionStorage.getItem('user')!=null)
          {
            this.display = false;
            this.displayform = false;
            this.setvaluesession();
          }
          
        }
  



  getclient()
  {
    this.clientservice.getclient().subscribe(result=>
      {
         this.listclient = result;
      });
  }

  getfinduser()
  {

  }
  

  ngOnInit(): void {
    this.getclient();   
  }

  ngOnDestroy() {
    // this.destroySubject.next();
    this.destroySubject.complete();
  }

  login():any
  {
    this.clientservice.findusertoconnect(this.BodyFormFindClient.value).subscribe(result=>
      {
        this.userfind = result;
        console.log(result);
        //action apres
        if(result==null)
        {
          this.passwordinfo="le mot de passe est incorrect";
          this.userinfo="le nom d'utilisateur est incorrect";
        }
        else
        {        
          this.passwordinfo="";
          this.userinfo="";
          this.displayform = false;
          this.display = false;
          // console.log(this.plat?.verificationuser());    
          sessionStorage.setItem('user', JSON.stringify(this.userfind));
          var usersession = (sessionStorage.getItem('user'));  
          
          // console.log(PlatComponent.prototype.verification);
          //var v = this.plat?.verificationuser();
          
          
         if(usersession!=null)
         {          
          this.flag = false;
          this.usersession = JSON.parse(usersession) as Client
          console.log(JSON.parse(usersession));
         }
         
        }
      })
  }

  setvaluesession()
  {
    var usersession = (sessionStorage.getItem('user'));    
          // console.log(PlatComponent.prototype.verification);
          //var v = this.plat?.verificationuser();
        
         if(usersession!=null)
         {
          this.usersession = JSON.parse(usersession) as Client
          console.log(JSON.parse(usersession));
         }
  }
  OnsubmitAdd():any
  {
    this.clientservice.insertclient(this.BodyFormClientAdd.value).subscribe(()=>
      {
        console.log("inscription fait");
        this.display=false;
        this.getclient();
      })
  }
}
