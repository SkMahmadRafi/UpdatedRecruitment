import  { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import  { DataFileService } from './data-file.service';

describe('DataFileService', () => {
  let service: DataFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataFileService);
    import s:[HttpClientTestingModule]
    provider:[HttpClientTestingModule]
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
