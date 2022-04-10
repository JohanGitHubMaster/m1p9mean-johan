import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ClientService } from 'clientservice/client.service';
import * as _ from 'lodash';
import { PlatService } from 'platservice/plat.service';
import { __values } from 'tslib';
import { plat } from '../plat/plat';
import { adminresto } from './adminresto';
import { joinadminrestoplat } from './joinadminrestoplat';


@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})



export class RestaurantComponent implements OnInit {

  BodyFormFindAdminResto:FormGroup;
  BodyFormFindAddAdmin:FormGroup;
  BodyFormAddPlat:FormGroup;
  BodyFormUpdatePlat:FormGroup;
  BodyFormSearchPlat:FormGroup;

  
  // private urlimage = 'C:\\M1\\ProjectWebAvance\\ProjetM1\\Test_repo_Git\\servicelastnodemongo\\uploads';
  
  @Input()imgpath = 'https://nodemongotestapp.herokuapp.com/imagesupload/';
  imgbase64 = "";
  imguploadbase64:String = "";

  // imgFileName:string = '4T0IP60fyK8QDD_7PloCrg-F.jpg';
  //fileupload
  fileToUpload: File | null = null;
  uploadedFiles:Array <File>=[];
  uploadedUpdateFiles:Array <File>=[];
  formData = new FormData();
  uploadimage:string ="";
  recettetotal:Array<number>=[];
  showplat = false;
  

  fileChange(files:any) {
    this.uploadedFiles = files.target.files;

    const reader = new FileReader();
  reader.readAsDataURL(this.uploadedFiles[0]);
  reader.onload = () => {
    //console.log("ato le valeur base64");
      
      if(reader.result!=null)
      {
        //console.log(reader.result);
        this.imgbase64 = reader.result?.toString();

      }
    }
   
}

fileupdate(files:any) {
  this.uploadedUpdateFiles = files.target.files;

const reader = new FileReader();
reader.readAsDataURL(this.uploadedUpdateFiles[0]);
reader.onload = () => {
  //console.log("ato le valeur base64");
    
    if(reader.result!=null)
    {
      //console.log(reader.result);
      this.imguploadbase64 = reader.result?.toString();
    }
  }
 
}

upload() {
   let formData = new FormData();
  for (var i = 0; i < this.uploadedFiles.length; i++) {
       formData.append("thumbnail", this.uploadedFiles[i]);    
       //console.log(this.uploadedFiles[i].lastModified);
      // //console.log(this.uploadedFiles[i].name);  
      
  } 
     
  

      this.platservice.postFile(formData).subscribe((response) => {
          //console.log('response received is ', response);
          //console.log(formData)
      })
}

  handleFileInput(files: FileList) {

    this.fileToUpload = files.item(0);
    //console.log(this.fileToUpload?.text);
    
    
}



   //attribut
   displayadmin = false;
   displayconfigadmin = false;
   displaylogin = true;
   userrestofind=new adminresto();
   plat:Array<plat> = [];
   descriptionplat = true;
   descoff = false;
   simpleplat = new plat();
   imageuploadname = "";
   ListPlatOrder:Array<joinadminrestoplat> = [];
   Prixtotalplatvendu = 0;
   Prixtotalbenefice = 0;
   prixdepensetotal = 0;
   beneficesalaireekaly = 0;
   showupdate=true;
   showcpmmandbenefice=true;
   adminconnected=true;
   showloaded=true;
   Updatesucces="";
   insertionfait="";
   imagenotchange:String = "";
   initialize=false;

   //control de valeur
   nomplat="";
   typeplat="";
   prixplat="";
   quantiteplat="";
   recetteplat="";
   descriptionplatvalue="";


  // admininscription!:adminresto;

  constructor(public formBuilder: FormBuilder,private platservice:PlatService,private clientservice:ClientService) 
  {
    this.BodyFormFindAdminResto = this.formBuilder.group
          (
            {
              nom: [''],
              password: [''],             
            }
          )
    this.BodyFormFindAddAdmin = this.formBuilder.group
          (
            {
              nom: [''],
              email:[''],
              numero:[''],
              password: ['']              
            }
          )
      
      this.BodyFormAddPlat = this.formBuilder.group
          (
            {
              nom: [''],
              prix: [''],
              type: [''],
              description: [''],
              noteclient:[''],
              quantite: [''],
              recette:[''],
              id_restaurant: [''],
              image: [''],
              quantitevendu:0,             
            }
          )

          this.BodyFormUpdatePlat = this.formBuilder.group
          (
            {
              nom: [''],
              prix: [''],
              type: [''],
              description: [''],
              noteclient:[''],
              quantite: [''],
              recette:[''],
              id_restaurant: [''],
              image: [''],
              imagevide:[''],             
            }
          )

          this.BodyFormSearchPlat = this.formBuilder.group
          (
            {
              nom: [''],
              prix: [''],
              type: [''],
              id_restaurant: ['']                       
            }
          )
          this.isloggedadmin();

          var userrestosession = (sessionStorage.getItem('userresto'));
          if(userrestosession!=null)
            {
              // this.displayadmin = false;
              // this.displaylogin = false;
              this.adminconnected=false;
              this.showloaded=false;
            }
         
  }

