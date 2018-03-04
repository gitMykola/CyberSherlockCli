import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TranslatorService } from './_services';
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

@NgModule({
  declarations: [
    AppComponent,
      MapComponent,
      HowtoComponent,
      AboutComponent,
      EventsComponent,
      ContactsComponent,
      HmComponent,
      RoomComponent,
      AuthorComponent
  ],
  imports: [
    BrowserModule,
      routing
  ],
  providers: [TranslatorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
