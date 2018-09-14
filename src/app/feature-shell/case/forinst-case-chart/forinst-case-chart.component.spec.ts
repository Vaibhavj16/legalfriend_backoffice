import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForinstCaseChartComponent } from './forinst-case-chart.component';

describe('ForinstCaseChartComponent', () => {
  let component: ForinstCaseChartComponent;
  let fixture: ComponentFixture<ForinstCaseChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForinstCaseChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForinstCaseChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
