import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgainstinstCaseChartComponent } from './againstinst-case-chart.component';

describe('AgainstinstCaseChartComponent', () => {
  let component: AgainstinstCaseChartComponent;
  let fixture: ComponentFixture<AgainstinstCaseChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgainstinstCaseChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgainstinstCaseChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
