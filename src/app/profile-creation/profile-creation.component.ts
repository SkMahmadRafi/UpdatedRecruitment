import { HttpClient,HttpClientModule, HttpEventType, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, EventEmitter, 
  Input, OnInit, OnChanges, Output, SimpleChanges, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormArray,FormBuilder,FormControl,FormGroup,Validators,} from '@angular/forms';
import { DataFileService } from '../data-file.service';
import { FormData } from '../form-data'; 
import { Observable } from 'rxjs';
import { ThrottlingUtils } from '@azure/msal-common';

@Component({
  selector: 'app-profile-creation',
  templateUrl: './profile-creation.component.html',
  styleUrls: ['./profile-creation.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileCreationComponent implements OnInit{

  pArray: any = [];
  cId: any = [];

  sData: any;
  updateData: any;
  Candidatestatus: any;
  newdate!: string;
  sArray: any;
  cArray: any;
  selected: any;
  forSkill: any;
  count: number = 0;
  canId: any;
  status: boolean = false;
  skillData: any;
  chooseDate: any;
  skillArray: any;
  edata: any;
  canD: any;
  eRes: any;
  arr: any = [];
  sEmail: any;
  Skill: any = [];
  Complexity: any = [];
  CandidateInfo: Object = '';
  public static Name: any = '';
  public static PhoneNo: any = '';
  public static Email: any = '';
  public static Experiance: any = '';
  EmailforEdit:string='';


  selectedFiles?: FileList;
  currentFile?: File;
  progress2 = 0;
  message = '';

  fileInfos?: Observable<any>;

  // Skill:any=[{skillId:'1',skillName:'C#'},{skillId:'2',skillName:'Angular'},{skillId:'3',skillName:'SQL'},{skillId:'4',skillName:'Azure'}];

  constructor(
    private _http: HttpClient,
    private formBuilder: FormBuilder,
    private elementRef: ElementRef,
    private _service: DataFileService,
    private UploadService:DataFileService
  ) {}

  ngOnInit(): void {
    
    // this.skillArray=this._service.canDetails.skills;
    // for(let i=0;i<this.skillArray.length;i++){
      
    // }


    this.EmailforEdit=this._service.arr;
    this.setValueForProfile();
    this.getSkills();
    this.getComplexity();
    this.form = this.formBuilder.group({
      selected: new FormArray([]),
    });
    
    this.fifthFormGroup = this.formBuilder.group({
    
      searchEmail: (this.EmailforEdit),
    });
    console.log(this.EmailforEdit)

    this.myData=this.UploadService.Intermediate2;
    
  }

  ngAfterViewInit() {
    //background color
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =
      'rgba(255, 228, 196, 0.32)';
  }
  
  form!: FormGroup;

  firstFormGroup = this.formBuilder.group({
    email: ['', Validators.required],
    name: ['', Validators.required],
    phone: ['', Validators.required],
    experience: [''],
  });



  fifthFormGroup = this.formBuilder.group({
    
    searchEmail: (''),
  });

  sixthFormGroup = this.formBuilder.group({
    notifier: [''],
  });
  
  secondFormGroup = this.formBuilder.group({
    message: [''],
  });
  thirdFormGroup = this.formBuilder.group({
    resume: [''],
  });

  skillFormGroup = new FormGroup({
    Skills: new FormArray(
      [
        new FormGroup({
          skillId: new FormControl<number[]>([0]),
          cmpId: new FormControl<number[]>([0]),
        }),
      ],
      [Validators.maxLength(5)]
    ),
  });
  isLinear = false;

  email: any;
  name: any;
  phone: any;
  experience: any;
  SkillA: any = [];
  // skils:any = [];

  storeDatas() {
  debugger
    this.SkillA = this.skillFormGroup.value.Skills;
    
    console.log(this.SkillA);
    
    this.email = this.firstFormGroup.controls['email'].value;
    this.name = this.firstFormGroup.controls['name'].value;
    this.phone = this.firstFormGroup.controls['phone'].value;
    this.experience = this.firstFormGroup.controls['experience'].value;
    console.log(this.status);

    this.updateData = [
      {
        canphone: this.phone,
        canname: this.name,
        emailid: this.email,
        canexperience: this.experience,
        skills: this.SkillA,
        canId: this.canId,
        Candidatestatus: this.Candidatestatus,
      },
    ];
    console.log(this.updateData);

    if (this.status) {
      this._service.updateCandidateStatus(this.updateData).subscribe((res) => {
        console.log(res);
      });
    } else {
      this._service
        .sendingCandidateDataToServer(
          this.email,
          this.phone,
          this.name,
          this.experience,
          this.SkillA
        )
        .subscribe((response: any) => {
          console.log(response);
        });
    }
  }
  //--------------------------------------------------

  
  // Pass profile data to backend
  sendData(data: any) {
    // debugger;
    return this._http.post<any>('url', data).subscribe((response) => {});
  }
  getComplexity() {
    this._http
      .get<any>('http://20.192.1.163:3000/ComplexityManager')
      .subscribe((response) => {
        this.Complexity = response.result;
        console.log(this.Complexity);
      });
  }

  getSkills() {
    this._http
      .get<any>('http://20.192.1.163:3000/skillsManager')
      .subscribe((response) => {
        this.Skill = response.result;
        console.log(this.Skill);
      });
  }
  get Skills(): FormArray {
    return this.skillFormGroup.get('Skills') as FormArray;
  }

  addNew() {
    // debugger;
    this.count++;

    const skill = new FormGroup({
      skillId: new FormControl<number>(0),
      cmpId: new FormControl<number>(0),
    });

    this.Skills.push(skill);
    // }
    // console.log(skill);
  }

  

  onSelectSkill(data: any) {
    // debugger;
  }
  pitch(data: any) {
    // debugger;
  }
  newProfileSubmit(){

  }
  val:any;
  getinfo(emailId:any){
    this._http.post<any>('http://20.192.1.163:3000/candidateManager/candidateSkill',
    {emailId}
  ).subscribe(
  response=>{
    console.log(response);
    this.arr=response.candidatesData;
    console.log(this.arr,"arr");
    console.log(this.arr.assessmentsStatus);
    console.log(this.arr);
    this.val=this.arr[0].assessments;
    console.log(this.val)
    });
  }
myData:any;
  checkExistingcandidate() {
debugger
    this.email = this.firstFormGroup.controls['email'].value;
    this.sEmail = this.fifthFormGroup.controls['searchEmail'].value;
    console.log(this.sEmail);
    

    this._service
      .gettingCandidateDatawithCandidateskill(this.sEmail)
      .subscribe((response) => {
        this.myData = response;
        this.skillData=this.myData.candidatesData;
        this.status = true;
        console.log(this.skillData[0]);

        this.skillArray = this.skillData[0].skills;
        console.log(this.skillArray.skillname);

        
        this.canId = this.skillData[0].canid;
        this.Candidatestatus = this.skillData[0].candidatestatus;
        console.log(this.Candidatestatus);
       

        console.log(this.canId);
        console.log(this.status);
        this.firstFormGroup.controls.name.setValue(
          this.skillData[0].canname 
        );
        this.firstFormGroup.controls.email.setValue(
          this.skillData[0].emailid 
        );
        this.firstFormGroup.controls.phone.setValue(
          this.skillData[0].canphone 
        );
        this.firstFormGroup.controls.experience.setValue(
          this.skillData[0].canexperience
        );

        this.getinfo(this.sEmail);
      });
    if (this.skillData) {
      this.status = true;
    }

    this.next();
  }
  showCandidateAssesmentStatus() {
    debugger
    this.sEmail = this.fifthFormGroup.controls['searchEmail'].value;
    
  }

  next() {
    // debugger
    console.log('click');

    this.canD = this.canId;

    console.log(this.canD);
    this._service.gettingDataForScheduler(this.canD).subscribe(
      (res) => {
        console.log(res);
        this.forSkill = res;
        this.sArray = this.forSkill.data;
        console.log(this.sArray);
      }
      
    );
  }

  onCheckboxChange(event: any) {
    this.selected = this.form.controls['selected'] as FormArray;
    if (event.target.checked) {
      this.selected.push(new FormControl(event.target.value));
    } else {
      const index = this.selected.controls.findIndex(
        (x: { value: any }) => x.value === event.target.value
      );
      this.selected.removeAt(index);
    }
    console.log(this.selected.value);
  }

  
  getEndDate(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(event.value);
    this.chooseDate = event.value;
    console.log(this.chooseDate);

    const date = new Date(this.chooseDate);
    this.newdate = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    }).format(date);
    console.log(this.newdate.toString());
  }

  fetchComplexId() {
    for (let item of this.sArray) {
      for (let i = 0; i < this.cArray.length; i++) {
        if (this.cArray[i] == item.skillid) {
          this.cId[i] = { skillId: item.skillid, cmpId: item.cmpid };
          // console.log(this.cId);
        }
      }
    }
    console.log(this.cId, 'cid');
  }
  sheduleMessage:any="";
  Mymessage:any="";

 value:any='2023-02-15';
  submit() {

    debugger
    console.log(this.form.value);
    this.cArray = this.form.value.selected;
    console.log(this.chooseDate);
    console.log(this.cArray);
    this.fetchComplexId();
    this._service
      // .sendingSchedulingDataToBackend(this.canId, this.newdate, this.cId)
      let canId=this.canId;
      let date=this.value;

      let interviewSkills=this.cId;
      this._http.post(
        'http://20.192.1.163:3000/candidateInterviewManager/addInterview',
        {
          canId,
          date,
          interviewSkills
        }
      )
      .subscribe((response) => {
        
        console.log(response);
        this.sheduleMessage=response;
        
        this.Mymessage=this.sheduleMessage.statusMessage.StatusMessage;
        console.log(this.Mymessage)
        console.log(this.sheduleMessage)
        alert(this.Mymessage)
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

    
  uploadProfile(): void {
    debugger
    this.progress2 = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.UploadService.uploadprofile(this.currentFile).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress2 = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              // this.fileInfos = this.uploadService.getFiles();
            }
          },
          error: (err: any) => {
            console.log(err);
            this.progress2 = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }

            this.currentFile = undefined;
          }
        });
      }

      this.selectedFiles = undefined;
    }
  }
newskill:boolean=false;
  setValueForProfile () : void {
   
    // for(let x of this._service.canDetails.skills){
    // this.skils = x;
    // }
    // console.log(this.skils);
    if (this._service.setVal === true) {
    this.firstFormGroup.controls.email.setValue(this._service.canDetails.email);
    this.firstFormGroup.controls.experience.setValue(this._service.canDetails.experience);
    this.firstFormGroup.controls.name.setValue(this._service.canDetails.name);
    this.firstFormGroup.controls.phone.setValue(this._service.canDetails.phone);
    //  this.skillFormGroup.controls.Skills.setValue(this._service.canDetails.skills);
    this.newskill=true;
    this.skillArray=this._service.canDetails.skills;
    
    console.log("--------------")
//  this.skillFormGroup.controls.FormArray.forEach(element => {
//   element.setValue()
//  });

     
    console.log(this._service.canDetails.skills);
    
    console.log("--------------")
     
     
    }
    else {
      this.firstFormGroup.controls.email.setValue("");
    this.firstFormGroup.controls.experience.setValue("");
    this.firstFormGroup.controls.name.setValue("");
    this.firstFormGroup.controls.phone.setValue("");
     
    }
  }
  

  
}