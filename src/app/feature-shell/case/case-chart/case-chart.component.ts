import { AgainstinstCaseChartComponent } from './../againstinst-case-chart/againstinst-case-chart.component';
import { ForinstCaseChartComponent } from './../forinst-case-chart/forinst-case-chart.component';
import { Chart } from 'chart.js';
import { CaseService } from './../case.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
declare let $;

@Component({
  selector: 'app-case-chart',
  templateUrl: './case-chart.component.html',
  styleUrls: ['./case-chart.component.css'],
  providers: [CaseService]
})
export class CaseChartComponent implements OnInit {

  data = [];
  selectedYear: string;
  selectedTab: string = 'year';
  yearColor: string = 'orange';
  dateColor: string = '';
  years = [];
  endDate: string = '';
  caseschart;

  constructor(private _caseService: CaseService) { }

  ngOnInit() {
    this.selectedYear = new Date().getFullYear().toString();
    this.initLegalCaseChartChart();
    var $this = this;

    setTimeout(() => {
      $('#yearpicker').datepicker({
        format: 'yyyy',
        viewMode: 'years',
        minViewMode: 'years',
      });

      $('#yearpicker').change(function () {
        $this.selectedYear = $(this).val();
        $this.initLegalCaseChartChart();
      });
      $('#casesFilter').daterangepicker({
        autoApply: true,
        locale: {
          format: 'YYYY-MM-DD'
        }
      },
        function (start, end) {
          $this.selectedYear = $this.getFormattedDate(start);
          $this.endDate = $this.getFormattedDate(end);
          $this.initLegalCaseChartChart();
  
        }
      );
    }, 0);
  }

  getFormattedDate(value): string {
    var date = new Date(value);
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  }

  initLegalCaseChartChart() {

    if(this.endDate){
      this._caseService.getCasesByDate(this.selectedYear, this.endDate).subscribe(
        result => {
          this.data = result;
          this.legalCaseChart();
        }
      );
    }
    else{
      this._caseService.getCasesByYear(this.selectedYear).subscribe(
        result => {
          this.data = result;
          this.legalCaseChart();
        }
      );
    }
    
  }

  
  legalCaseChart() {
    try {
      var $this = this;
      var config = {
        type: 'line',
        data: {
          labels: this.data,
          datasets: [{
            label: "Legal Cases",
            data: this.data,
            backgroundColor: '#3c8dbc',
            datalabels: {
              align: 'end',
              anchor: 'end',
              display: true,
              borderRadius: 4,
              color: '#001f3f',
              font: {
                weight: 'bold'
              },
              formatter: function (value, context) {
                if (value.y >= 1000) {
                  value.y = value.y / 1000;
                  return 'Rs ' + value.y + 'k';
                }
                return 'Rs ' + value.y;
              }
            }
          }],

        },

        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              type: "time",
              time: {
                displayFormats: {
                  'millisecond': 'MMM DD',
                  'second': 'MMM DD',
                  'minute': 'MMM DD',
                  'hour': 'MMM DD',
                  'day': 'MMM DD',
                  'week': 'MMM DD',
                  'month': 'MMM',
                  'quarter': 'MMM DD',
                  'year': 'MMM DD',
                },
                unit: "month"
              },
              ticks: {
                autoSkip: false,
                maxRotation: 45,
                minRotation: 45
              }
            }],
            yAxes: [{
              ticks: {
                // Create scientific notation labels
                callback: function (value, index, values) {
                  if (value >= 1000) {
                    value = value / 1000;
                    return  value + 'k';
                  }
                  return value;

                }
              }
            }]
          },
        }
      };
      var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('cases-chart');
      var ctx: CanvasRenderingContext2D = canvas.getContext("2d");

      if (this.caseschart) {

        this.caseschart.destroy();
        this.caseschart = new Chart(ctx, config);
      }
      else {
        this.caseschart = new Chart(ctx, config);
      }
    } catch (error) {
      console.log(error);
    }
  }

  selectCaseTab(value) {
    this.selectedTab = value;
    if (this.selectedTab == 'year') {
      this.yearColor = 'orange';
      this.dateColor = '';
      this.endDate = '';
      this.selectedYear = new Date().getFullYear().toString();

    }
    else {
      this.yearColor = '';
      this.dateColor = 'orange';
    }
  }

  tabClick(tab){
    if(tab.tab.textLabel=='For Institutional Cases'){
      const ob= new ForinstCaseChartComponent(this._caseService);
      ob.ngOnInit(); 
    }
    else if(tab.tab.textLabel=='Against Institutional Cases'){
      const ob= new AgainstinstCaseChartComponent(this._caseService);
      ob.ngOnInit(); 
    }
  }

}
