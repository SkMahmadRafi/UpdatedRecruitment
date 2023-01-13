import { ComponentFixture, TestBed } from '@angular/core/testing';
import{HttpClientTestingModule} from '@angular/common/http/testing';
import { WebapiComponent } from './webapi.component';

describe('WebapiComponent', () => {
  let component: WebapiComponent;
  let fixture: ComponentFixture<WebapiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      declarations: [ WebapiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebapiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
