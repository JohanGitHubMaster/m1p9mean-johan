import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClientService } from 'clientservice/client.service';
import { PlatService } from 'platservice/plat.service';
import { livraison } from '../plat/livraison';
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
  userisfind?:AdminEkaly;
  livraisonlist:Array<ListLivraison>=[];
  listalllivraison:Array<livraison>=[];
  displayinscription = false;
  displayconfig = false;
  displaylogin = false;
  livraisonitem!:livraison;
  
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

    var userrestosession = (sessionStorage.getItem('userekaly'));
        if(userrestosession!=null)
        {
          this.displaylogin = false;
          this.displayconfig = true;
          console.log(userrestosession);
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
          console.log(this.userisfind);

          // this.platservice.getlivraison().subscribe(result=>
          //   {
          //     console.log(result);
          //     this.livraisonlist = result;
          //   })


        }

  }

  AddAdminEkaly()
  {
    this.clientservice.insertadminEkaly(this.BodyFormFindAdminEkaly.value).subscribe(result=>
      {
        console.log("inscription fait");
      })
  }

  Onsubmitlogged()
  {
    
    console.log(this.BodyFormFindAdminEkaly.value);
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
          console.log(this.userisfind);

          // this.platservice.getlivraison().subscribe(result=>
          //   {
          //     console.log(result);
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
          console.log("deconnection fait");
        }
  }

  showinscription()
  {
    this.displayinscription = true;
    
  }
  showalllivraison()
  {
    this.platservice.listlivraison().subscribe(result=>
      {
        this.listalllivraison = result;
      });
  }

  showdesclivraison(item:livraison)
  {
    this.livraisonitem = item;
    this.platservice.getlivraison(item).subscribe(result=>
      {
        console.log(result);
        this.livraisonlist = result;
      })
  }

  validationprix()
  {
    this.BodyFormLivraison.patchValue({_id:this.livraisonitem._id});
    console.log(this.BodyFormLivraison.value.prix);
    this.platservice.updatelivraison(this.BodyFormLivraison.value).subscribe(result=>
      {
        console.log("update prix fait");

        this.BodyFormSendMail = this.formBuilder.group
        (
          {
            useremail:'rakotovaojohan516@gmail.com',
            password:'toujourplushaut',
            nomresto: this.userisfind?.nom,
            emailtosend: this.livraisonlist[0].email, 
            nameclient:this.livraisonlist[0].name,
            prix:this.BodyFormLivraison.value.prix,
          }
        )
        console.log(this.BodyFormSendMail.value);
    this.clientservice.sendemail(this.BodyFormSendMail.value).subscribe(result=>
      {
        console.log(result);
      })


      })
      
  }

  ngOnInit(): void {
    this.showalllivraison();
  }

}
