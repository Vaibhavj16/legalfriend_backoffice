import { Chart } from 'chart.js';
import { CaseService } from './../case.service';
import { Component, OnInit, ViewChild } from '@angular/core';
declare let $;
@Component({
  selector: 'app-forinst-case-chart',
  templateUrl: './forinst-case-chart.component.html',
  styleUrls: ['./forinst-case-chart.component.css'],
  providers: [CaseService]
})
export class ForinstCaseChartComponent implements OnInit {

  data = [];
  selectedYear: string;
  selectedTab: string = 'year';
  yearColor: string = 'orange';
  dateColor: string = '';
  endDate: string = '';
  forcaseschart;


  constructor(private _caseService: CaseService) { }

  ngOnInit() {
    this.selectedYear = new Date().getFullYear().toString();
    var $this = this;

    $('#foryearpicker').datepicker({
      format: 'yyyy',
      viewMode: 'years',
      minViewMode: 'years',
    });
    $('#foryearpicker').change(function () {
      $this.selectedYear = $(this).val();
      $this.initForCaseChart()
    });


    $('#forcasesFilter').daterangepicker({
      autoApply: true,
      locale: {
        format: 'YYYY-MM-DD'
      }
    },
      function (start, end) {
        $this.selectedYear = $this.getFormattedDate(start);
        $this.endDate = $this.getFormattedDate(end);
        $this.initForCaseChart();
      }
    );

  this.initForCaseChart();
  }
  getFormattedDate(value): string {
    var date = new Date(value);
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  }

  initForCaseChart() {

    if(this.endDate){
      this._caseService.getForCasesByDate(this.selectedYear,this.endDate).subscribe(
        result => {
          this.data = result;
          this.forCaseChart();
        }
      );
    }
    else{
      this._caseService.getForCasesByYear(this.selectedYear).subscribe(
        result => {
          this.data = result;
          this.forCaseChart();
        }
      );
    }
 
  }

  
  forCaseChart() {
    try {
      var $this = this;
      var config = {
        type: 'line',
        data: {
          labels: this.data,
          datasets: [{
            label: "For Institutional Cases",
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
      var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('forcases-chart');;
      var ctx: CanvasRenderingContext2D = canvas.getContext("2d");

      if (this.forcaseschart) {

        this.forcaseschart.destroy();
        this.forcaseschart = new Chart(ctx, config);
      }
      else {
        this.forcaseschart = new Chart(ctx, config);
      }
    } catch (error) {
      console.log(error);
    }
  }

  selectForCaseTab(value) {
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
  
}
