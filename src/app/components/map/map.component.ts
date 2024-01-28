import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { MapService } from '../../services/map.service';
import  Mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})


export class MapComponent implements OnInit{

  map!: Mapboxgl.Map;
  markers: Mapboxgl.Marker[] = [];
  legendOptions: string[] = ['Football','Basketball','Padel'];
  selectedCategory: string = 'All'; //show all category stadium

  constructor( public mapService: MapService ){}

  ngOnInit(){

    Mapboxgl.accessToken = environment.mabpoxKey;

    this.map = new Mapboxgl.Map({
	    container: 'map',
	    style: 'mapbox://styles/mapbox/streets-v12',
	    center: [2.4176466, 41.5403151], // starting position [lng, lat]
	    zoom: 12,
    });

    this.map.on('load', () => {
      this.showMarkers();


    })

  }

  //Show all markers:

  showMarkers(){
    this.mapService.getMarkers().subscribe(fields => {
      fields.forEach(field => {
        const marker = new Mapboxgl.Marker({
          color: "#671cde",
        })
          .setLngLat([field.longitude, field.latitude])
          .addTo(this.map);

        this.markers.push(marker);

      })
    })

  }


  //Show legend:

/*   setupLegend(){
    const legend = document.getElementById('legend');

    this.legendOptions.forEach(category => {
      const item = document.createElement('div');
      item.className = 'legend-item';
      item.innerHTML = category;

      item.addEventListener('click', () => this.filterMakers(category));

      legend?.appendChild(item);

    });

  } */

  //Filter mark categories:

  /* filterMakers(category: string){
    this.selectedCategory = category;

    //Delete markers
    this.markers.forEach(marker => {
      marker.remove();
    })

    this.markers = [];

    if (category === 'All'){
      this.showMarkers() //show all makers:

    } else {
      this.mapService.getStadiumCategory(category).subscribe(stadiums => {
        stadiums.forEach(stadium => {
          const marker = new Mapboxgl.Marker()
            .setLngLat([stadium.longitude, stadium.latitude])
            .addTo(this.map);

          this.markers.push(marker);
        })
      })
    }
  } */
}
