import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { ProfileCreationComponent } from './profile-creation/profile-creation.component';

import {userIdToken} from '../app/header/header.component';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataFileService {

  baseUrl='http://20.192.1.163:3000/uploadFileManager';

  headers = new HttpHeaders({'Authorization':`Bearer ${userIdToken}`});
  arr:any=[];
  Assessments:any=[];
  Search_email:any;
  candidateEmail:any;
  
  constructor(private _http:HttpClient) { }

  Intermediate(data:any)
  {
    this.arr=data;
    console.log(this.arr)
  }
  
  Intermediate1(data:any)
  {
    this.arr=data;
    console.log(this.arr)
  }

  sendData(emailId:any,phone:any,name:any,experience:any,skills:number)
  {
    return this._http.post('http://20.192.1.163:3000/candidateManager/saveData',{
      emailId,
      phone,
      name,
      experience,
      skills
    },{headers:this.headers})

  }

  sendingCandidateDataToServer(
    emailId: any,
    phone: any,
    name: any,
    experience: any,
    skills: number
  ) {
    return this._http.post('http://20.192.1.163:3000/candidateManager/saveData', {
      emailId,
      phone,
      name,
      experience,
      skills,
    },{headers:this.headers});
  }

  GettingDataViaEmailId(emailId: any) {
   
    return this._http.post('http://20.192.1.163:3000/candidateManager/candidateSkill',
      {
        emailId,
      },{headers:this.headers}
    );
  }

  gettingCandidateDatawithCandidateskill(emailId: any) {
    this.candidateEmail=emailId;
    return this._http.post(
      'http://20.192.1.163:3000/candidateManager/candidateSkill',

      {
        emailId,
      },{headers:this.headers}
    );
  }

  gettingDataForScheduler(canId: any) {
    return this._http.post(
      'http://20.192.1.163:3000/candidateManager/displayCandidateSkills',
      {
        canId,
      },{headers:this.headers}
    );
  }

  sendingSchedulingDataToBackend(canId:any,date:any,interviewSkills:any) {
    debugger;
    return this._http.post(
      'http://20.192.1.163:3000/candidateInterviewManager/addInterview',
      {
        canId,
        date,
        interviewSkills
      },{headers:this.headers}
    );
  }

  updateCandidateStatus(data:any){
    return this._http.post('http://20.192.1.163:3000/candidateManager/updateCandidateStatus',
    {
      data
    },{headers:this.headers}
    )
  }
  getAssessments(emailId:any){
    return this._http.post<any>('http://20.192.1.163:3000/candidateManager/candidateSkill',
    {emailId},{headers:this.headers}
  ).subscribe(response=>{
    this.Assessments=response.data;
  })
  }

  ScheduledCandidates(){
    return this._http.post<any>('http://20.192.1.163:3000/InterviewFilterManager',{},{headers:this.headers})
  }



  ScheduledCandidatesFilter(status:any,name:any,emailId:any,startDate:any,endDate:any){
    
    return this._http.post<any>('http://20.192.1.163:3000/InterviewFilterManager',
    {
      status,name,emailId,startDate,endDate
    },{headers:this.headers})
  }




  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/uploadFile`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this._http.request(req);
  }

  getFiles(): Observable<any> {
    return this._http.get(`${this.baseUrl}/files`);
  }
}
