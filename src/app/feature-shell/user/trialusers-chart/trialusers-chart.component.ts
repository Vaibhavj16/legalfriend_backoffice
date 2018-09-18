import { SystemdashboardService } from './../../systemdashboard/systemdashboard.service';
import { UserService } from './../user.service';
import { Chart } from 'chart.js';
import { Component, OnInit } from '@angular/core';
declare let $;

@Component({
  selector: 'app-trialusers-chart',
  templateUrl: './trialusers-chart.component.html',
  styleUrls: ['./trialusers-chart.component.css'],
  providers: [UserService]
})
export class TrialusersChartComponent implements OnInit {

  data = [];
  selectedYear: string;
  selectedTab: string = 'year';
  yearColor: string = 'orange';
  dateColor: string = '';
  endDate: string = '';
  trialuserschart;
  constructor(private _userService: UserService) { }

  ngOnInit() {
    this.selectedYear = new Date().getFullYear().toString();
    this.initTrialUsersChart();
    var $this = this;

    $('#trialyearpicker').datepicker({
      format: 'yyyy',
      viewMode: 'years',
      minViewMode: 'years',
    });
    $('#trialyearpicker').change(function () {
      console.log('yearpicker');
      $this.selectedYear = $(this).val();
      $this.initTrialUsersChart()
    });


    $('#trialusersFilter').daterangepicker({
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
        $this.initTrialUsersChart();
      }
    );
  
  }
  getFormattedDate(value): string {
    var date = new Date(value);
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  }

  initTrialUsersChart() {

    if(this.endDate){
      this._userService.getTrialUsersByDate(this.selectedYear,this.endDate).subscribe(
        result => {
          this.data = result;
          this.trialUsersChart();
        }
      );
    }
    else{
      this._userService.getTrialUsers(this.selectedYear).subscribe(
        result => {
          this.data = result;
          this.trialUsersChart();
        }
      );
    }
 
  }

  
  trialUsersChart() {
    try {
      var $this = this;
      var config = {
        type: 'line',
        data: {
          labels: this.data,
          datasets: [{
            label: "Trial Users",
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
                  return value.y + 'k';
                }
                return value.y;
              }
            }
          }],

        },

        options: {
          legend: {
            display: true
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
      var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('trialusers-chart');
      var ctx: CanvasRenderingContext2D = canvas.getContext("2d");

      if (this.trialuserschart) {

        this.trialuserschart.destroy();
        this.trialuserschart = new Chart(ctx, config);
      }
      else {
        this.trialuserschart = new Chart(ctx, config);
      }
    } catch (error) {
      console.log(error);
    }
  }

  selectTrialTab(value) {
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
