import  { NgModule } from '@angular/core';
import  { BrowserModule } from '@angular/platform-browser';
import  { FormsModule,ReactiveFormsModule  } from '@angular/forms';

import  { MatSliderModule } from '@angular/material/slider';
import  { MatToolbarModule } from '@angular/material/toolbar';
import  { MatInputModule } from '@angular/material/input';
import  { MatCardModule } from '@angular/material/card';
import  { MatMenuModule } from '@angular/material/menu';
import  { MatIconModule } from '@angular/material/icon';
import  { MatButtonModule } from '@angular/material/button';
import  { MatTableModule } from '@angular/material/table';
import  { MatSlideToggleModule } from '@angular/material/slide-toggle';
import  { MatSelectModule } from '@angular/material/select';
import  { MatOptionModule } from '@angular/material/core';
import  {MatFormFieldModule} from '@angular/material/form-field';  
import  { MatTooltipModule } from '@angular/material/tooltip';
import  {MatSidenavModule} from '@angular/material/sidenav';
import  {MatListModule } from '@angular/material/list';
import  { MatTabsModule } from '@angular/material/tabs';
import  {MatDatepickerModule} from '@angular/material/datepicker';
import  {MatDialogModule} from "@angular/material/dialog";
import  { ScrollingModule } from '@angular/cdk/scrolling';
import  {MatGridListModule} from '@angular/material/grid-list'
import  { AngularEditorModule } from '@kolkov/angular-editor';
import  {MatStepperModule} from '@angular/material/stepper';
import  { NgxPaginationModule } from 'ngx-pagination';
import  { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import  { NgChartsModule} from 'ng2-charts';
import  { MatNativeDateModule, MatRippleModule } from '@angular/material/core';

import  { AppRoutingModule } from './app-routing.module';
import  { AppComponent } from './app.component';
import  { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import  { LoginComponent } from './login/login.component';
import  { HeaderComponent } from './header/header.component';
import  { ProfileCreationComponent } from './profile-creation/profile-creation.component';
import  { InterviewerScreenComponent } from './interviewer-screen/interviewer-screen.component';
import  { DashboardComponent } from './dashboard/dashboard.component';
import  { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import  { SidebarContentComponent } from './sidebar-content/sidebar-content.component';
import  { SignInPageComponent } from './sign-in-page/sign-in-page.component';
import  { AssesmentScreenComponent } from './assesment-screen/assesment-screen.component';
import  { EditDataComponent } from './edit-data/edit-data.component';
import  { ScoreComponent } from './score/score.component';

import  * as CanvasJSAngularChart from '../assets/canvasjs.angular.component';
import  { FilterPipe } from './filter.pipe';
import  { AssessmentRecordComponent } from './assessment-record/assessment-record.component';
import  { InterviewInfoComponent } from './interview-info/interview-info.component';
import  { ViewAssessmentComponent } from './view-assessment/view-assessment.component';

import  { MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent, MsalService, MSAL_INSTANCE } from '@azure/msal-angular';
import  { InteractionType, IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
// import  the Azure AD B2C configuration 
import  { msalConfig, protectedResources } from './auth-config';
import  { WebapiComponent } from './webapi/webapi.component';

var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;
export function MSALInstanceFactory():IPublicClientApplication{
  return new PublicClientApplication({
    auth:{
      clientId:'d76f4c48-fcf4-4182-ba25-6b92e5ba3e7f',
      authority: "https://login.microsoftonline.com/a7bae7fa-0df1-4562-a554-16a95f54c8ce",
      redirectUri:'http://localhost:4200/'
    }
  })
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    ProfileCreationComponent,
    InterviewerScreenComponent,
    DashboardComponent,
    SidebarContentComponent,
    SignInPageComponent,
    AssesmentScreenComponent,
    EditDataComponent,
    ScoreComponent, 
    CanvasJSChart, FilterPipe, AssessmentRecordComponent, InterviewInfoComponent, WebapiComponent , ViewAssessmentComponent
  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatMenuModule,
    MatTooltipModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    ScrollingModule,
    MatGridListModule,
    HttpClientModule,
    AngularEditorModule,
    MatStepperModule,
    NgxPaginationModule,
    RichTextEditorAllModule,
    MatDialogModule,
    NgChartsModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,MatRippleModule,
    
  MsalModule,
    
 

    
  ],
  providers: [
    {
      provide: MSAL_INSTANCE,
      useFactory:MSALInstanceFactory
      
    },
    MsalService,
    MsalGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
