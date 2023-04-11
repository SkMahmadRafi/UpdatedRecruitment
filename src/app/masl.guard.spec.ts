import  { TestBed } from '@angular/core/testing';
import  { MsalGuard, MsalService, MSAL_GUARD_CONFIG } from '@azure/msal-angular';
import  { MaslGuard } from './masl.guard';

describe('MaslGuard', () => {
  let guard: MaslGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MaslGuard);
    import s:[MsalService]
    providers:[MsalService,MsalGuard]
   
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
