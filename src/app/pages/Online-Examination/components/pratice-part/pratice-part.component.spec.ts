import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PraticePartComponent } from './pratice-part.component';

describe('PraticePartComponent', () => {
  let component: PraticePartComponent;
  let fixture: ComponentFixture<PraticePartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PraticePartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PraticePartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
