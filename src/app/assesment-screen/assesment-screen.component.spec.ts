import { ComponentFixture, TestBed } from '@angular/core/testing';
import{HttpClientTestingModule} from '@angular/common/http/testing';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AssesmentScreenComponent } from './assesment-screen.component'; 

describe('AssesmentScreenComponent', () => {
  let component: AssesmentScreenComponent;
  let fixture: ComponentFixture<AssesmentScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,FormsModule,ReactiveFormsModule],
      declarations: [ AssesmentScreenComponent ],
      
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssesmentScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
