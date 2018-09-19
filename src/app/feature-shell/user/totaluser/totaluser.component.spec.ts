import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotaluserComponent } from './totaluser.component';

describe('TotaluserComponent', () => {
  let component: TotaluserComponent;
  let fixture: ComponentFixture<TotaluserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotaluserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotaluserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
