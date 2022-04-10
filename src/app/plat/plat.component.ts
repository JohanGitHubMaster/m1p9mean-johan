import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, Input, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClientService } from 'clientservice/client.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { PlatService } from 'platservice/plat.service';
import { Client } from '../inscription-client/client';
import { listorderbyclient } from '../inscription-client/listorderbyclient';
import { livraison } from './livraison';
import { livraisonuser } from './livraisonuser';
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
  BodyFormAddLivraison:FormGroup;

  listplat?:plat[];
  buttonplatcommand:string[] = [];

  BodyFormPlatAdd:FormGroup;
  disabledlinkorder = false;
  listcommand:Array<plat> = [];
  public verification = this.verificationuser();
  userconnect = new Client();
  commandsuccess = false;
  displaybuttoncommand = true;
  prixlivraison = 0;
  isprixavalable = false;
  interval:any;
  controldatedelivraison="";
  controllieudelivraison="";
  controlheuredelivraison="";
  simpleclientlivraison = new livraisonuser();
  ListPlatParclient?:listorderbyclient[];
  prixtotalcommande = 0;
  showuser = true;

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
        image: [''],
        quantitevendu:0
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

    this.BodyFormAddLivraison = this.formBuilder.group
    (
      {
        prix!:[''],
        lieudelivraison!:[''],
        datedelivraison!:[''],
        heuredelivraison!:[''],
        prixcarburant!:['']
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
        this.showuser = false;
      });

  }
  ngOnInit(): void {
     this.getlistplat();
    //console.log("miditra ngon init");

    //  //console.log(this.inData);



  }

  ngOnChanges(){

    document.location.reload();

    }

  //   public refresh(){
  //     this.clientservice.setRefresh(true);
  // }

  OnsubmitAdd():any
  {
    //console.log(this.BodyFormPlatAdd.value);
    this.platservice.insertplat(this.BodyFormPlatAdd.value).subscribe(()=>
      {
        //console.log("insertion plat fait");
        this.getlistplat();
      });
  }




  public verificationuser():any
  {

    this.usersession = (sessionStorage.getItem('user'));
    //console.log(this.usersession);
    if(this.usersession!=null)
    {
      //console.log("avant usser session");
      //console.log(this.usersession);
      this.userconnect = JSON.parse(this.usersession) as Client;
      return true;
    }
    //console.log("miditra verification");
    return false;
  }
  AddPlat($event:any,platcommand:plat)
  {

    // this.type = this._elementRef.nativeElement.getAttribute('sendData');
    // //console.log('apres '+this.type);
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
    //console.log("miditra ato");
    el.scrollIntoView();

  }

  RemovePlat(key: number) {
    if(this._elementRef.nativeElement.querySelector('#pl_'+key.toString()) != null)
    this._elementRef.nativeElement.querySelector('#pl_'+key.toString()).innerText = "Commander"
    // //console.log(this._elementRef.nativeElement.querySelector('#pl_'+key.toString()).innerText);

    // //console.log(document.getElementById(key.toString())?.innerText);

    this.listcommand.forEach((value,index)=>{
         if(value._id==key) this.listcommand.splice(index,1);
        //console.log(key);
    });
}




Insertcommand()
{
  if(this.verificationuser())
  {
    //console.log(this.BodyFormAddLivraison.value);
    if(this.BodyFormAddLivraison.value.datedelivraison == '')
    {
      this.controldatedelivraison = "veuillez remplir la date de livraison";
    }
    else
    {
      this.controldatedelivraison = "";
    }
    if(this.BodyFormAddLivraison.value.heuredelivraison == '')
    {
      this.controlheuredelivraison = "veuillez remplir l'heure de livraison";
    }
    else
    {
      this.controlheuredelivraison = "";
    }
    if(this.BodyFormAddLivraison.value.lieudelivraison == '')
    {
      this.controllieudelivraison = "veuillez remplir le lieu de livraison";
    }
    else
    {
      this.controllieudelivraison = "";
    }

    if(this.BodyFormAddLivraison.value.datedelivraison != '' && this.BodyFormAddLivraison.value.heuredelivraison !='' && this.BodyFormAddLivraison.value.lieudelivraison!='')
    {
      this.platservice.insertlivraison(this.BodyFormAddLivraison.value).subscribe(result=>
        {
          //console.log("miditra insertion livraison");
          //console.log(result.insertedId);

          for(let item of this.listcommand)
          {
            let ord = new order();
            ord.id_plat = item._id;
            ord.id_restaurant = item.id_restaurant;
            ord.id_client = this.userconnect._id;
            ord.id_livreur = 0;
            ord.id_livraison = result.insertedId;
            ord.date_de_commande = new Date();
            ord.quantitetotalparplat = this._elementRef.nativeElement.querySelector('#qu_'+item._id.toString()).value;
            ord.etats ="en cours";
            ord.prixtotalparplat = this._elementRef.nativeElement.querySelector('#prqu_'+item._id.toString()).innerText as number;
            //console.log("ty leizy " +ord.id_livraison);
            //console.log(this._elementRef.nativeElement.querySelector('#qu_'+item._id.toString()).value);
            //console.log(this._elementRef.nativeElement.querySelector('#pr_'+item._id.toString()).innerText);
            this.platservice.insertcommande(ord).subscribe(()=>
            {
              //console.log(ord);
            })
            item.quantitevendu = item.quantitevendu - ord.quantitetotalparplat;
            this.platservice.updatequantityplat(item).subscribe(resultat=>{
              //console.log("update quantite fait");
            })
          }
          this.startTimer(result.insertedId);
          this.simpleclientlivraison.id_livraison = result.insertedId;
        });
        //this.verification = false;
        this.commandsuccess = true;
        this.displaybuttoncommand = false;
    }

}
  // this.listorder?.push()
}