 platbyresto()
 {
   this.showplat = true;
  this.platservice.listplatsbyresto(this.userrestofind).subscribe(result=>{ this.plat = result;  this.showloaded=false; this.showplat=false;})
 }

  AddPlat(el:HTMLElement)
  {
    this.showplat = true;
    //ajout du photos
    let formData = new FormData();
    for (var i = 0; i < this.uploadedFiles.length; i++) {
        
        formData.append("thumbnail", this.uploadedFiles[i]);    
        //console.log(this.uploadedFiles[i].lastModified);

    } 
      // this.platservice.postFile(formData).subscribe((response) => {
      //     //console.log('response received is ', response);
      //     //console.log(formData);
      //     this.imageuploadname = response;        
          this.setimage(el);       
      // })
  }

  setimage(el:HTMLElement)
  {
    //console.log("ito "+this.imageuploadname);

    var valueadd = this.BodyFormAddPlat.value;
    //console.log(valueadd);
    if(valueadd.nom=='')this.nomplat="nom du plat obligatoire";
    else this.nomplat='';

    if(valueadd.type=='')this.typeplat="type de plat obligatoire";
    else this.typeplat=''

    if(valueadd.prix=='')this.prixplat="prix du plat obligatoire";
    else this.prixplat=''

    if(valueadd.quantite=='')this.quantiteplat="quantite du plat obligatoire";
    else this.quantiteplat=''

    if(valueadd.recette=='')this.recetteplat="prix de recette du plat obligatoire";
    else this.recetteplat=''
    
    if(valueadd.description=='')this.descriptionplatvalue="description du plat obligatoire";
    else this.descriptionplatvalue=''

    if(valueadd.nom!=''&&valueadd.type!=''&&valueadd.prix!=''&&valueadd.quantite!=''&&valueadd.recette!=''&&valueadd.description!='')
    {
      this.BodyFormAddPlat.patchValue({image:this.imgbase64});
      this.BodyFormAddPlat.patchValue({quantitevendu:valueadd.quantite});

      //console.log(this.imgbase64);
      //console.log(this.BodyFormAddPlat.value);
  
      this.BodyFormAddPlat.patchValue({id_restaurant:this.userrestofind._id});
      //console.log(this.BodyFormAddPlat.value);
      this.platservice.insertplat(this.BodyFormAddPlat.value).subscribe(()=>
      {
        //console.log(this.BodyFormAddPlat.value);   
        //console.log(this.plat);
        this.platbyresto();   
        el.scrollIntoView();   
        this.insertionfait = "plat inseré avec succès"
          setTimeout(() => {
            this.insertionfait = ""
          }, 2000);
      }); 
    }
    

  }

  setimageupdate()
  { 
    //console.log("miditra ato update");
    if(this.BodyFormUpdatePlat.value.imagevide != '')
    {
      this.BodyFormUpdatePlat.patchValue({image:this.imguploadbase64});
      // this.imguploadbase64=this.imagenotchange;  
    }
    
   
    this.BodyFormUpdatePlat.patchValue({_id:this.simpleplat._id});
    //console.log(this.BodyFormUpdatePlat.value);
    this.platservice.updateplatresto(this.BodyFormUpdatePlat.value).subscribe(()=>
    {
      this.platbyresto(); 
    }); 
  }
  

  displayinscription()
  {
    this.displayadmin = true;
  }
  AddAdmin()
  {
    
    //console.log("ajout de l'admin du restaurant");
    this.clientservice.insertadminresto(this.BodyFormFindAddAdmin.value).subscribe(()=>
    {
      //console.log("inscription fait");
      this.displayadmin = false;
    });
  }

  showaddplat(el:HTMLElement)
  {
    el.scrollIntoView();
  }

  platdescription(item:plat)
  {
    //console.log("miditra plat ato");
    this.simpleplat = item;
    this.imagenotchange = item.image;
    //console.log(item.image);
    this.showupdate = true;
    this.BodyFormUpdatePlat = this.formBuilder.group
          (
            {
              _id: item._id,
              nom: item.nom,
              prix: item.prix,
              type: item.type,
              description: item.description,
              noteclient:item.noteclient,
              quantite: item.quantite,
              id_restaurant: item.id_restaurant,
              image: item.image,
              recette:item.recette,
              imagevide:[''],            
            }
          )
    this.descriptionplat = false;
  }

  Onsubmitlogged()
  {
    this.initialize = true;
    this.showloaded=true;
    //console.log("show loaded");
    this.clientservice.finduserrestoAdmintoconnect(this.BodyFormFindAdminResto.value).subscribe(result=>{
      if(result != null)
      {
        this.adminconnected=true;
        sessionStorage.setItem('userresto', JSON.stringify(result));
        var userrestosession = (sessionStorage.getItem('userresto'));
        if(userrestosession!=null)
        {
         
          //console.log(this.showcpmmandbenefice);
          this.userrestofind = JSON.parse(userrestosession) as adminresto;
          //console.log(this.userrestofind);
           this.platbyresto();
           this.getplatofresto();
           this.displayadmin = false;
           this.displayconfigadmin = true;
           this.displaylogin = false;
           this.descriptionplat = true;
           this.showupdate = true;
           this.showcpmmandbenefice = true;
           this.adminconnected=false;
          
           ////console.log("show loaded");
          // this.platservice.listplatsbyresto(this.userrestofind).subscribe(result=>{ this.plat = result;})
        }
      }
      // //console.log(result); 
      
    })
  
    // this.displayadmin = true;  
  }

