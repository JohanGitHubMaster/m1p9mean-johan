import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PlatService } from 'platservice/plat.service';
import { plat } from './plat';

@Component({
  selector: 'app-plat',
  templateUrl: './plat.component.html',
  styleUrls: ['./plat.component.css']
})
export class PlatComponent implements OnInit {
  listplat?:plat[];
  BodyFormPlatAdd:FormGroup;

  listcommand:Array<plat> = [];

  constructor(private platservice:PlatService,
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

  AddPlat(platcommand:plat)
  {
    this.listcommand?.push(platcommand);  
    console.log(typeof(platcommand));
  }

}