oninput($event:any,key:number,item:plat)
{
  ////console.log("miditra evenement oninput");

  // if($event.target.value>item.quantite)
  // {
  //   $event.target.value = item.quantite;
  //   //console.log($event.target.value);
  // }
  //console.log(this._elementRef.nativeElement.querySelector('#qu_'+key.toString()).value);
  if(this._elementRef.nativeElement.querySelector('#qu_'+key.toString()).value>item.quantitevendu)
  {
    this._elementRef.nativeElement.querySelector('#qumax_'+key.toString()).innerHTML = "<br>la valeur maximum autorisé est "+item.quantitevendu;
    //console.log(this._elementRef.nativeElement.querySelector('#qumax_'+key.toString()).innerHTML);
  }
  else
  {
    this._elementRef.nativeElement.querySelector('#qumax_'+key.toString()).innerHTML = "";
  }
  this._elementRef.nativeElement.querySelector('#prqu_'+key.toString()).innerText = (this._elementRef.nativeElement.querySelector('#pr_'+key.toString()).innerText) as number * ($event.target.value) as number;
  ////console.log($event.target.value);
 ////console.log($event);
 var total:number = 0;

 for(var item of this.listcommand)
 {
  var numb:number = (this._elementRef.nativeElement.querySelector('#prqu_'+item._id.toString()).innerText);
  total +=  numb;
 }
 ////console.log("valeur total");
  ////console.log(total);
}

searchplatclient()
{
  //console.log(this.BodyFormSearchPlat.value);
  this.platservice.searchplatglobal(this.BodyFormSearchPlat.value).subscribe(result=>
    {
      this.listplat = result;
      //console.log("valeur an listplat ao anaty recherche dia");
    //console.log(this.listplat);
    this.incrementationcommand();
    });

}
incrementationcommand()
{
  this.buttonplatcommand = [];
  //console.log("miditra incrementation");
  for(var itemplat in this.listplat)
  {
    this.buttonplatcommand?.push("Commander");
    // //console.log(this.buttonplatcommand[0]);
  }

  var plat = this.listcommand;
  //console.log("liste command:");
  //console.log(plat);
  // this.buttonplatcommand = new Array<string>();
  //console.log("liste des plat apres recherche");
  //console.log(this.listplat)
  for(var item of plat as Array<plat>)
  {
    // //console.log(this.listplat?.findIndex(x=>x==item));
    //console.log(item);
    var index = this.listplat?.findIndex(x=>x._id==item._id) as number;

    if(index!=-1)
    {
      //console.log(index);
      this.buttonplatcommand[index]="Déja Commander";
    }

  }
}

newcommand(el:HTMLElement)
{
 el.scrollIntoView();
 this.commandsuccess = false;
 this.displaybuttoncommand = true;
 this.isprixavalable = false;
}


startTimer(id:number) {
  var lv = new livraison();
  lv._id = id;
   this.interval = setInterval(() => {
     this.platservice.findprice(lv).subscribe(result=>
      {
        //console.log(result[0]);
        if(result[0].prix!="")
        {
          this.prixlivraison = result[0].prix;
          this.isprixavalable = true;
          this.showdetails();
          clearInterval(this.interval);
        }
      })

  },2000)
}

showdetails()
  {
    //console.log("miditra detail facture");
    //console.log(this.simpleclientlivraison.id_client);
    this.simpleclientlivraison.id_client = this.userconnect._id;
    this.clientservice.getplatofclient(this.simpleclientlivraison).subscribe(result=>
      {
        //console.log("liste des plat par client effectuer");
        //console.log(result);
        this.prixtotalcommande = 0;
        this.ListPlatParclient = result;
        if(this.ListPlatParclient!=null)
        {
          for(var item of this.ListPlatParclient)
          {
            this.prixtotalcommande+=+item.prixtotalparplat;
          }
        }
        

      })
  }


  public convertToPDF()
    {
      //console.log("miditra");
    html2canvas(this._elementRef.nativeElement.querySelector("#facture")).then(canvas => {
    // Few necessary setting options

    const contentDataURL = canvas.toDataURL('image/png')
    let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
    var width = pdf.internal.pageSize.getWidth();
    var height = canvas.height * width / canvas.width;
    pdf.addImage(contentDataURL, 'PNG', 0, 0, width, height)
    pdf.save('output.pdf'); // Generated PDF
    });
    }

}
