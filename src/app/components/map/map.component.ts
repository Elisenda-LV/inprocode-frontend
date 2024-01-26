import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { MapService } from '../../services/map.service';
import { Map } from '../../interfaces/map.interface';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})


export class MapComponent implements OnInit{



  constructor( public mapService: MapService ){}

  ngOnInit(): void {

  }

  public showMap(){



  }



}
