import  { ComponentFixture, TestBed } from '@angular/core/testing';
import  { MatDialogRef } from '@angular/material/dialog';
import  { HttpClientTestingModule } from '@angular/common/http/testing';
import  { ScoreComponent } from './score.component';

describe('ScoreComponent', () => {
  let component: ScoreComponent;
  let fixture: ComponentFixture<ScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      import s:[HttpClientTestingModule],
      declarations: [ ScoreComponent ],
      providers:[{
        provide:MatDialogRef,
        useValue:[]
      }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
