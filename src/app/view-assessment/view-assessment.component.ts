import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataFileService } from '../data-file.service';

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
    this.canData   = this.dfs.canInfo ;
    this.getQA();

  }

  ngOnDestroy(): void {
      this.dfs.showFiltered = true;
  }

   assessmentInfo : any ;
  
getQA () : void {
   
    let interviewid = this.canData.interviewid;
  this.http.post<any>('http://20.192.1.163:3000/allqa/allQAC' , {interviewid}
    ).subscribe(
      response => {
        this.assessmentInfo = response.result;
        this.date = response.date;
        this.assessmentDetails = response.details;
      
        
      }
    );
}

}
