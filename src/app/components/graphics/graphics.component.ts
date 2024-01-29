import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgChartsModule } from 'ng2-charts';

import { GraphicsService } from '../../services/graphics.service';
import { ChartDataset, ChartOptions } from 'chart.js';
import { Graphic } from '../../interfaces/graphic.interface';

import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-graphics',
  standalone: true,
  imports: [FormsModule, NgChartsModule],
  templateUrl: './graphics.component.html',
  styleUrl: './graphics.component.scss'
})
export class GraphicsComponent implements OnInit {

  goalsData: Graphic[] = [];


  constructor(public graphicService: GraphicsService){}

  ngOnInit(): void {
    this.showData()

  }

  showData(){
    this.graphicService.showGraphics().subscribe(
      (data: Graphic[]) => {
        this.goalsData = data;
        this.renderBarChart();
        this.renderLineChart();
      },
      (error) => {
        console.error('Error fetching sales data:', error);
      }
    );
  }

  renderBarChart(){
    const ctx = document.getElementById('barChart') as HTMLCanvasElement;

    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.goalsData.map(goal => goal.club.toString()),
        datasets: [{
          label: 'Goals',
          data: this.goalsData.map(goal => goal.goals),
          backgroundColor: "rgba(127, 255, 212, 0.701)",
          borderColor:'#671cde',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  renderLineChart(){
    const ctx = document.getElementById('lineChart') as HTMLCanvasElement;

    const lineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.goalsData.map(goal => goal.club.toString()),
        datasets: [{
          label: 'Goals',
          data: this.goalsData.map(goal => goal.goals),
          borderColor:'#671cde',
          backgroundColor: 'transparent',
          borderWidth: 2,
          pointBackgroundColor: '#671cde',
          pointBorderColor: '#671cde',
          pointHoverBackgroundColor: '#671cde',
          pointHoverBorderColor: '#fff',
          pointRadius: 4,
          pointHoverRadius: 6,
          pointHitRadius: 10,
          pointBorderWidth: 2,
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

}
