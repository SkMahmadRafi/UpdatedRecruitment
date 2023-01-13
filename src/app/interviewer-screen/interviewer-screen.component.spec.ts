import { ComponentFixture, TestBed } from '@angular/core/testing';
import{HttpClientTestingModule} from '@angular/common/http/testing';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { InterviewerScreenComponent } from './interviewer-screen.component';

describe('InterviewerScreenComponent', () => {
  let component: InterviewerScreenComponent;
  let fixture: ComponentFixture<InterviewerScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,FormsModule,ReactiveFormsModule],
      declarations: [ InterviewerScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterviewerScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
