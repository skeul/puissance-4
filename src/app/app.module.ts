import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCardModule, MatCard } from '@angular/material/card';

import { AppComponent } from './app.component';
import { GameTabComponent } from './game-tab/game-tab.component';
import { InfoBarComponent } from './info-bar/info-bar.component';
import { DialogComponent } from './dialog/dialog.component';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

import { PlayerState } from './states/player.state';

@NgModule({
  declarations: [
    AppComponent,
    GameTabComponent,
    InfoBarComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    NgxsModule.forRoot([
      PlayerState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
