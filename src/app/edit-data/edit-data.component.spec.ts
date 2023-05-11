import  { ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import  { FormsModule,ReactiveFormsModule } from '@angular/forms';
import  { EditDataComponent } from './edit-data.component';

describe('EditDataComponent', () => {
  let component: EditDataComponent;
  let fixture: ComponentFixture<EditDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,FormsModule,ReactiveFormsModule],
      declarations: [ EditDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
