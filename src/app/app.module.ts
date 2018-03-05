import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TranslatorService, UserService } from './_services';
import { routing } from './app.routing';

import { AppComponent } from './app.component';
import {HmComponent} from './_hm';
import {RoomComponent} from './_room';
import {AuthorComponent} from './author/author.component';
import {MapComponent} from './map';
import {HowtoComponent} from './howto';
import {AboutComponent} from './about';
import {EventsComponent} from './events';
import {ContactsComponent} from './contacts';
import {TopNavComponent} from './components/topNav.component' ;

@NgModule({
  declarations: [
    AppComponent,
      MapComponent,
      HowtoComponent,
      AboutComponent,
      EventsComponent,
      ContactsComponent,
      TopNavComponent,
      HmComponent,
      RoomComponent,
      AuthorComponent
  ],
  imports: [
    BrowserModule,
      routing
  ],
  providers: [
      TranslatorService,
      UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
