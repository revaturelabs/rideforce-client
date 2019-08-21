import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '../../app.module';
import {APP_BASE_HREF} from '@angular/common';
import { ImageUploadComponent } from './image-upload.component';

describe('ImageUploadComponent', () => {
  let component: ImageUploadComponent;
  let fixture: ComponentFixture<ImageUploadComponent>;

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
    fixture = TestBed.createComponent(ImageUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create image-upload.component', () => {
    expect(component).toBeTruthy();
  });

  it('should have selectedFile initialized as null', () => {
    expect(component.selectedFile).toBeNull();
  });

  it('should have imageUploadProgress initialized as "0"', () => {
    expect(component.imageUploadProgress).toEqual('0');
  });

  it('#onFileSelect should have been called on change', async(() => {
    spyOn(component, 'onFileSelect');
  
    let input = fixture.debugElement.nativeElement.querySelector('input');
    input.dispatchEvent(new Event('change'));

    expect(component.onFileSelect).toHaveBeenCalled();
  }));

  it('#onFileSelect should have changed imageUploadProgress and selectedFile', async(() => {
    spyOn(component, 'onFileSelect').and.callThrough();
  
    let input = fixture.debugElement.nativeElement.querySelector('input');
    input.dispatchEvent(new Event('change'));

    expect(component.imageUploadProgress).toBe('0%');
    expect(component.selectedFile).not.toBeNull();
  }));

  it('#onFileUpload should have been called on button click', async(() => {
    spyOn(component, 'onFileUpload');
  
    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
  
    fixture.whenStable().then(() => {
      expect(component.onFileUpload).toHaveBeenCalled();
    });
  }));

});
