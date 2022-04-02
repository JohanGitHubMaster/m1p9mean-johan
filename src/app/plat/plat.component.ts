import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, Input, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClientService } from 'clientservice/client.service';
import { PlatService } from 'platservice/plat.service';
import { Subject } from 'rxjs';
import { Client } from '../inscription-client/client';
import { InscriptionClientComponent } from '../inscription-client/inscription-client.component';
import { order } from './order';
import { plat } from './plat';

@Component({
  selector: 'app-plat',
  templateUrl: './plat.component.html',
  styleUrls: ['./plat.component.css']
})
export class PlatComponent implements OnInit {
  
  // @Input('app-wheels') inData: any;

  //Bodyformlist
  BodyFormSearchPlat:FormGroup;

  listplat?:plat[];
  buttonplatcommand:string[] = []; 

  BodyFormPlatAdd:FormGroup;
  disabledlinkorder = false;
  listcommand:Array<plat> = [];
  public verification = this.verificationuser();
  userconnect = new Client();

  
  @Input()imgpath = 'https://nodemongotestapp.herokuapp.com/imagesupload/';


  //liste des commandes
  listorder?:order[];
 
  usersession = (sessionStorage.getItem('user'));
  
    @Input() type: string="";
    
  constructor(private _elementRef : ElementRef,private platservice:PlatService,public clientservice:ClientService,
  public formBuilder: FormBuilder) 
  {
    this.BodyFormPlatAdd = this.formBuilder.group
    (
      {            
        nom: [''],
        prix: [''],
        type: [''],
        description: [''],
        noteclient:[''],
        quantite: [''],
        id_restaurant: [''],
        image: ['']
      }
    )

    this.BodyFormSearchPlat = this.formBuilder.group
    (
      {            
        nom: [''],
        prix: [''],
        type: [''],
      }
    )


    this.verification = this.verificationuser();
    this.verificationuser();
    
  }

  getlistplat()
  {
    this.platservice.getplat().subscribe(result=>
      {
        this.listplat = result;

        this.incrementationcommand();
        
      });
      
  }
  ngOnInit(): void {
     this.getlistplat();
    console.log("miditra ngon init");
     
    //  console.log(this.inData);

  
     
  }

  ngOnChanges(){
    // this.verification = exem;
    // this.userconnect = usercon;
    /**********THIS FUNCTION WILL TRIGGER WHEN PARENT COMPONENT UPDATES 'someInput'**************/
    document.location.reload();
    // console.log(this.verification);
    }   

  //   public refresh(){
  //     this.clientservice.setRefresh(true);
  // }
  
  OnsubmitAdd():any
  {
    this.platservice.insertplat(this.BodyFormPlatAdd.value).subscribe(()=>
      {
        console.log("insertion plat fait");       
        this.getlistplat();
      });
  }
 
  
   

  public verificationuser():any
  {
    
    this.usersession = (sessionStorage.getItem('user'));
    console.log(this.usersession);
    if(this.usersession!=null)
    {
      console.log("avant usser session");
      console.log(this.usersession);
      this.userconnect = JSON.parse(this.usersession) as Client;
      return true;
    }
    console.log("miditra verification");
    return false;
  }
  AddPlat($event:any,platcommand:plat)
  {
    
    // this.type = this._elementRef.nativeElement.getAttribute('sendData');
    // console.log('apres '+this.type);
    if(this.verificationuser())
    {
      if($event.target.innerText == "Commander")
      {
        this.disabledlinkorder = true;
        this.listcommand?.push(platcommand);  
        // $event.target.innerText = "Déja Commander";
        $event.target.innerHTML='Déja Commander';
      }
    }
    
  }

  scroll(el: HTMLElement) {
    console.log("miditra ato");
    el.scrollIntoView();

  }

