import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { EditDataComponent } from './edit-data/edit-data.component';
import { InterviewInfoComponent } from './interview-info/interview-info.component';
import { InterviewerScreenComponent } from './interviewer-screen/interviewer-screen.component';
import { ProfileCreationComponent } from './profile-creation/profile-creation.component';
import { ScoreComponent } from './score/score.component';
import { SidebarContentComponent } from './sidebar-content/sidebar-content.component';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';
import { MsalGuard } from '@azure/msal-angular';
import { WebapiComponent } from './webapi/webapi.component';
import { HeaderComponent } from './header/header.component';
import { MaslGuard } from './masl.guard';
import { AssesmentScreenComponent } from './assesment-screen/assesment-screen.component';

const routes: Routes = [
   {path:'',component:DashboardComponent,},
   {path:'header',component:HeaderComponent},
  {path:'profile',component:ProfileCreationComponent},
  // {path:'QASection',component:SidebarContentComponent,canActivate:[MaslGuard]},
  {path:'QASection',component:SidebarContentComponent},
  {path:'sign',component:SignInPageComponent,},
  {path:'Assessment',component:InterviewerScreenComponent},

  {path:'Candidate-Info',component:AssesmentScreenComponent},
  {path:'app',component:AppComponent},
  {path:'barchart',component:ScoreComponent,canActivate:[MaslGuard]},
  {path:'addqa',component:EditDataComponent},
  {path:'interview-info',component:InterviewInfoComponent},
  // {path:'**',component:DashboardComponent},
  
  
  {
    path: 'webapi',
    component: WebapiComponent,
    // The profile component is protected with MSAL Guard.
    // canActivate: [MsalGuard]
  },


];

@NgModule({
  // imports: [RouterModule.forRoot(routes)],
  imports: [RouterModule.forRoot(routes, {
    initialNavigation:'enabledBlocking'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
