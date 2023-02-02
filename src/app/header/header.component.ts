import { HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';
import {getToken} from '../../app/fetch'
import { DataFileService } from '../data-file.service';




export let msal:MsalService;
export let userIdToken:any

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

 
  

  constructor(private msalService:MsalService , private dataService : DataFileService) { 
    msal = this.msalService
  }

  ngOnInit(): void {
   
    this.msalService.instance.handleRedirectPromise().then(
      async res=>{
        if(res != null && res.account != null){
          this.msalService.instance.setActiveAccount(res.account)
          userIdToken = await getToken(['User.Read'])
        }
      }
    )
  }
  public positionOptions: TooltipPosition[] = ['left']; // Tooltip postion
  // tslint:disable-next-line:typedef
  public position = new FormControl(this.positionOptions[0]);

  isLoggedIn():boolean{
    return this.msalService.instance.getActiveAccount()!=null
    
    
  }

  login(){
    debugger
  this.msalService.loginRedirect();
    // this.msalService.loginPopup().subscribe((response:AuthenticationResult)=>{
    //   this.msalService.instance.setActiveAccount(response.account)
      
    // })
  }

  logout(){
    // debugger
    // console.log('inside logout')
    // this.msalService.logout();
    // console.log('inside logout2')
    this.msalService.logoutRedirect({
      postLogoutRedirectUri: 'http://localhost:4200/'
    });
  }

  newProfile () : void {
  
    this.dataService.newProfile();
   }

}
