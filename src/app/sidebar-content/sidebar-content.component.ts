import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,Validators,FormArray } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import {userIdToken} from '../../app/header/header.component';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-sidebar-content',
  templateUrl: './sidebar-content.component.html',
  styleUrls: ['./sidebar-content.component.css'],
})
export class SidebarContentComponent implements OnInit {
  
  headers = new HttpHeaders({'Authorization':`Bearer ${userIdToken}`});
  Skill: any = [];
  Complexity: any = [];
  arr: any = [];
  p: any = 0;

  // que:any = [];
  // ans:any = [];


  queId:any;
  ansId:any;
  answerKeywords:any;
  cmpid:any;

  val:boolean= false;
  
  recruiterData = this.formBuilder.group({
    skillId: [''],
    level: ['']
  });

  showMe: boolean = true;
  hideMe: boolean = false;
  hideMeI: boolean = false;

  skill = 0;
  complexity:any;

  popup:any = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private dialogRef: MatDialog
  ) {}
  ngOnInit(): void {
    
    this.getSkills();
    this.getComplexity();
  }
  hideAnswer() {
    this.showMe = !this.showMe;
  }
  
  
  fetchData(skillId: number, compId: number) {
    // debugger;
    return this.httpClient
      .post<any>('http://20.192.1.163:3000/qaManager/allQA',{
        compId,skillId
    },{headers:this.headers})
      .subscribe((response) => {
        this.arr = response.result; 
        console.log(this.arr);
      });
  }


  formname =  this.formBuilder.group({
    question: [''],
    answer: [''],
    answerkeywords: [''],
    level: ['']
  })


  savechange(){
    debugger;
    let Question=this.formname.controls['question'].value;
    let Answer=this.formname.controls['answer'].value;
    let cmpid=this.formname.controls['level'].value;
    let answerkeywords=this.formname.controls['answerkeywords'].value;
    let queId=this.queId;
    let ansId=this.ansId;
    this.httpClient
      .post<any>('http://20.192.1.163:3000/qaManager/updateQ',{
       Question,queId,cmpid
    },{headers:this.headers})
      .subscribe((response) => {
        
      });

      this.httpClient
      .post<any>('http://20.192.1.163:3000/qaManager/updateA',{
       Answer,ansId,answerkeywords
    },{headers:this.headers})
      .subscribe((response) => {
        
      });

}


 getSkills() {
    //  debugger;
    this.httpClient
      .get<any>('http://20.192.1.163:3000/skillsManager',{headers:this.headers})
      .subscribe((response) => {
        this.Skill = response.result;
      });
  }
  getComplexity() {
    // debugger;
    this.httpClient
      .get<any>('http://20.192.1.163:3000/ComplexityManager',{headers:this.headers})
      .subscribe((response) => {
        this.Complexity = response.result;
        // console.log(this.Complexity);
      });
  }
  onSelectSkill(data: any) {
    // debugger
    this.skill = data;
  }
  onSelectComple(data: any) {
    this.complexity = data;
    // let id=this.i.toString();
    this.fetchData(this.skill, this.complexity);
    this.hideMeI = true;
  }
  
  edit(data:any){
    debugger;
    // console.log(data);
    this.queId = data.queid;
    this.ansId = data.ansid;
    this.cmpid = data.cmpid;
    this.answerKeywords = data.answerkeywords;
  //  console.log(data.answerkeywords);
   
    this.formname.controls.question.setValue(data.question);
    this.formname.controls.answerkeywords.setValue(data.answerkeywords);
    this.formname.controls.level.setValue(this.complexity);
    this.formname.controls.answer.setValue(data.answer);
    
    
    
    this.popup = true;
  }


  arrayLength = 0;
 
  

}