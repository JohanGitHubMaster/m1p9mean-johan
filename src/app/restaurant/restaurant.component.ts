import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClientService } from 'clientservice/client.service';
import { PlatService } from 'platservice/plat.service';
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
  // imgFileName:string = '4T0IP60fyK8QDD_7PloCrg-F.jpg';
  //fileupload
  fileToUpload: File | null = null;
  uploadedFiles:Array <File>=[];
  formData = new FormData();
  fileChange(files:any) {
    this.uploadedFiles = files.target.files;
}

upload() {
   let formData = new FormData();
  for (var i = 0; i < this.uploadedFiles.length; i++) {
       formData.append("thumbnail", this.uploadedFiles[i]);    
       console.log(this.uploadedFiles[i].lastModified);
      // console.log(this.uploadedFiles[i].name);  
  } 
      this.platservice.postFile(formData).subscribe((response) => {
          console.log('response received is ', response);
          console.log(formData)
      })
}

  handleFileInput(files: FileList) {

    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload?.text);
    
    
}

// uploadessai()
// {
//   if(this.fileToUpload!=null)
//   this.platservice.postFile(this.fileToUpload).subscribe(result=>
//     {
//       console.log("succes");
//     })
// }

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

  // admininscription!:adminresto;

  constructor(private http: HttpClient,public formBuilder: FormBuilder,private platservice:PlatService,private clientservice:ClientService) 
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
              id_restaurant: [''],
              image: ['']             
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
              id_restaurant: ['']                       
            }
          )

          this.isloggedadmin();
         
  }

 platbyresto()
 {
  this.platservice.listplatsbyresto(this.userrestofind).subscribe(result=>{ this.plat = result;})
 }

  AddPlat()
  {
    //ajout du photos
    let formData = new FormData();
    
    for (var i = 0; i < this.uploadedFiles.length; i++) {
        formData.append("thumbnail", this.uploadedFiles[i]);    
        console.log(this.uploadedFiles[i].lastModified);
  
    } 
      this.platservice.postFile(formData).subscribe((response) => {
          console.log('response received is ', response);
          console.log(formData);
          this.imageuploadname = response;        
          this.setimage();
      })
    
    // this.BodyFormAddPlat.patchValue({id_restaurant:this.userrestofind._id});
    // console.log(this.BodyFormAddPlat.value);
    // this.platservice.insertplat(this.BodyFormAddPlat.value).subscribe(()=>
    // {
    //   console.log(this.BodyFormAddPlat.value);   
    //   console.log(this.plat);
    //   this.platbyresto(); 
    // }); 
  }

  setimage()
  {
    
    console.log("ito "+this.imageuploadname);
    this.BodyFormAddPlat.patchValue({image:this.imageuploadname});
    console.log(this.BodyFormAddPlat.value);

    this.BodyFormAddPlat.patchValue({id_restaurant:this.userrestofind._id});
    console.log(this.BodyFormAddPlat.value);
    this.platservice.insertplat(this.BodyFormAddPlat.value).subscribe(()=>
    {
      console.log(this.BodyFormAddPlat.value);   
      console.log(this.plat);
      this.platbyresto(); 
    }); 
  }

  setimageupdate()
  { 
    this.BodyFormUpdatePlat.patchValue({image:this.imageuploadname});
    this.BodyFormUpdatePlat.patchValue({_id:this.simpleplat._id});
    console.log(this.BodyFormUpdatePlat.value);
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
    
    console.log("ajout de l'admin du restaurant");
    this.clientservice.insertadminresto(this.BodyFormFindAddAdmin.value).subscribe(()=>
    {
      console.log("inscription fait");
      this.displayadmin = false;
    });
  }

  platdescription(item:plat)
  {
    console.log("miditra plat ato");
    this.simpleplat = item;
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
              image: item.image             
            }
          )
    this.descriptionplat = false;
  }

  Onsubmitlogged()
  {
    
    
    this.clientservice.finduserrestoAdmintoconnect(this.BodyFormFindAdminResto.value).subscribe(result=>{
      if(result != null)
      {

        this.displayadmin = false;
        this.displayconfigadmin = true;
        this.displaylogin = false;

        sessionStorage.setItem('userresto', JSON.stringify(result));
        var userrestosession = (sessionStorage.getItem('userresto'));
        if(userrestosession!=null)
        {
          this.userrestofind = JSON.parse(userrestosession) as adminresto;
          console.log(this.userrestofind);
           this.platbyresto();
           this.getplatofresto();
          // this.platservice.listplatsbyresto(this.userrestofind).subscribe(result=>{ this.plat = result;})
        }
      }
      // console.log(result); 
        
    })
    // this.displayadmin = true;  
  }

  isloggedadmin()
  {
    var userrestosession = (sessionStorage.getItem('userresto'));
    if(userrestosession!=null)
      {
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
        console.log(this.uploadedFiles[i].lastModified);
  
    } 
      this.platservice.postFile(formData).subscribe((response) => {
          console.log('response received is ', response);
          console.log(formData);
          this.imageuploadname = response;        
          this.setimageupdate();
      })     
    // this.BodyFormUpdatePlat.patchValue({_id:this.simpleplat._id});
    console.log(this.BodyFormUpdatePlat.value);
    // this.platservice.updateplatresto(this.BodyFormUpdatePlat.value).subscribe(result=>
    //   {
    //     this.backtoplat();
    //     this.platbyresto();
    //     console.log(result);
    //   })
  }
  deleteplat(item:plat)
  {
    this.platservice.deleteplatresto(item).subscribe(result=>
      {
        this.platbyresto();
        console.log("supprimer");
      })
  }
  deconnection()
  {
    this.displayadmin = true;
        this.displayconfigadmin = false;
        this.displaylogin = true;
        this.descriptionplat = false;
        this.descoff =false;
        var userrestosession = (sessionStorage.getItem('userresto'));
        if(userrestosession!=null)
        {
          sessionStorage.removeItem('userresto');
          console.log("deconnection fait");
        }
  }

  searchplat()
  {
    this.BodyFormSearchPlat.patchValue({id_restaurant:this.userrestofind._id});
    console.log(this.BodyFormSearchPlat.value);
    this.platservice.searchplatresto(this.BodyFormSearchPlat.value).subscribe
    (
      result=>
      {
        this.plat = result;
        console.log(result);
      }
    )
  }

  getplatofresto()
  {
    this.clientservice.getplatofrestaurant(this.userrestofind).subscribe(result=>
      {
        console.log(result);
        this.ListPlatOrder = result;
      });
  }

  ngOnInit(): void {
    // this.platservice.getplat().subscribe(result=>{this.plat = result; console.log(this.plat)})
   
  }

  
}
