import { Component, Inject, OnInit } from '@angular/core';
import {userIdToken} from '../../app/header/header.component';
import { DataFileService } from '../data-file.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  loginDisplay = false;
  pending:any;
  completed:any;
  total:any;
  
  
  constructor(private dfs:DataFileService) { }

  ngOnInit(): void {
    debugger
    this.pendingInterviewCount();
    this.ConpletedInterviewCount();

  }

  pendingInterviewCount(){
    this.dfs.ScheduledCandidates().subscribe(
      response=>{
        this.pending=response.result.length;
        console.log(response)
        console.log(this.pending)
      }
    )
  }

  ConpletedInterviewCount(){
    let status:any='closed',
    name:any,emailId:any,startDate:any,endDate:any;

    this.dfs.ScheduledCandidatesFilter(status,name,emailId,startDate,endDate).subscribe(
      response=>{
        this.completed=response.result.length;
        console.log(this.completed)
        this.total=this.pending+this.completed;
        console.log(this.total)
      }
    )
  }

  
}