import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClientService } from 'clientservice/client.service';
import { PlatService } from 'platservice/plat.service';
import { AdminEkaly } from './AdminEkaly';
import { ListLivraison } from './ListLivraison';

@Component({
  selector: 'app-ekaly',
  templateUrl: './ekaly.component.html',
  styleUrls: ['./ekaly.component.css']
})
export class EkalyComponent implements OnInit {

  BodyFormFindAdminEkaly:FormGroup;
  userisfind?:AdminEkaly;
  livraisonlist:Array<ListLivraison>=[];
  displayinscription = false;
  displayconfig = false;
  displaylogin = false;
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

    var userrestosession = (sessionStorage.getItem('userekaly'));
        if(userrestosession!=null)
        {
          this.displaylogin = false;
          this.displayconfig = true;
          console.log(userrestosession);
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

          this.platservice.getlivraison().subscribe(result=>
            {
              console.log(result);
              this.livraisonlist = result;
            })


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

  ngOnInit(): void {
  }

}