  isloggedadmin()
  {
    var userrestosession = (sessionStorage.getItem('userresto'));
    if(userrestosession!=null)
      {
        this.initialize = true;
        this.displayadmin = false;
        this.displayconfigadmin = true;
        this.displaylogin = false;

        this.userrestofind = JSON.parse(userrestosession) as adminresto;
         
          this.platbyresto();

      }
  }

  backtoplat()
  {
    this.descriptionplat = true;
  }


  submitupdateplat()
  {

    //ajout du photos
    let formData = new FormData();
    for (var i = 0; i < this.uploadedFiles.length; i++) {
        formData.append("thumbnail", this.uploadedFiles[i]);    
        //console.log(this.uploadedFiles[i].lastModified);
    } 
    this.setimageupdate();
    //console.log(this.BodyFormUpdatePlat.value);
    this.descriptionplat = true;
    this.showupdate = false;
    this.Updatesucces = "plat mis a jour avec succès"
    setTimeout(() => {
      this.Updatesucces = ""
    }, 2000);
    

  }
  deleteplat(item:plat,el:HTMLElement)
  {
    el.scrollIntoView();
    this.showplat = true;
    this.platservice.deleteplatresto(item).subscribe(result=>
      {
        this.platbyresto();
        //console.log("supprimer");
      })
  }
  deconnection()
  {

    this.displayadmin = false;
    this.displayconfigadmin = false;
    this.displaylogin = true;
    this.showupdate = false;
    this.showcpmmandbenefice = false;
    // this.displayadmin = true;
    //     this.displayconfigadmin = false;
    //     this.displaylogin = true;
        this.descriptionplat = false;
        this.descoff =false;
        var userrestosession = (sessionStorage.getItem('userresto'));
        if(userrestosession!=null)
        {
          sessionStorage.removeItem('userresto');
          //console.log("deconnection fait");
        }
  }

  showbenefice(el:HTMLElement)
  {
    el.scrollIntoView();
  }

  searchplat()
  {
    this.BodyFormSearchPlat.patchValue({id_restaurant:this.userrestofind._id});
    //console.log(this.BodyFormSearchPlat.value);
    this.platservice.searchplatresto(this.BodyFormSearchPlat.value).subscribe
    (
      result=>
      {
        this.plat = result;
        //console.log(result);
      }
    )
  }

  getplatofresto()
  {
    this.showloaded = true;
    this.clientservice.getplatofrestaurant(this.userrestofind).subscribe(result=>
      {
        //console.log("miditra result restaurant");
        //console.log(result);
        this.ListPlatOrder = result;
        this.recettetotal = [];
        this.Prixtotalplatvendu = 0;
        this.Prixtotalbenefice = 0;
        var index=0;
        
        var depensetotal =0;
        var prixtotalvendu = 0;
        var benefice = 0;

        var resultatfilter = this.ListPlatOrder.filter((item, i, arr) => arr.findIndex((t) => t.nom=== item.nom) === i)
         
        for(var itemfilter of resultatfilter)
        {
          depensetotal+=itemfilter.quantite*itemfilter.recette;
        }
        for(var itemplat of this.ListPlatOrder)
        {         
          prixtotalvendu+=+itemplat.quantitetotalparplat*itemplat.prix;
        }
        benefice = prixtotalvendu-depensetotal;
        //console.log(depensetotal)
        //console.log(prixtotalvendu)
        //console.log(benefice)
        this.Prixtotalbenefice=benefice;
        this.Prixtotalplatvendu=prixtotalvendu;
        this.prixdepensetotal = depensetotal;
        this.beneficesalaireekaly = (this.Prixtotalbenefice)-((this.Prixtotalbenefice*20)/100);
        for(var item of this.ListPlatOrder)
        {
          if(item.recette!=undefined && item.prixtotalparplat!=undefined)
          {
          this.recettetotal.push(1*((item.prixtotalparplat as number)-(item.recette as number*item.quantitetotalparplat)));

          }
          else
          this.recettetotal.push(0);

          // this.Prixtotalplatvendu += 1*item.prixtotalparplat;
          // this.Prixtotalbenefice += 1*this.recettetotal[index];
          index++;
        }
        this.showloaded=false;
      });
  }

  
  
  ngOnInit(): void {
    // this.platservice.getplat().subscribe(result=>{this.plat = result; //console.log(this.plat)})
    var userrestosession = (sessionStorage.getItem('userresto'));
    if(userrestosession!=null)
    {
       this.getplatofresto();
      // this.platservice.listplatsbyresto(this.userrestofind).subscribe(result=>{ this.plat = result;})
    }
  }

  
  


}
