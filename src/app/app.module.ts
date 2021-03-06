import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

import { AppComponent } from './app.component';
import { GameTabComponent } from './game-tab/game-tab.component';
import { InfoBarComponent } from './info-bar/info-bar.component';
import { DialogComponent } from './dialog/dialog.component';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

import { PlayerState } from './states/player.state';
import { BoxState } from './states/box.state';
import { ThemeSwitcherComponent } from './theme-switcher/theme-switcher.component';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    GameTabComponent,
    InfoBarComponent,
    DialogComponent,
    ThemeSwitcherComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    NgxsModule.forRoot([
      PlayerState,
      BoxState
    ], { developmentMode: !environment.production }),
    NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production }),
    NgxsLoggerPluginModule.forRoot({ disabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
