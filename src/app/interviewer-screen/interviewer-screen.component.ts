import  { HttpClient, HttpHeaders } from '@angular/common/http';
import  { Component, OnInit } from '@angular/core';
import  { FormBuilder, NgModel } from '@angular/forms';
import  { AngularEditorConfig } from '@kolkov/angular-editor';
import  { FormGroup,FormControl } from '@angular/forms';
import  { bindCallback } from 'rxjs';
import  { ElementRef } from '@angular/core';
import  { DataFileService } from '../data-file.service';
import  {formatDate } from '@angular/common';
import  {userIdToken} from '../../app/header/header.component';

@Component({
  selector: 'app-interviewer-screen',
  templateUrl: './interviewer-screen.component.html',
  styleUrls: ['./interviewer-screen.component.css']
})
export class InterviewerScreenComponent implements OnInit {
  
  // newArry:any=[
  //         {Question:'What is TypeScript?',
  //         Answer:'TypeScript is a superset of JavaScript that offers excellent consistency. It is highly recommended, as it provides some syntactic sugar and makes the code base more comfortable to understand and maintain.',skillId:2,complexity:'Easy'},
  //         {Question:' What is enum?' ,Answer:'An enum is a value type with a set of related named constants often referred to as an enumerator list. The enum keyword is used to declare an enumeration. It is a primitive data type that is user-defined',skillId:2,complexity:'Easy'}, 
  //         {Question:'What is the difference between constant and readonly?',
  //         Answer:'Const is nothing but "constant", a variable of which the value is constant but at compile time. Its mandatory to assign a value to it. By default, a const is static and we cannot change the value of a const variable throughout the entire program',skillId:2,complexity:'Easy'},
  //         {Question:' What is C#? ',Answer:'C# is an object-oriented, type-safe, and managed language that is compiled by .Net framework to generate Microsoft Intermediate Language.',skillId:1,complexity:'Easy'},
  //         {Question:'What is the Constructor Chaining ?',Answer:'Constructor chaining is a way to connect two or more classes in a relationship as Inheritance. In Constructor Chaining, every child class constructor is mapped to a parent class Constructor implicitly by base keyword, so when you create an instance of the child class, it will call the parent’s class Constructor. Without it, inheritance is not possible.',skillId:2,complexity:'Easy'},
  //         {Question:'What is a Virtual Method?',Answer:'A virtual method is a method that can be redefined in derived classes. A virtual method has an implementation in a base class as well as derived the class. It is used when a methods basic functionality is the same but sometimes more functionality is needed in the derived class. A virtual method is created in the base class that can be overridden in the derived class. We create a virtual method in the base class using the virtual keyword and that method is overridden in the derived class using the override keyword.',skillId:2,complexity:'Medium'},
  //         {Question:'What is an object?',Answer:'An object is a class instance that can be used to access class methods. The "New" keyword can be used to construct an object.',skillId:1,complexity:'Easy'},
  //         {Question:'Explain the four steps involved in the C# code compilation',Answer:'Four steps of code compilation in C# include'+
  //         ' 1.Source code compilation in managed code.2.Newly created code is clubbed with assembly code.3.The Common Language Runtime (CLR) is loaded.4.Assembly execution is done through CLR.',skillId:1,complexity:'Medium'},
  //     ];

  headers = new HttpHeaders({'Authorization':`Bearer ${userIdToken}`});
  
  arr: any=[];      
  showMe:boolean=true;
  hideMe:boolean=false;
  nextI=0;
  i=1;
  Today: any;
  sliderOutput=0;
  skill=0;
  complexity=0;
  public question:any='';
  public answer:any='';
  ques:boolean=false;
  public QunAns:any=[];
  keywordzz:any='';
  value = 0;
  value1='';
  candidate:any=[];
  candidateSkill:any=[];
  p: any = 0;
  CurrentTime:any;

  recruiterData=this.formBuilder.group({
    score:(''),
    note:('')
   });

  constructor(
    private formBuilder:FormBuilder,
    private httpClient:HttpClient,
    private elementRef: ElementRef,
    private dfs:DataFileService,  ){}

    hour:any;
    min:any;
    sec:any;
    Time:any;
  ngOnInit(): void {
     //call api  
     let now: Date = new Date();
     this.Time=now.getHours()+':'+now.getMinutes()+':'+now.getSeconds();
    this.getCandidateDetails();
    console.log(now);  
  }

 
  Asid:any='';
  CName:any;
  Email:any;
  CId:any;
  arrayLength=0;
  data:any='';
  status:any;
  endstatus:any='closed';
ExtractDate:any;
Date:any;
AssDate:any;
FilterDate:any;
skillIds:any=[];
cmpIds:any=[];
Myskills:any=[];
InterviewId:any;
InterviewDate:any;

getCandidateDetails(){  
  debugger
  this.candidate=this.dfs.arr;
  this.profile();
 
  let dateObj = new Date(this.candidate.date);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    this.Today= `${year}-${month}-${day}`;
  console.log(this.candidate)
}
skillNameN:any;
complexityN:any;
  profile(){
    this.Asid;
    this.CId=this.candidate.canid;
    this.CName=this.candidate.canname;
    this.status=this.candidate.status;
    this.candidateSkill=this.candidate.skills;
    
   
    this.InterviewId=this.candidate.interviewid;
    this.InterviewDate=this.candidate.date;
    debugger
    this.AssDate=this.candidate.date;
    this.FilterDate = formatDate(this.InterviewDate, 'yyyy/MM/dd', 'en-US');
    console.log(this.FilterDate)

    this.candidateSkill.forEach((element: { skillid: any;cmpid:any;skillname:any,name:any}) => {
      let skillId=element.skillid;
      let cmpId=element.cmpid;
      let skillName=element.skillname;
      let complexity=element.name;
      this.Myskills.push({skillId,cmpId});
      console.log(this.Myskills)   
    });
    console.log(this.FilterDate)
  }
  
