import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '../app.module';
import {APP_BASE_HREF} from '@angular/common';
import { DownloadService } from './download.service';

describe('DownloadService', () => {
  let service: DownloadService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          AppModule
          ],
        providers: [ {provide: APP_BASE_HREF, useValue : '/' }
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.get(DownloadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#downloadFile should return b: Blob', function(){
    spyOn(service, 'downloadFile').and.callThrough();
    let b = service.downloadFile('1');
    expect(b).toBeDefined();
    expect(b).not.toBeNull();
  });
});
