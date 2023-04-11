import  { Component, OnInit } from '@angular/core';
import  { HttpClient, HttpHeaders } from '@angular/common/http';
import  { Router } from '@angular/router';
import {FormBuilder} from '@angular/forms';
import  { DataFileService } from '../data-file.service';
import  { Pipe,PipeTransform } from '@angular/core';
import  {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import  { EditDataComponent } from '../edit-data/edit-data.component';
import  { ScoreComponent } from '../score/score.component';
import  {userIdToken} from '../../app/header/header.component';

import  { style } from '@angular/animations';
// import  { baseColors, Label } from 'ng2-charts';



@Component({
  selector: 'app-assesment-screen',
  templateUrl: './assesment-screen.component.html',
  styleUrls: ['./assesment-screen.component.css']
})
export class AssesmentScreenComponent implements OnInit {

//   hardcode:any=[{canName:'abhi',EmailId:'abhi@gmail.com',canPhone:9876543212,Candidatestatus:'Open'},
//   {canName:'abhi',EmailId:'abhi@gmail.com',canPhone:9876543212,Candidatestatus:'Open'},
//   {canName:'abhi',EmailId:'abhi@gmail.com',canPhone:9876543212,Candidatestatus:'Open'},
//   {canName:'abhi',EmailId:'abhi@gmail.com',canPhone:9876543212,Candidatestatus:'Open'},
//   {canName:'abhi',EmailId:'abhi@gmail.com',canPhone:9876543212,Candidatestatus:'Open'},
//   {canName:'abhi',EmailId:'abhi@gmail.com',canPhone:9876543212,Candidatestatus:'Open'},
//   {canName:'abhi',EmailId:'abhi@gmail.com',canPhone:9876543212,Candidatestatus:'Open'},
//   {canName:'abhi',EmailId:'abhi@gmail.com',canPhone:9876543212,Candidatestatus:'Open'},
//   {canName:'abhi',EmailId:'abhi@gmail.com',canPhone:9876543212,Candidatestatus:'Open'},
//   {canName:'abhi',EmailId:'abhi@gmail.com',canPhone:9876543212,Candidatestatus:'Open'},
//   {canName:'abhi',EmailId:'abhi@gmail.com',canPhone:9876543212,Candidatestatus:'Open'},
//   {canName:'abhi',EmailId:'abhi@gmail.com',canPhone:9876543212,Candidatestatus:'Open'},
//   {canName:'abhi',EmailId:'abhi@gmail.com',canPhone:9876543212,Candidatestatus:'Open'},
//   {canName:'abhi',EmailId:'abhi@gmail.com',canPhone:9876543212,Candidatestatus:'Open'},
//   {canName:'abhi',EmailId:'abhi@gmail.com',canPhone:9876543212,Candidatestatus:'Open'},
//   {canName:'abhi',EmailId:'abhi@gmail.com',canPhone:9876543212,Candidatestatus:'Open'},
//   {canName:'abhi',EmailId:'abhi@gmail.com',canPhone:9876543212,Candidatestatus:'Open'},
//   {canName:'abhi',EmailId:'abhi@gmail.com',canPhone:9876543212,Candidatestatus:'Open'},
//   {canName:'abhi',EmailId:'abhi@gmail.com',canPhone:9876543212,Candidatestatus:'Open'},
//   {canName:'abhi',EmailId:'abhi@gmail.com',canPhone:9876543212,Candidatestatus:'Open'},
//   {canName:'abhi',EmailId:'abhi@gmail.com',canPhone:9876543212,Candidatestatus:'Open'},
//   {canName:'abhi',EmailId:'abhi@gmail.com',canPhone:9876543212,Candidatestatus:'Open'},
//   {canName:'abhi',EmailId:'abhi@gmail.com',canPhone:9876543212,Candidatestatus:'Open'},
// ]
  
  headers = new HttpHeaders({'Authorization':`Bearer ${userIdToken}`});

  requestOptions={
    
  };

  arr: any = [];
  skillA:any=[];
  buttonDisabled:boolean;
  search : String;
  Searchvalue:string;
  Searchvalue1:string;
  Searchvalue2:string;
  start_date:string;
  end_date:string;
  Farr:any=[];
  Rarr:any=[];
  statuss:any="closed";
  p: any = 0;
  details : any ;
  dialogRef: MatDialogRef <any> ;

  constructor(
     private http: HttpClient,
     private _navigate:Router,
     private fb:FormBuilder,
     private dfs:DataFileService,
     private dialog: MatDialog
     ) {
      
     }  
     
  ngOnInit(): void {
    this.getCandidates();
    this.filterCandidate(this.arr)
    this.dfs.showFiltered = false;
  }
  

   getCandidates(){
    debugger
    this.http.post<any>('http://20.192.1.163:3000/cardsFilterManager',{}
    ,{headers:this.headers}).subscribe(
      response=>{
        console.log(response)
        this.arr=response.result;
        this.skillA=response.result.skills;
        console.log(this.arr);
        this.filterCandidate(this.arr)     
      }
    );
  }
  Recentcandidates:any=[];
  Remainingcandidates:any=[];

  filterCandidate(value:any){
    
    this.Recentcandidates=[];
    this.Remainingcandidates=[];
    for(let i=0 ;i<=value.length-1;i++){
      if(i<=8){
        this.Recentcandidates.push(value[i])    
      }
      else{
        this.Remainingcandidates.push(value[i]) 
      }
    }
    console.log(this.Recentcandidates)
    console.log(this.Remainingcandidates)
  }


  sendData(data:any){
   
    this.dfs.Intermediate(data);
  }

  sendData2( email : any , experience : any , name:any , phone : any, skills:any){
   
    this.details = { name : name , phone : phone , email : email , experience : experience, skills: skills };
    this.dfs.Intermediate2(this.details);
    
  }

  newCandidate () : void {
    
    this.dfs.newProfile();
  
  }

  delete(){
    
  }
  

  openDialogEdit(value:any){
   
    this.dialog.open(EditDataComponent,
      {
        data:{
          value,
          style:"width:80%, height:80%"
        }
      });
  }
  
  openDialogScore(value:any){
    this.sendData(value)
    this.dialogRef = this.dialog.open(ScoreComponent, {
     data:{
      value,
      style:"width:40%, height:80% "
     }
  });   
  }

  searchFilter(status:any,name:any,emailId:any,startDate:any,endDate:any){
    console.log(this.start_date)
    console.log(startDate)
    debugger
    this.http.post<any>('http://20.192.1.163:3000/cardsFilterManager',
    {
      status,name,emailId,startDate,endDate
    },{headers:this.headers}).subscribe(
      response=>{ 
        this.arr=response.result;
        this.filterCandidate(this.arr);
       })  
  }

  reset(){
    this.Searchvalue="";
    this.Searchvalue="";
    this.Searchvalue1="";
    this.Searchvalue2="";
    this.start_date="";
    this.end_date="";
  }


  
  
}

