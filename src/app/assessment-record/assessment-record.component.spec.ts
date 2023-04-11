import  { ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import  { AssessmentRecordComponent } from './assessment-record.component';

describe('AssessmentRecordComponent', () => {
  let component: AssessmentRecordComponent;
  let fixture: ComponentFixture<AssessmentRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      import s:[HttpClientTestingModule],
      declarations: [ AssessmentRecordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssessmentRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
