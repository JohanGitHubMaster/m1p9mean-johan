import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClientService } from 'clientservice/client.service';
import { Client } from './client';

@Component({
  selector: 'app-inscription-client',
  templateUrl: './inscription-client.component.html',
  styleUrls: ['./inscription-client.component.css']
})
export class InscriptionClientComponent implements OnInit {
  listclient?:Client[];
  BodyFormClientAdd:FormGroup;
  display = true;
  constructor(private clientservice:ClientService,
              public formBuilder: FormBuilder) 
        { 
          this.BodyFormClientAdd = this.formBuilder.group
          (
            {
              name: [''],
              lastname: [''],
              email:[''],
              password:['']
            }
          )
        }

  getclient()
  {
    this.clientservice.getclient().subscribe(result=>
      {
         this.listclient = result;
      });
  }
  ngOnInit(): void {
    this.getclient();
  }

  OnsubmitAdd():any
  {
    this.clientservice.insertclient(this.BodyFormClientAdd.value).subscribe(()=>
      {
        console.log("inscription fait");
        this.display=false;
        this.getclient();
      })
  }
}
