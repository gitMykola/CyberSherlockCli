import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
    InfoMonitor,
    MediaService,
    PeopleService,
    ResizeService,
    TaskService,
    TranslatorService,
    UserService
} from './_services';
import { routing } from './app.routing';

import { AppComponent } from './app.component';
import {HmComponent} from './_hm';
import {RoomComponent} from './_room';
import {AuthorComponent} from './author/author.component';
import {MapGoogleComponent, MapYandexComponent} from './map';
import {HowtoComponent} from './howto';
import {AboutComponent} from './about';
import {EventsComponent} from './events';
import {ContactsComponent} from './contacts';
import {
    DashBoardComponent,
    InfoComponent,
    LastInfoComponent,
    LoginComponent,
    TopNavComponent
} from './components' ;
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    AgmCoreModule,
    GoogleMapsAPIWrapper,
    MarkerManager
} from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
      MapYandexComponent,
      MapGoogleComponent,
      HowtoComponent,
      AboutComponent,
      EventsComponent,
      ContactsComponent,
      TopNavComponent,
      InfoComponent,
      LastInfoComponent,
      LoginComponent,
      HmComponent,
      RoomComponent,
      AuthorComponent,
      DashBoardComponent
  ],
  imports: [
    BrowserModule,
      BrowserAnimationsModule,
      routing,
      AgmCoreModule.forRoot({
        apiKey: 'AIzaSyAGoK2EXOHJsdq4yb7Hsz-_pKrZVEGmAh4'
      })
  ],
  providers: [
      TranslatorService,
      UserService,
      InfoMonitor,
      ResizeService,
      TaskService,
      MediaService,
      PeopleService,
      MarkerManager,
      GoogleMapsAPIWrapper
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
