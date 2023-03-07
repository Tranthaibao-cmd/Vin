import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheoryPartComponent } from './theory-part.component';

describe('TheoryPartComponent', () => {
  let component: TheoryPartComponent;
  let fixture: ComponentFixture<TheoryPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheoryPartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TheoryPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
