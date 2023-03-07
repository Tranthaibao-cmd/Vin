import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevilegeDialogComponent } from './previlege-dialog.component';

describe('PrevilegeDialogComponent', () => {
  let component: PrevilegeDialogComponent;
  let fixture: ComponentFixture<PrevilegeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrevilegeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrevilegeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
