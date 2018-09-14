import { CaseService } from './../case.service';
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
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
  invoiceInstitutionLabels = ["Roda", "CRI_CASE", "SEC_25c", "SEC9 RO", "ARB"];
  invoiceInstitutionData = [20, 20, 20, 30, 10];
  pieChart: any;
  selectedTab: string = 'year';
  yearColor: string = 'orange';
  dateColor: string = '';
  years = [];
  minYear = 2015;
  endDate: string = '';
  invoicechart;
  invoicepiechart;
  branches = [];
  selectedBranch;
  constructor(private _caseService: CaseService) { }

  ngOnInit() {
    this.selectedYear = new Date().getFullYear().toString();
    this.initLegalCaseChartChart();
    var $this = this;

    $('#yearpicker').datepicker({
      format: 'yyyy',
      viewMode: 'years',
      minViewMode: 'years',
    });
    $('#yearpicker').change(function () {
      console.log('yearpicker');
      $this.selectedYear = $(this).val();

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
        console.log($this.selectedYear);
        console.log($this.endDate);


      }
    );

  }

  


  getFormattedDate(value): string {
    var date = new Date(value);
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  }

  initLegalCaseChartChart() {

    this._caseService.getAllCasesByMonth(this.selectedYear).subscribe(
      result => {
      //  this.data = result;
        this.legalCaseChart();
      }
    );
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

      if (this.invoicechart) {

        this.invoicechart.destroy();
        this.invoicechart = new Chart(ctx, config);
      }
      else {
        this.invoicechart = new Chart(ctx, config);
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
  
}
