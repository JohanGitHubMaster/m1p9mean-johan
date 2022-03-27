import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Quotes } from '../quotes';
import { QuotesService } from '../quotes.service';




@Component({
  selector: 'app-read-quotes',
  templateUrl: './read-quotes.component.html',
  styleUrls: ['./read-quotes.component.css']
})

export class ReadQuotesComponent implements OnInit {
  titre = "bonjour Angular"
  quotes!: Quotes[];
  quote: Quotes = new Quotes();
  
  quoteform:FormGroup;
  

  
  constructor(public formBuilder: FormBuilder,
    private router: Router,
    // private ngZone: NgZone,
    private quoteService: QuotesService) 
    { 
    this.quoteform = this.formBuilder.group({
      name: [''],
      quote: ['']
    })
    }
  
  getquote()
  {
    this.quoteService.getQuotes().subscribe(data=>{
      console.log(data);
      this.quotes = data;
    }, error => console.log(error))
  }

  ngOnInit(): void {
    this.getquote()
  }

  submitForm():any
  {
    this.quoteService.AddQuotes(this.quoteform.value).subscribe(() => {
      console.log('Data added successfully!')

      this.getquote();

    }, (err) => {
      console.log(err);
  });
  }

  delete(id:any, i:any) {
    console.log(id);
    if(window.confirm('Do you want to go ahead?')) {
      this.quoteService.DeleteQuotes(id).subscribe((res) => {
      this.quotes.splice(i, 1);
        // this.getquote();
      })
    }
  }

}
