import {Component, EventEmitter, OnInit, Output} from '@angular/core';

declare var ol: any;

@Component({
  selector: 'app-open-map',
  templateUrl: './open-map.component.html',
  styleUrls: ['./open-map.component.css']
})
export class OpenMapComponent implements OnInit {

  constructor() { }
  map: any;
  @Output() GetLat: EventEmitter<any> = new EventEmitter<any>();
  @Output() GetLot: EventEmitter<any> = new EventEmitter<any>();



  ngOnInit() {

    var mousePositionControl = new ol.control.MousePosition({
      coordinateFormat: ol.coordinate.createStringXY(4),
      projection: 'EPSG:4326',
      // comment the following two lines to have the mouse position
      // be placed within the map.
      className: 'custom-mouse-position',
      target: document.getElementById('mouse-position'),
      undefinedHTML: '&nbsp;'
    });

    this.map = new ol.Map({
      target: 'map',
      controls: ol.control.defaults({
        atributionOption: {
          collapsible: false
        }
      }).extend([mousePositionControl]),
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([73.8567, 18.5204]),
        zoom: 8
      })
    });
  }


  getLotLat(args){

    var coordinate =this.map.getEventCoordinate(args);
    var lonlat = ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326');
    this.GetLot.emit(lonlat[0]);
    this.GetLat.emit(lonlat[1]);

  }

}
