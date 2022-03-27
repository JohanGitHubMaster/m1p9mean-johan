import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ReadQuotesComponent } from './read-quotes/read-quotes.component';
import { InscriptionClientComponent } from './inscription-client/inscription-client.component';




@NgModule({
  declarations: [
    AppComponent,
    ReadQuotesComponent,
    InscriptionClientComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
