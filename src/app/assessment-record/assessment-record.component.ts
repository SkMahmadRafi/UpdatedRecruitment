import  { Component, OnInit } from '@angular/core';
import  { HttpClient, HttpHeaders } from '@angular/common/http';
import  { DataFileService } from '../data-file.service';
import  {userIdToken} from '../../app/header/header.component'

@Component({
  selector: 'app-assessment-record',
  templateUrl: './assessment-record.component.html',
  styleUrls: ['./assessment-record.component.css']
})
export class AssessmentRecordComponent implements OnInit {

  headers = new HttpHeaders({'Authorization':`Bearer ${userIdToken}`});

  //  arr:any = [{date:'14/11/2022',assessmentstatus:'open'},{date:'15/11/2022',assessmentstatus:'closed'},
  // {date:'14/11/2022',assessmentstatus:'open'},{date:'15/11/2022',assessmentstatus:'closed'}];
  arr:any = [];
  val:any = [];
  
    getinfo(emailId:any){
      this.httpClient.post<any>('http://localhost:5000/candidateManager/candidateSkill',
      {emailId},{headers:this.headers}
    ).subscribe(
    response=>{
      console.log(response);
      this.arr=response.data;
      console.log(this.arr.assessmentsStatus)
      console.log(this.arr);
      this.val=this.arr[0].assessments;
      console.log(this.val)
      });
    }
constructor(private httpClient:HttpClient,private dfs:DataFileService) { }
// emailId:any = this.dfs.Search_email;
emailId:any="vishwas261999@gmail.com";
ngOnInit(): void {
 debugger;
 this.getinfo(this.emailId)
 this.emailId=this.dfs.candidateEmail;
 console.log(this.emailId);
}

}
