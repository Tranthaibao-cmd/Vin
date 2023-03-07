import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadQuesDialogComponent } from './upload-ques-dialog.component';

describe('UploadQuesDialogComponent', () => {
  let component: UploadQuesDialogComponent;
  let fixture: ComponentFixture<UploadQuesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadQuesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadQuesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
