import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevilegeComponent } from './previlege.component';

describe('PrevilegeComponent', () => {
  let component: PrevilegeComponent;
  let fixture: ComponentFixture<PrevilegeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrevilegeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrevilegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
