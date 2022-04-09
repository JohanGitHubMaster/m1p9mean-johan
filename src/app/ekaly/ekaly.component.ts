import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClientService } from 'clientservice/client.service';
import * as _ from 'lodash';
import { PlatService } from 'platservice/plat.service';
import { livreurekaly } from '../livreur/livreurekaly';
import { livraison } from '../plat/livraison';
import { livraisonresto } from '../plat/livraisonresto';
import { livraisonuser } from '../plat/livraisonuser';
import { AdminEkaly } from './AdminEkaly';
import { ListLivraison } from './ListLivraison';

@Component({
  selector: 'app-ekaly',
  templateUrl: './ekaly.component.html',
  styleUrls: ['./ekaly.component.css']
})
export class EkalyComponent implements OnInit {

  BodyFormFindAdminEkaly:FormGroup;
  BodyFormLivraison:FormGroup;
  BodyFormSendMail:FormGroup;
  BodyFormSearch:FormGroup;
  BodyFormSearchResto:FormGroup;

  userisfind?:AdminEkaly;
  livraisonlist:Array<ListLivraison>=[];
  listalllivraison!:Array<livraisonuser>;
  listallsearchlivraison!:Array<livraisonuser>;
  displayinscription = false;
  displayconfig = false;
  displaylogin = false;
  livraisonitem!:livraison;
  loadingcart = false;
  simplelivraison = new ListLivraison();
  showlivraisonconfig = false;
  prixtotallivraison = 0;
  prixtotalcarburantlivraison = 0;
  prixtotalsearchlivraison = 0;
  listlivraisonresto:Array<livraisonresto>=[];
  showlivraisonbyresto:any;
  prixtotalgainrestaurant = 0;
  
  prixtotalsearchgainrestaurant = 0;
  searchdateorder:any;
  listlivreur!:Array<livreurekaly>;
  livredelivered= new livreurekaly();
  controlsavelivraison = "";
  constructor(private clientservice:ClientService,private formBuilder:FormBuilder,private platservice:PlatService) 
  { 
    
    this.BodyFormFindAdminEkaly = this.formBuilder.group
    (
      {
        nom: [''],
        email:[''],
        numero:[''],
        password: ['']              
      }
    )
    this.BodyFormLivraison = this.formBuilder.group
    (
      {
        _id!:[''],
        prix:[''],
        lieudelivraison:[''],
        datedelivraison:[''],
        heuredelivraison:[''],
        prixcarburant:[''],
        id_livreur:['']

      }
    )

    this.BodyFormSendMail = this.formBuilder.group
    (
      {
        useremail:[''],
            password:[''],
            nomresto: [''],
            emailtosend: [''], 
            nameclient:[''],
            prix:[''],
      }
    )

    this.BodyFormSearch = this.formBuilder.group
    (
      {
        date_de_commande:[''],         
      }
    )

    this.BodyFormSearchResto = this.formBuilder.group
    (
      {
        date_de_commande:[''],         
      }
    )

    var userrestosession = (sessionStorage.getItem('userekaly'));
        if(userrestosession!=null)
        {
          this.displaylogin = false;
          this.displayconfig = true;
          //console.log(userrestosession);
        }
        else
        {
          this.displaylogin = true;
        }
        var userekalysession = (sessionStorage.getItem('userekaly'));
        if(userekalysession!=null)
        {               
          this.userisfind = JSON.parse(userekalysession) as AdminEkaly;
          this.displayconfig = true;
          this.displaylogin = false;
          //console.log(this.userisfind);

          // this.platservice.getlivraison().subscribe(result=>
          //   {
          //     //console.log(result);
          //     this.livraisonlist = result;
          //   })


        }

  }

  AddAdminEkaly()
  {
    this.clientservice.insertadminEkaly(this.BodyFormFindAdminEkaly.value).subscribe(result=>
      {
        //console.log("inscription fait");
      })
  }

  Onsubmitlogged()
  {
    
    //console.log(this.BodyFormFindAdminEkaly.value);
    this.clientservice.finduserAdminEkaly(this.BodyFormFindAdminEkaly.value).subscribe(result=>{
      if(result != null)
      {

        

        sessionStorage.setItem('userekaly', JSON.stringify(result));
        var userekalysession = (sessionStorage.getItem('userekaly'));
        if(userekalysession!=null)
        {               
          this.userisfind = JSON.parse(userekalysession) as AdminEkaly;
          this.displayconfig = true;
          this.displaylogin = false;
          //console.log(this.userisfind);

          // this.platservice.getlivraison().subscribe(result=>
          //   {
          //     //console.log(result);
          //     this.livraisonlist = result;
          //   })


        }
      }      
    }) 
  }

  sedeconnecter()
  {
    this.displayconfig = false;
    this.displaylogin = true;
    var userrestosession = (sessionStorage.getItem('userekaly'));
        if(userrestosession!=null)
        {
          sessionStorage.removeItem('userekaly');
          //console.log("deconnection fait");
        }
  }

  showinscription()
  {
    this.displayinscription = true;
    
  }


  showalllivraison()
  {
    
    this.platservice.getlivraisonuser().subscribe(result=>
      {
        this.listalllivraison = result as livraisonuser[];
        this.listalllivraison = this.listalllivraison.filter((item, i, arr) => arr.findIndex((t) => t.id_livraison=== item.id_livraison) === i);
        this.listallsearchlivraison = this.listalllivraison;
        this.prixtotallivraison = 0;
        this.prixtotalcarburantlivraison = 0;
        this.prixtotalsearchlivraison = 0;
        for(var item of this.listalllivraison)
        {
         this.prixtotallivraison+=1*(item.prix)
         this.prixtotalcarburantlivraison+=1*(item.prixcarburant)
         this.prixtotalsearchlivraison+=1*(item.prix) 
        }
        //console.log(this.listalllivraison);             
      });
  }