  RemovePlat(key: number) {
    if(this._elementRef.nativeElement.querySelector('#pl_'+key.toString()) != null)
    this._elementRef.nativeElement.querySelector('#pl_'+key.toString()).innerText = "Commander"
    // console.log(this._elementRef.nativeElement.querySelector('#pl_'+key.toString()).innerText);
    
    // console.log(document.getElementById(key.toString())?.innerText);
    
    this.listcommand.forEach((value,index)=>{
         if(value._id==key) this.listcommand.splice(index,1);
        console.log(key);
    });
} 




Insertcommand()
{
  if(this.verificationuser())
  {

  for(let item of this.listcommand)
  {
    let ord = new order();
    ord.id_plat = item._id;
    ord.id_restaurant = item.id_restaurant;
    ord.id_client = this.userconnect._id;
    ord.id_contact = 0;
    ord.id_livraison = 0;
    ord.date_de_commande = new Date();
    ord.quantite = this._elementRef.nativeElement.querySelector('#qu_'+item._id.toString()).value;
    ord.etats ="en cours";
    ord.prixtotalparplat = this._elementRef.nativeElement.querySelector('#prqu_'+item._id.toString()).innerText as number;
     console.log("ty leizy " +ord.prixtotalparplat);
    console.log(this._elementRef.nativeElement.querySelector('#qu_'+item._id.toString()).value);
    console.log(this._elementRef.nativeElement.querySelector('#pr_'+item._id.toString()).innerText);
    this.platservice.insertcommande(ord).subscribe(()=>
    {
      console.log(ord);
    })
  }
}
  // this.listorder?.push()
}

oninput($event:any,key:number)
{
  console.log("miditra evenement oninput");
  this._elementRef.nativeElement.querySelector('#qu_'+key.toString()).value;
  this._elementRef.nativeElement.querySelector('#prqu_'+key.toString()).innerText = (this._elementRef.nativeElement.querySelector('#pr_'+key.toString()).innerText) as number * ($event.target.value) as number;
  console.log($event.target.value);
 console.log($event);
 var total:number = 0;
 for(var item of this.listcommand)
 {
  //  total=total + ((this._elementRef.nativeElement.querySelector('#prqu_'+item._id.toString()).innerText) as number);
  var numb:number = (this._elementRef.nativeElement.querySelector('#prqu_'+item._id.toString()).innerText);
  total +=  numb;
  // console.log(this._elementRef.nativeElement.querySelector('#prqu_'+item._id.toString()).innerText);
 }
 console.log("valeur total");
  console.log(total);
}

searchplatclient()
{
  console.log(this.BodyFormSearchPlat.value);
  this.platservice.searchplatglobal(this.BodyFormSearchPlat.value).subscribe(result=>
    {
      this.listplat = result;
      console.log("valeur an listplat ao anaty recherche dia");
    console.log(this.listplat);
    this.incrementationcommand();
    });
    
    // var plat = this.listcommand.filter(x=>this.listcommand);
    // for(var item of plat)
    // {
      // console.log("ito le izy " +this._elementRef.nativeElement.querySelector('#pl_'+item._id.toString()).innerText);
      //this._elementRef.nativeElement.querySelector('#pl_'+item._id.toString()).innerText = "Miova"
    // }
    // console.log("voici le plat");
    // console.log(plat);
    // if(this.listcommand==)
    
    
}
incrementationcommand()
{
  this.buttonplatcommand = [];
  console.log("miditra incrementation");
  for(var itemplat in this.listplat)
  {
    this.buttonplatcommand?.push("Commander");
    // console.log(this.buttonplatcommand[0]);
  }

  var plat = this.listcommand;
  console.log("liste command:");
  console.log(plat);
  // this.buttonplatcommand = new Array<string>();
  console.log("liste des plat apres recherche");
  console.log(this.listplat)
  for(var item of plat as Array<plat>)
  {
    // console.log(this.listplat?.findIndex(x=>x==item));
    console.log(item);
    var index = this.listplat?.findIndex(x=>x._id==item._id) as number;
    
    if(index!=-1)
    {
      console.log(index);
      this.buttonplatcommand[index]="Déja Commander";
    }
    
  }
}

}
