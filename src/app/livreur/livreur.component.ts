import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClientService } from 'clientservice/client.service';
import { livreurekaly } from './livreurekaly';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { PlatService } from 'platservice/plat.service';
import { ListLivraison } from '../ekaly/ListLivraison';

@Component({
  selector: 'app-livreur',
  templateUrl: './livreur.component.html',
  styleUrls: ['./livreur.component.css']
})
export class LivreurComponent implements OnInit {


  displaylogin = true;
  displayinscription = false;
  BodyFormAddlivreur:FormGroup;
  BodyFormFindlivreur:FormGroup;
  livreursession!:livreurekaly;
  displayconfig=false;
  listlivraisonplat!:Array<ListLivraison>;
  listlivraisonplatdone!:Array<ListLivraison>;

  constructor(private clientservice:ClientService,public formBuilder: FormBuilder,public platservice:PlatService) {

    //insert client
    this.BodyFormAddlivreur = this.formBuilder.group
    (
      {
        nom: [''],
        prenom: [''],
        email:[''],
        password:['']
      }
    )
    //find client
    this.BodyFormFindlivreur = this.formBuilder.group
    (
      {
        nom: [''],
        password: [''],             
      }
    )

    this.setvaluesession();
   }

  showinscription()
  {
    this.displayinscription = true;
  }

  insertlivreur()
  {
    this.clientservice.insertlivreurEkaly(this.BodyFormAddlivreur.value).subscribe(result=>{
      console.log("utilisateur inserer");     
      })
  }


  setvaluesession()
  {
    var usersession = (sessionStorage.getItem('userlivreur'));    
          // console.log(PlatComponent.prototype.verification);
          //var v = this.plat?.verificationuser();
        
         if(usersession!=null)
         {
          this.livreursession = JSON.parse(usersession) as livreurekaly
          console.log(JSON.parse(usersession));
          this.displayconfig = true;
          this.displaylogin = false; 
         }
  }

  connectlivreur()
  {
    this.clientservice.findlivreurEkaly(this.BodyFormFindlivreur.value).subscribe(result=>{
      console.log("findlivreurEkaly");

      this.livreursession = result as livreurekaly;
      if(result!=null)
      {
        sessionStorage.setItem('userlivreur', JSON.stringify(this.livreursession));
        this.displayconfig = true;
        this.displaylogin = false;  
        this.showlivraison();   
      }
    })
  }

  deconnection()
  {
    this.displayconfig = false;
    this.displaylogin = true;
    var userlivreursession = (sessionStorage.getItem('userlivreur'));
        if(userlivreursession!=null)
        {
          sessionStorage.removeItem('userlivreur');
          console.log("deconnection fait");
        }

  }

  ngOnInit(): void {
  }


  showlivraison()
  {
    this.platservice.updatedeliveredplat(this.livreursession).subscribe(resultat=>
      {
        this.platservice.updatedeliveredplat(this.livreursession).subscribe(resultat=>
          {
            this.listlivraisonplat=resultat
    
            this.listlivraisonplat=this.listlivraisonplat.filter((item, i, arr) => arr.findIndex((t) => t.id_livraison=== item.id_livraison && t.etats==="traité") === i);
            this.listlivraisonplatdone=this.listlivraisonplat.filter((item, i, arr) => arr.findIndex((t) => t.id_livraison=== item.id_livraison && t.etats==="livré") === i);
            console.log(resultat);
          });
      });
  }

  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];
  
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
     
      
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.listlivraisonplatdone=this.listlivraisonplat;
      this.listlivraisonplat=[];
      console.log("drag fait");
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
