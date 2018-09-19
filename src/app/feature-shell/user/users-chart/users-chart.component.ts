import { UserService } from './../user.service';
import { Chart } from 'chart.js';
import { Component, OnInit } from '@angular/core';
declare let $;

@Component({
  selector: 'app-users-chart',
  templateUrl: './users-chart.component.html',
  styleUrls: ['./users-chart.component.css'],
  providers: [UserService]
})
export class UsersChartComponent implements OnInit {

  data = [];
  selectedYear: string;
  selectedTab: string = 'year';
  yearColor: string = 'orange';
  dateColor: string = '';
  endDate: string = '';
  forcaseschart;
  constructor(private _userService: UserService) { }

  ngOnInit() {
    this.selectedYear = new Date().getFullYear().toString();
    this.initUsersChart();
    var $this = this;

    $('#userchartyearpicker').datepicker({
      format: 'yyyy',
      viewMode: 'years',
      minViewMode: 'years',
    });
    $('#userchartyearpicker').change(function () {
      console.log('yearpicker');
      $this.selectedYear = $(this).val();
      $this.initUsersChart()
    });


    $('#userchartFilter').daterangepicker({
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
        $this.initUsersChart();
      }
    );

  }
  
  getFormattedDate(value): string {
    var date = new Date(value);
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  }

  initUsersChart() {

    if(this.endDate){
      this._userService.getPremiumUsersByDate(this.selectedYear,this.endDate).subscribe(
        result => {
          this.data = result;
          this.usersChart();
        }
      );
    }
    else{
      this._userService.getPremiumUsers(this.selectedYear).subscribe(
        result => {
          this.data = result;
          this.usersChart();
        }
      );
    }
 
  }

  
  usersChart() {
    try {
      var $this = this;
      var config = {
        type: 'line',
        data: {
          labels: this.data,
          datasets: [{
            label: "Users",
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
      var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('users-chart');
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

  selectUsersTab(value) {
    this.selectedTab = value;
    if (this.selectedTab == 'year') {
      this.yearColor = 'orange';
      this.dateColor = '';
      this.endDate = '';
      this.selectedYear = new Date().getFullYear().toString();
      this.initUsersChart();
    }
    else {
      this.yearColor = '';
      this.dateColor = 'orange';
    }
  }
  
}
