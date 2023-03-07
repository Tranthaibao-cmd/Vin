import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicManagementDialogComponent } from './topic-management-dialog.component';

describe('TopicManagementDialogComponent', () => {
  let component: TopicManagementDialogComponent;
  let fixture: ComponentFixture<TopicManagementDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicManagementDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicManagementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