  canId=2;
  RowandQuestion_number=1;
  recId=1;
  note_value=1;
  newArry:any=[];

   //Assessment start button 
   assesmentStart()
   {
     debugger;
     this.getQueAns(this.CId,this.FilterDate,this.Time,this.InterviewId,this.Myskills,this.RowandQuestion_number);
     this.hideMe=true;
     this.keywordload();
     // this.keywordload();  
   }
  
  getQueAns(canId:any,Date:any,starttime:any,InterviewId:any,skills:any,RowandQuestion_number:any){
    debugger;
    try{
    this.httpClient.post<any>('http://10.10.20.44:5000/randomizationManager',
    {
    canId,Date,starttime,InterviewId,skills
    },{headers:this.headers}).subscribe(
      response=>{      
          // this.newArry=response.data;
          // this.arr.push(this.newArry);
          this.Asid=response.assessmentId;
          console.log(response);
          this.getQuestion(canId,RowandQuestion_number,this.Asid);
          // console.log(this.newArry);
          this.update();
      }
    );
  }catch{
     ("Error")
  }
  }

  getQuestion(canId:any,RowandQuestion_number:any,assessmentId:any){
    
      this.dfs.getQA(canId,RowandQuestion_number,assessmentId)
      .subscribe(
      response=>{
        console.log(response);
        this.newArry=response.result;    
       });
      
  }
  keywordload(){
    this.keywordzz=this.newArry[0].Answerkeywords;
  }
 load(){
  
  this.recruiterData.controls['score']=this.newArry[0].score;
  this.recruiterData.controls['note']=this.newArry[0].Note;
 }

  datastoring_response:any='';
  
  nextQA()
  {
    if(this.newArry.currentRecordId==20){
        this.saveData();

    }else{

    
    debugger;
    let canId=this.CId;
    let RowandQuestion_number=this.i;
    let score=this.recruiterData.controls['score'].value;
    let notes=this.recruiterData.controls['note'].value;
      
    this.httpClient.post<any>('http://10.10.20.44:5000/assessmentStagingManager/saveData',
    {
      canId,
      RowandQuestion_number,
      score,
      notes
    },{headers:this.headers}).subscribe(
      response=>{
        this.datastoring_response=response.status;
        console.log(response);     
        this.i++;
        this.updateData();     
        this.getQuestion(this.CId,this.i,this.Asid);
        this.keywordload();
      },  
    );
  }
}

  //duplicate method for left arrow //it use when we have api
  prevQA(){
    debugger;
    this.i--;
    let canId=this.CId;
    let RowandQuestion_number=this.i;
    
    this.getQuestion(this.CId,RowandQuestion_number,this.Asid);
    
  //  this.recruiterData.controls['score']=this.newArry[0].score;
  //  this.recruiterData.controls['note']=this.newArry[0].Note;
   
  } 
  ScoreA:any=[];
  NoteA:any=[];
  Score:any='';
  Note:any='';

  update(){
    this.value=this.newArry[0].score;
    this.value1=this.newArry[0].Note;
   
  }
  updateData(){
      debugger;
    var Score=this.recruiterData.controls['score'].value;
    var Note=this.recruiterData.controls['note'].value;
    this.ScoreA.push(Score);
    this.NoteA.push(Note);
    this.recruiterData.reset();
  }

  saveData(){
    debugger;
    let status=this.endstatus;
    let canId=this.CId;
    let assessmentId=this.Asid;
    let endTime=this.Time;
    let InterviewId=this.InterviewId;
    this.httpClient.post<any>('http://10.10.20.44:5000/assessmentManager/endAssessment',
    {
      status,
      canId,
      assessmentId,
      endTime,
      InterviewId
    },{headers:this.headers}).subscribe(
      response=>{
        this.endStatus=response;
        alert(this.endStatus.Status.StatusMessage); 
        console.log(this.endStatus.Status.StatusMessage);
      })
  }

  endStatus:any;
//for hiding answer
  hideAnswer()
  {
    this.showMe=!this.showMe;
  }

  ScoreData:any='';
  //slider value
  updateSetting(event:any)
  {
    debugger
    this.sliderOutput=event;
    this.resume=true; 
  }

  //text-Editor for "Note"
  editorConfig1:AngularEditorConfig={
      editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '150px',
      maxHeight: 'auto',
      width: '100%',
      minWidth: '0',
      translate: 'no',
      enableToolbar: false,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',      
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: false,
    toolbarPosition: 'bottom',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ] 
  }
  
 
 
  flush(){
    this.Score='';
    this.Note='';
  }
  
  
  resume:boolean=false;
  
  //slider value
  ngAfterViewInit() {   //background color
    this.elementRef.nativeElement.ownerDocument
        .body.style.backgroundColor = 'rgba(255, 228, 196, 0.32)';
}
}