  showlivraisonresto()
  {
    this.platservice.getlivraisonresto().subscribe(result=>
      {
        this.listlivraisonresto = result;
        var constantlivraison =new Array<livraisonresto>();
        
        for(var item of this.listlivraisonresto)
        {
          
          item.prixtotalparplat = +item.prixtotalparplat;
          constantlivraison.push(item);         
        }
        let input = constantlivraison,
             res = _(input)
            .groupBy('nom')
            .map((g,nom) => ({nom, prixtotal: (_.sumBy(g, 'prixtotalparplat')*20)/100}))
            .value();
            
            this.showlivraisonbyresto = res; 

            for(var prixtotal of this.showlivraisonbyresto)
            {
              this.prixtotalgainrestaurant += +prixtotal.prixtotal;
              this.prixtotalsearchgainrestaurant +=  +prixtotal.prixtotal;
            }
            //console.log(this.showlivraisonbyresto);
        
        
 



        this.listlivraisonresto = this.listlivraisonresto.filter((item, i, arr) => arr.findIndex((t) => t.id_restaurant=== item.id_restaurant) === i)
      })
  }

  showdesclivraison(el:HTMLElement,item:livraisonuser)
  {
    
    el.scrollIntoView();
    this.loadingcart=true;
    this.livraisonitem = new livraison();
    this.livraisonitem._id = item.id_livraison; 
    this.platservice.getlivraison(this.livraisonitem).subscribe(result=>
      {
        //console.log(result);
        this.livraisonlist = result;
        this.simplelivraison.lieudelivraison = this.livraisonlist[0].lieudelivraison;
        this.simplelivraison.name = this.livraisonlist[0].name;
        this.showlivraisonconfig = true;
        this.loadingcart=false;
      })
  }

  validationprix(el:HTMLElement)
  {
    this.BodyFormLivraison.patchValue({_id:this.livraisonitem._id});
    this.BodyFormLivraison.patchValue({id_livreur:this.livredelivered._id});
    
    //console.log(this.BodyFormLivraison.value.prix);
    //console.log(this.BodyFormLivraison.value.id_livreur);
    //console.log(this.BodyFormLivraison.value._id);

    this.platservice.updatelivreurplat(this.BodyFormLivraison.value).subscribe(result=>
      {
        //console.log("livreur changed");
      })

    this.platservice.updatelivraison(this.BodyFormLivraison.value).subscribe(result=>
      {
        //console.log("update prix fait");

        this.BodyFormSendMail = this.formBuilder.group
        (
          {
            useremail:'ekalyuserprom519@gmail.com',
            password:'xBT5s6xBT5s6',
            nomresto: this.userisfind?.nom,
            emailtosend: this.livraisonlist[0].email, 
            nameclient:this.livraisonlist[0].name,
            prix:this.BodyFormLivraison.value.prix,
          }
        )
        //console.log(this.BodyFormSendMail.value);
    this.clientservice.sendemail(this.BodyFormSendMail.value).subscribe(result=>
      {
        //console.log(result);
      })


      })
      this.showlivraisonconfig = false;
      el.scrollIntoView();
      this.controlsavelivraison = "Modification Livraison fait";
      setTimeout(() => {
        this.controlsavelivraison = "";
      }, 5000);
      
      
  }

  searchbydateclient(el:HTMLElement)
  {
    el.scrollIntoView();
    this.platservice.searchclientorder(this.BodyFormSearch.value).subscribe(result=>
      {
        this.listallsearchlivraison = result as livraisonuser[];
        this.listallsearchlivraison = this.listallsearchlivraison.filter((item, i, arr) => arr.findIndex((t) => t.id_livraison=== item.id_livraison) === i);
        this.prixtotalsearchlivraison = 0;
        this.prixtotalcarburantlivraison = 0;
        for(var item of this.listallsearchlivraison)
        {
          this.prixtotalcarburantlivraison+=1*(item.prixcarburant);
         this.prixtotalsearchlivraison+=1*(item.prix); 
        }     
      });
  }

  searchbydateresto(el:HTMLElement)
  {
    el.scrollIntoView();
    this.platservice.searchrestoorder(this.BodyFormSearchResto.value).subscribe(result=>
      {
        //console.log("miditra recherche resto");
        //console.log(this.BodyFormSearch.value);
        
        this.listlivraisonresto = result;
        var constantlivraison =new Array<livraisonresto>();
        for(var item of this.listlivraisonresto)
        {        
          item.prixtotalparplat = +item.prixtotalparplat;
          constantlivraison.push(item);         
        }
        let input = constantlivraison,
             res = _(input)
            .groupBy('nom')
            .map((g,nom) => ({nom, prixtotal: (_.sumBy(g, 'prixtotalparplat')*20)/100}))
            .value();
            
            this.showlivraisonbyresto = res; 
            this.prixtotalsearchgainrestaurant =0;
            for(var prixtotal of this.showlivraisonbyresto)
            {
              this.prixtotalsearchgainrestaurant += +prixtotal.prixtotal; 
            }
            //console.log(this.showlivraisonbyresto);      
        this.listlivraisonresto = this.listlivraisonresto.filter((item, i, arr) => arr.findIndex((t) => t.id_restaurant=== item.id_restaurant) === i)


      });
  }
  
  getlistlivreur()
  {
    this.clientservice.getlistlivreur().subscribe(result=>{
      
      this.listlivreur = result;
      
    });
    
  }
  
  onChange(item:any)
  {
    this.livredelivered._id =item.target.value;
    //console.log(this.livredelivered._id);
  }
  ngOnInit(): void {
    this.showalllivraison();
    this.showlivraisonresto();
    this.getlistlivreur();
  }

}
