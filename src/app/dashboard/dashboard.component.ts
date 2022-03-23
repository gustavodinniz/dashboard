import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

declare var google: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private data: any;
  private histogramData: any;
  private comboData: any;
  private areaData: any;
  private lineData: any;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {

    this.dataService.getData().subscribe(
      data => {
        this.data = data;
        this.init();
      }
    )

    this.dataService.getHistogramData().subscribe(
      histogramData => {
        this.histogramData = histogramData;
        this.init();
      }
    )

    this.dataService.getComboData().subscribe(
      comboData => {
        this.comboData = comboData;
        this.init();
      }
    )

    this.dataService.getAreaData().subscribe(
      areaData => {
        this.areaData = areaData;
        this.init();
      }
    )

    this.dataService.getLineData().subscribe(
      lineData => {
        this.lineData = lineData;
        this.init();
      }
    )

  }

  init(): void {
    if (typeof (google) !== 'undefined') {
      google.charts.load('current', { 'packages': ['corechart'] });
      setTimeout(() => {
        google.charts.setOnLoadCallback(this.showGraphics());
      }, 1000)
    }
  }

  showGraphics(): void {
    this.showPieChart();
    this.show3dPieChart();
    this.showBarChart();
    this.showLineChart();
    this.showColumnChart();
    this.showDonutChart();
    this.showScatterChart();
    this.showHistogram();
    this.showComboChart();
    this.showAreaChart();
    this.showALineChart();
  }

  showPieChart(): void {
    const el = document.getElementById('pie_chart');
    const chart = new google.visualization.PieChart(el);

    chart.draw(this.getDataTable(), this.getOptions());
  }

  show3dPieChart(): void {
    const el = document.getElementById('3d_pie_chart');
    const chart = new google.visualization.PieChart(el);
    const options = this.getOptions();

    options['is3D'] = true;
    chart.draw(this.getDataTable(), options);
  }

  showDonutChart(): void {
    const el = document.getElementById('donut_chart');
    const chart = new google.visualization.PieChart(el);
    const options = this.getOptions();

    options['pieHole'] = 0.4;
    chart.draw(this.getDataTable(), options);
  }

  showBarChart(): void {
    const el = document.getElementById('bar_chart');
    const chart = new google.visualization.BarChart(el);

    chart.draw(this.getDataTable(), this.getOptions());
  }

  showLineChart(): void {
    const el = document.getElementById('line_chart');
    const chart = new google.visualization.LineChart(el);

    chart.draw(this.getDataTable(), this.getOptions());
  }

  showColumnChart(): void {
    const el = document.getElementById('column_chart');
    const chart = new google.visualization.ColumnChart(el);

    chart.draw(this.getDataTable(), this.getOptions());
  }

  showScatterChart(): void {
    const el = document.getElementById('scatter_chart');
    const chart = new google.visualization.ScatterChart(el);

    chart.draw(this.getDataTable(), this.getScatterOptions());
  }

  showHistogram(): void {
    const el = document.getElementById('histogram');
    const chart = new google.visualization.Histogram(el);

    chart.draw(this.getHistogramDataTable(), this.getHistogramOptions());
  }

  showComboChart(): void {
    const el = document.getElementById('combo_chart');
    const chart = new google.visualization.ComboChart(el);

    chart.draw(this.getComboChartDataTable(), this.getComboChartOptions());
  }

  showAreaChart(): void {
    const el = document.getElementById('area_chart');
    const chart = new google.visualization.SteppedAreaChart(el);

    chart.draw(this.getAreaChartDataTable(), this.getAreaChartOptions());
  }

  showALineChart(): void {
    const el = document.getElementById('lineData_chart');
    const chart = new google.visualization.LineChart(el);

    chart.draw(this.getLineChartDataTable(), this.getLineChartOptions());
  }

  getDataTable(): any {
    const data = new google.visualization.DataTable();

    data.addColumn('string', 'Mês');
    data.addColumn('number', 'Quantidade');
    data.addRows(this.data);

    return data;
  }

  getOptions(): any {
    return {
      'title': 'Quantidade de Cadastros Primeiro Semestre',
      'width': 400,
      'height': 300,
    };
  }

  getHistogramDataTable(): any {
    const data = new google.visualization.DataTable();

    data.addColumn('string', 'Dinosaur');
    data.addColumn('number', 'Length');
    data.addRows(this.histogramData);

    return data;
  }

  getHistogramOptions(): any {
    return {
      'title': 'Lengths of dinosaurs, in meters',
      'width': 400,
      'height': 300,
    };
  }

  getComboChartDataTable(): any {
    const data = new google.visualization.DataTable();

    data.addColumn('string', 'Month');
    data.addColumn('number', 'Bolivia');
    data.addColumn('number', 'Ecuador');
    data.addColumn('number', 'Madagascar');
    data.addColumn('number', 'Papua New Guinea');
    data.addColumn('number', 'Rwanda');
    data.addColumn('number', 'Average');
    data.addRows(this.comboData);

    return data;
  }

  getComboChartOptions(): any {
    return {
      'title': 'Monthly Coffee Production by Country',
      'vAxis': { title: 'Cups' },
      'hAxis': { title: 'Month' },
      'seriesType': 'bars',
      'series': { 5: { type: 'line' } },
      'width': 800,
      'height': 600,
    };
  }

  getAreaChartDataTable(): any {
    const data = new google.visualization.DataTable();

    data.addColumn('string', 'Director (Year)');
    data.addColumn('number', 'Rotten Tomatoes');
    data.addColumn('number', 'IMDB');
    data.addRows(this.areaData);

    return data;
  }

  getAreaChartOptions(): any {
    return {
      'title': 'The decline of \'The 39 Steps\'',
      'vAxis': { title: 'Accumulated Rating' },
      'isStacked': true,
      'width': 800,
      'height': 600,
    };
  }

  getLineChartDataTable(): any {
    const data = new google.visualization.DataTable();

    data.addColumn('string', 'Year');
    data.addColumn('number', 'Sales');
    data.addColumn('number', 'Expenses');
    data.addRows(this.lineData);

    return data;
  }

  getLineChartOptions(): any {
    return {
      'title': 'Company Performance',
      'curveType': 'function',
      'width': 800,
      'height': 600,
    };
  }

  getScatterOptions(): any {
    return {
      'title': 'Age vs. Weight comparison',
      'hAxis': { title: 'Mes', minValue: 0, maxValue: 15 },
      'vAxis': { title: 'Quantidade', minValue: 0, maxValue: 15 },
      'legend': 'none',
      'width': 400,
      'height': 300,
    };
  }

}
