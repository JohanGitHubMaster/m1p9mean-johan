import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PlatService } from 'platservice/plat.service';
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
  
  listplat?:plat[];
  BodyFormPlatAdd:FormGroup;
  disabledlinkorder = false;
  listcommand:Array<plat> = [];
  public verification = this.verificationuser();
  userconnect = new Client();


  //liste des commandes
  listorder?:order[];
 
  usersession = (sessionStorage.getItem('user'));

  constructor(private _elementRef : ElementRef,private platservice:PlatService,
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
    this.verification = this.verificationuser();
    this.verificationuser();
  }

  getlistplat()
  {
    this.platservice.getplat().subscribe(result=>
      {
        this.listplat = result;
      });
  }
  ngOnInit(): void {
     this.getlistplat();
  }

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
      console.log(this.usersession)
      this.userconnect = JSON.parse(this.usersession) as Client;
      return true;
    }
    console.log("miditra verification");
    return false;
  }
  AddPlat($event:any,platcommand:plat)
  {
    if(this.verificationuser())
    {
      if($event.target.innerText != "Déja Commander")
      {
        this.disabledlinkorder = true;
        this.listcommand?.push(platcommand);  
        $event.target.innerText = "Déja Commander";
      }
    }
    
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  RemovePlat(key: number) {
    this._elementRef.nativeElement.querySelector('#pl_'+key.toString()).innerText = "Commander"
    console.log(this._elementRef.nativeElement.querySelector('#pl_'+key.toString()).innerText);
    
    console.log(document.getElementById(key.toString())?.innerText);
    
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
    ord.prixtotalparplat = item.prix;  
    // console.log(ord);
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

}
