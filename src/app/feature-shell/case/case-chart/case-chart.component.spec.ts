import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseChartComponent } from './case-chart.component';

describe('CaseChartComponent', () => {
  let component: CaseChartComponent;
  let fixture: ComponentFixture<CaseChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
