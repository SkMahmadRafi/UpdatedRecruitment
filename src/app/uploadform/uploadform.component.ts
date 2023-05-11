import  { Component, Inject, OnInit } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders, HttpResponse } from '@angular/common/http';
import { userIdToken } from '../../app/header/header.component';
@Component({
  selector: 'uploadform',
  templateUrl: './uploadform.component.html',
  styleUrls: ['./uploadform.component.css']
})
export class UploadformComponent implements OnInit{
  title = 'Utility-app';
  selectedFiles?: FileList;
  currentFile?: File;
  constructor(private http: HttpClient){}
  headers = new HttpHeaders({ 'Authorization': `Bearer ${userIdToken}` });
  ngOnInit() {

  
  }
  
  selectFile(event: any): void {
    // if(event.target.files.type=='text/csv' ||event.target.files.type=='.csv'){
    //   this.selectedFiles = event.target.files;
    // }else{
    //   alert("Only CSV file can upload")
    // }
    this.selectedFiles = event.target.files;
  }
  formsubmit(){
    if (this.selectedFiles) {
        const file: File | null = this.selectedFiles.item(0);
  
        if (file) {
          this.currentFile = file;
          const formData: FormData = new FormData();

    formData.append('file', this.currentFile);
          this.http
          .post<any>('http://10.10.20.44:5000/update/uploadQA',formData, {
            reportProgress: true,
            responseType: 'json'
          })
          .subscribe((response) => {
            
            console.log(response);
          });
        }
    }
  
   
  }


  

  
  
}
