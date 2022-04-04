import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot } from '@angular/router';

import { AppComponent } from './app.component';
import { ReadQuotesComponent } from './read-quotes/read-quotes.component';
import { InscriptionClientComponent } from './inscription-client/inscription-client.component';
import { PlatComponent } from './plat/plat.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { EkalyComponent } from './ekaly/ekaly.component';




@NgModule({
  declarations: [
    AppComponent,
    ReadQuotesComponent,
    InscriptionClientComponent,
    PlatComponent,
    RestaurantComponent,
    EkalyComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([{
      path: 'test',
      component: RestaurantComponent,
      resolve: {
          url: 'externalUrlRedirectResolver'
      },
      data: {
          externalUrl: 'C:\\M1\\ProjectWebAvance\\ProjetM1\\Test_repo_Git\\servicelastnodemongo\\uploads'
      }
  }]),
  ],
  providers: [
    {
      provide:'externalUrlRedirectResolver',
      useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>
            {
                window.location.href = (route.data as any).externalUrl;
            }
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
