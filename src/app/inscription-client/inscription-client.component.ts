import { Attribute, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ClientService } from 'clientservice/client.service';
import { Client } from './client';
import { listorderbyclient } from './listorderbyclient';

declare let Email: any;


@Component({
  selector: 'app-inscription-client',
  templateUrl: './inscription-client.component.html',
  styleUrls: ['./inscription-client.component.css']
})


export class InscriptionClientComponent implements OnInit {

  listclient?:Client[];
 ListPlatParclient?:listorderbyclient[];
 
  // @Input('app-wheels') inData: any;
  flag = true;

  userfind?:Client;
  usersession = new Client();

  // sendData = this.usersession;

  BodyFormClientAdd:FormGroup;
  BodyFormFindClient:FormGroup;
  BodyFormSendMail:FormGroup;
  display = true;
  displayform  = true;

  //valeur error
  passwordinfo = "";
  userinfo = "";

  //show value
  showcommandbyuser = false;
 
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

          this.BodyFormSendMail = this.formBuilder.group
          (
            {
              useremail:[''],
              password:[''],
              nomresto: [''],
              emailtosend: [''], 
              nameclient:[''],

            }
          )
          
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


  showcommand()
  {
    //  el.scrollIntoView();
    this.showcommandbyuser = true;
    this.clientservice.getplatofclient(this.usersession).subscribe(result=>
      {       
        console.log("liste des plat par client effectuer");
        this.ListPlatParclient = result;
      })
  }

  hiddencommand(el:HTMLElement)
  {
    el.scrollIntoView();
    this.showcommandbyuser = false;
  }

  
  //  client = new SMTPClient({
  //   user: 'user',
  //   password: 'password',
  //   host: 'smtp.gmail.com',
  //   ssl: true,
  // });

  // sendemail()
  // {
  //   this.client.send(
  //     {
  //       text: 'i hope this works',
  //       from: 'johan@gmail.com',
  //       to: 'rakotovaojohan516@gmail.com',
  //       // cc: 'else <else@your-email.com>',
  //       subject: 'testing emailjs',
  //     },
  //     (err, message) => {
  //       console.log(err || message);
  //     }
  //   );
  // }

  

  onSubmit() {
    this.BodyFormSendMail = this.formBuilder.group
    (
      {
        useremail:'rakotovaojohan516@gmail.com',
        password:'toujourplushaut',
        nomresto: this.usersession.name,
        emailtosend: 'rakotovaokaren5@gmail.com', 
        nameclient:this.usersession.name,

      }
    )
    this.clientservice.sendemail(this.BodyFormSendMail.value).subscribe(result=>
      {
        console.log(result);
      })
      
    }
      
    



}
