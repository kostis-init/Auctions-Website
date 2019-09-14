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

  markerStyle = new ol.style.Style({
    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
      anchor: [0.5, 46],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      opacity: 0.75,
      src: 'https://openlayers.org/en/v4.6.4/examples/data/icon.png'
    }))
  });

  markerSource = new ol.source.Vector;

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
        }),
        new ol.layer.Vector({
          source:this.markerSource,
          stye:this.markerStyle
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([73.8567, 18.5204]),
        zoom: 5
      })
    });
  }


  getLotLat(args){

    var coordinate =this.map.getEventCoordinate(args);
    var lonlat = ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326');

    this.markerSource.clear();
    var iconFeature = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.transform([lonlat[0], lonlat[1]], 'EPSG:4326',
        'EPSG:3857')),
      name: 'Null Island',
      population: 4000,
      rainfall: 500
    });

    this.markerSource.addFeature(iconFeature);

    this.GetLot.emit(lonlat[0]);
    this.GetLat.emit(lonlat[1]);

  }

}
