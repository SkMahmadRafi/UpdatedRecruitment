import  { ComponentFixture, TestBed } from '@angular/core/testing';
import  { FormsModule,ReactiveFormsModule } from '@angular/forms';
import  { HttpClientTestingModule } from '@angular/common/http/testing';
import  { SidebarContentComponent } from './sidebar-content.component';

describe('SidebarContentComponent', () => {
  let component: SidebarContentComponent;
  let fixture: ComponentFixture<SidebarContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      import s:[HttpClientTestingModule,FormsModule,ReactiveFormsModule],
      declarations: [ SidebarContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
