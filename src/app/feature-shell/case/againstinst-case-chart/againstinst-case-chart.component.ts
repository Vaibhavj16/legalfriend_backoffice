import { Chart } from 'chart.js';
import { CaseService } from './../case.service';
import { Component, OnInit } from '@angular/core';
declare let $;

@Component({
  selector: 'app-againstinst-case-chart',
  templateUrl: './againstinst-case-chart.component.html',
  styleUrls: ['./againstinst-case-chart.component.css'],
  providers: [CaseService]
})
export class AgainstinstCaseChartComponent implements OnInit {

  data = [];
  againstselectedYear: string;
  selectedTab: string = 'year';
  yearColor: string = 'orange';
  dateColor: string = '';
  years = [];
  minYear = 2015;
  endDate: string = '';
  forcaseschart;
  constructor(private _caseService: CaseService) { }

  ngAfterViewInit(){
    
  }

  ngOnInit() {
    this.againstselectedYear = new Date().getFullYear().toString();

    var $this = this;

    //setTimeout(() => {

      this.initAgainstCaseChartChart();
      $('#againstyearpicker').datepicker({
        format: 'yyyy',
        viewMode: 'years',
        minViewMode: 'years',
      });
      $('#againstyearpicker').change(function () {
        console.log('yearpicker');
        $this.againstselectedYear = $(this).val();
        $this.initAgainstCaseChartChart()
      });
  
  
      $('#againstcasesFilter').daterangepicker({
        autoApply: true,
        locale: {
          format: 'YYYY-MM-DD'
        }
      },
        function (start, end) {
          $this.againstselectedYear = $this.getFormattedDate(start);
          $this.endDate = $this.getFormattedDate(end);
          console.log($this.againstselectedYear);
          console.log($this.endDate);
          $this.initAgainstCaseChartChart();
        }
      );
  //  }, 3000);
  

  }
  getFormattedDate(value): string {
    var date = new Date(value);
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  }

  initAgainstCaseChartChart() {

    if(this.endDate){
      this._caseService.getAgainstCasesByDate(this.againstselectedYear,this.endDate).subscribe(
        result => {
          this.data = result;
          this.againstCaseChart();
        }
      );
    }
    else{
      this._caseService.getAgainstCasesByYear(this.againstselectedYear).subscribe(
        result => {
          this.data = result;
          this.againstCaseChart();
        }
      );
    }
  
  }

  
  againstCaseChart() {
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
      var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('againstcases-chart');
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

  selectAgainstCaseTab(value) {
    this.selectedTab = value;
    if (this.selectedTab == 'year') {
      this.yearColor = 'orange';
      this.dateColor = '';
      this.endDate = '';
      this.againstselectedYear = new Date().getFullYear().toString();
    }
    else {
      this.yearColor = '';
      this.dateColor = 'orange';
    }
  }
  

}
