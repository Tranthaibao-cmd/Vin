import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsListNumbersComponent } from './questions-list-numbers.component';

describe('QuestionsListNumbersComponent', () => {
  let component: QuestionsListNumbersComponent;
  let fixture: ComponentFixture<QuestionsListNumbersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionsListNumbersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsListNumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
