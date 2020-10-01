import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { History } from 'src/app/models/history.model';
import { BookService } from 'src/app/services/book.service';
import { HistoryService } from 'src/app/services/history.service';
import { MagazineService } from 'src/app/services/magazine.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
  providers: [HistoryService, BookService, MagazineService, UserService]
})
export class ReportsComponent implements OnInit {
  public status: string;
  public histories: History[];
  public chart  = {
    type: '',
  };
  public report = {
    action: '',
    isBook: null,
  };

  public chartOptions = {
    scaleShowVerticalLines: true,
    responsive:             true,
  };
  public chartLabels: string[]  = [];
  public chartData: number[]    = [];
  public chartColors: string[]  = ["red", "blue", "green", "blue", "red", "blue"];

  public barChartLegend         = false;
  public doughnutChartLegend    = true;
  public barChartType           = 'bar';
  public doughnutChartType      = 'doughnut';
  public chartTypes             = [
    { type: 'bar' }, { type: 'doughnut' }
  ];
  public reportTypes            = [
    { type: 'SEARCH' }, { type: 'REQUEST' } 
  ];
  public objectTypes            = [
    { type: 'MAGAZINE' }, { type: 'BOOK' } 
  ];

  public classes = {
    displayD: 'd-none',
    displayB: 'd-none',
  }

  constructor(
    private _historyService:  HistoryService,
    private _bookService:     BookService,
    private _magazineService: MagazineService,
    private _userService: UserService,
    private _router:      Router
  ) { }

  ngOnInit(): void {
    if (!this._userService.getIdentity() || !this._userService.getToken()) {
      this._router.navigate(['']);
    } else {
      if (this._userService.getIdentity().role != "admin") {
        this._router.navigate(['home']);

      }
    }
  }

  loadDataForChart: () => void = () => {
    if (this.chart.type == '' || this.report.action == '' || this.report.isBook == null) {
      alert("Please select one option for all fields");
    } else {
      this._historyService.listHistories().subscribe(
        response => {
          if (!response.histories) {
            this.status = "error";
          } else {
            this.status = "ok";
            this.histories = response.histories;
            this.loadChartData();
          }
        },
        error => this.onError(error)
      );
    }
  }

  loadChartData: () => void = () => {
    var filteredHistories = this.histories.filter(history => {
      return history.isBook.toString() == this.report.isBook && history.action == this.report.action;
    });
    if (filteredHistories.length <= 0) {
      alert("There are not elements to show on report!");
      this.clearFields();
    } else {
      var sortedHistories = this.sortHistoriesById(filteredHistories);
      var objectsCount    = this.getCountedObjects(sortedHistories);
      this.chartData      = [];
      this.chartLabels    = [];
      objectsCount.forEach((objCount) => {
        this.chartData.push(objCount.count);
        this.chartLabels.push(objCount.id);
      });
      console.log(objectsCount);
      this.showSelectedChart();
    }
  }

  getCountedObjects: (histories: History[], mostFive?: Array<IObjectCount>) => Array<IObjectCount> = (histories, mostFive = []) => {
    var currentId = "";
    var currentCount = 0;
    for (let i = 0; i < histories.length; i++) {
      if (currentId != histories[i].bookOrMagazineId) {
        currentId = histories[i].bookOrMagazineId;
        currentCount = 0;
      }
      currentCount++;
      if (histories[i + 1]) {
        if (currentId != histories[i + 1].bookOrMagazineId) {
          mostFive.push({
            id: currentId,
            count: currentCount,
          });
        }
      }
    }
    return mostFive;
  }

  showSelectedChart: () => void = () => {
    if (this.chart.type == "bar") {
      this.classes.displayB = "d-block";
      this.classes.displayD = "d-none";
    } else {
      this.classes.displayB = "d-none";
      this.classes.displayD = "d-block";
    }
  }

  sortHistoriesById: (histories: History[]) => History[] = (histories) => {
    return histories.sort((a, b) => a.bookOrMagazineId.localeCompare(b.bookOrMagazineId));
  }

  clearFields: () => void = () => {
    this.report.action  = '';
    this.report.isBook  = null;
    this.chart.type     = '';
  }

  onError: (error: any) => void = (error) => {
    var errorMessage = <any>error;
    if (errorMessage != null) {
      this.status = 'error';
    }
  }
}

export interface IObjectCount {
  id:     string,
  count:  number,
}