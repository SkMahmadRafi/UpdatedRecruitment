import  { HttpClient } from '@angular/common/http';
import  { Component, OnDestroy, OnInit } from '@angular/core';
import  { DataFileService } from '../data-file.service';

@Component({
  selector: 'app-view-assessment',
  templateUrl: './view-assessment.component.html',
  styleUrls: ['./view-assessment.component.css']
})
export class ViewAssessmentComponent implements  OnInit,OnDestroy {

  constructor(private dfs : DataFileService , private http: HttpClient) { }

  canData : any   ;
  date : any ;
  assessmentDetails : any ;

  ngOnInit(): void {
    debugger;
    this.canData   = this.dfs.canInfo ;
    this.getQA();

  }

  ngOnDestroy(): void {
      this.dfs.showFiltered = true;
  }

   assessmentInfo : any ;
  
getQA () : void {
   
    let interviewid = this.canData.interviewid;
  this.http.post<any>('http://10.10.20.44:5000/allqa/allQAC' , {interviewid}
    ).subscribe(
      response => {
        this.assessmentInfo = response.result;
        this.date = response.date;
        this.assessmentDetails = response.details;
      console.log(response);
      
        
      }
    );
}

}
