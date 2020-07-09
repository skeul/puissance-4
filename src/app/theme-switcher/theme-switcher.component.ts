import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss']
})
export class ThemeSwitcherComponent implements OnInit {
  // initialisation theme par default
  themeColor = 'light-theme';

  constructor() { }

  ngOnInit() {
    // this.setDefaultTheme();

  }

  // setDefaultTheme(){

  //       // if theme is stored in storage - use it

  //       if(localStorage.getItem('pxTheme')){

  //           //set theme color to one from storage
  //           this.themeColor = localStorage.getItem('pxTheme');

  //           //add that class to body
  //           const body = document.getElementsByTagName('body')[0];
  //           body.classList.add(this.themeColor);
  //       }
  // }

  themeSwitcher() {

    const body = document.getElementsByTagName('body')[0];
    body.classList.remove(this.themeColor);

    // Changement de theme
    (this.themeColor == 'light-theme') ? this.themeColor = 'dark-theme' : this.themeColor = 'light-theme';
    body.classList.add(this.themeColor);

    //save it to local storage

    // localStorage.setItem('pxTheme',this.themeColor);
  }

}