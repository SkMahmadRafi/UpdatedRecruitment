import  { Component, Inject, OnInit } from '@angular/core';
import  { MAT_DIALOG_DATA } from '@angular/material/dialog';
import  { FormBuilder, FormControl } from '@angular/forms';
import  { HttpClient, HttpEventType, HttpHeaders, HttpResponse } from '@angular/common/http';
import  {userIdToken} from '../../app/header/header.component';
import  { Observable } from 'rxjs';
import  { DataFileService } from '../data-file.service';

@Component({
  selector: 'app-edit-data',
  templateUrl: './edit-data.component.html',
  styleUrls: ['./edit-data.component.css']
})
export class EditDataComponent implements OnInit {

  headers = new HttpHeaders({'Authorization':`Bearer ${userIdToken}`});
skill:any;
SkillId:any;
// complexity:any;
ComplexityId:any;
Question:any;
answer:any;
Keyword:any;
Skills: any = [];
Complexity: any = [];
QAresponse:any;
Skillresponse:any;
Skillresponse1:any;

selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  progress1 = 0;
  message = '';
  message1 = '';
 

  fileInfos?: Observable<any>;

  constructor(private formBuilder:FormBuilder,private http:HttpClient,private uploadService:DataFileService) {
   

  }
 
  ngOnInit(): void {
    debugger
    this.getSkills();
    this.getComplexity();
    // this.fileInfos = this.uploadService.getFiles();
  }

 

  getComplexity() {
    this.http
    .get<any>('http://20.192.1.163:3000/ComplexityManager',{headers:this.headers})
      .subscribe((response) => {
        this.Complexity = response.result;
        console.log(this.Complexity);
      });
  }

  getSkills() {
    this.http
    .get<any>('http://20.192.1.163:3000/skillsManager',{headers:this.headers})
      .subscribe((response) => {
        this.Skills = response.result;
        // console.log(this.Skill);
      });
  }

  getSelectedSkill(value:any){
    debugger
    this.SkillId=value;
  }
  getSelectedComplexity(value:any){
    debugger
    this.ComplexityId=value;
  }


  addSkill(skillName:any){
      this.Skillresponse='';
      this.Skillresponse1='';
    debugger
  try{
   
    this.http.post<any>('http://20.192.1.163:3000/skillsManager/addSkill',
    {skillName},{headers:this.headers}).subscribe((response) => {
      //  this.Skillresponse = response.Message;
      
       if(response.Message=='The skill is already present!!')
       {
        this.Skillresponse1 = response.Message;
       }else{
        this.Skillresponse=response.Message;
       }
       console.log(response)   
    });
  }catch{
      this.Skillresponse="Error adding Skill"
  }
  }
  
  addComplexity(value:any){
    
  }

  addQuestion(skillId:any,cmpId:any,Question:any,Answer:any,Answerkeywords:any){
    debugger
    this.http.post<any>('http://20.192.1.163:3000/qaManager/insertQA',
    {skillId,cmpId,Question,Answer,Answerkeywords},{headers:this.headers}).subscribe((response) => {
       this.QAresponse = response.Message;
    });
  }



  selectFile(event: any): void {
  // if(event.target.files.type=='text/csv' ||event.target.files.type=='.csv'){
  //   this.selectedFiles = event.target.files;
  // }else{
  //   alert("Only CSV file can upload")
  // }
    this.selectedFiles = event.target.files;
  }

  uploadskill(): void {
    debugger
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.uploadService.uploadskill(this.currentFile).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              // this.fileInfos = this.uploadService.getFiles();
            }
          },
          error: (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
              console.log(this.message);
            }

            this.currentFile = undefined;
          }
        });
      }

      this.selectedFiles = undefined;
    }
  }


  uploadQA(): void {
    debugger
    this.progress1 = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.uploadService.uploadpQA(this.currentFile).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress1 = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message1 = event.body.message;
              
              
              // this.fileInfos = this.uploadService.getFiles();
            }
          },
          error: (err: any) => {
            console.log(err);
            this.progress1 = 0;

            if (err.error && err.error.message) {
              this.message1 = err.error.message;
            } else {
              this.message1 = 'Could not upload the file!';
            }

            this.currentFile = undefined;
          }
        });
      }

      this.selectedFiles = undefined;
    }
  }

}
