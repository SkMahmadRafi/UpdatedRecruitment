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

  que:any = [];
  ans:any = [];

  val:boolean= false;
  
  recruiterData = this.formBuilder.group({
    skillId: [''],
    level: [''],
  });
  showMe: boolean = true;
  hideMe: boolean = false;
  hideMeI: boolean = false;

  skill = 0;
  complexity = 0;
  
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
    answer: ['']
  })





 sendque(skillId: number, compId: number){
    return this.httpClient
    .post<any>('http://20.192.1.163:3000/qaManager/updateQ',{
      compId,skillId
    },{headers:this.headers})
    .subscribe((response)=>{
      this.que = response.result;
      console.log(this.que);
    })
 }


 sendans(skillId: number, compId: number){
  return this.httpClient
  .post<any>('http://20.192.1.163:3000/qaManager/updateA',{
    compId,skillId
  },{headers:this.headers})
  .subscribe((response)=>{
    this.ans = response.result;
    console.log(this.ans);
  })
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
  
  arrayLength = 0;
 
  

}