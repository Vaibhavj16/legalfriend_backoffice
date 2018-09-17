import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrialusersChartComponent } from './trialusers-chart.component';

describe('TrialusersChartComponent', () => {
  let component: TrialusersChartComponent;
  let fixture: ComponentFixture<TrialusersChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrialusersChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrialusersChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
