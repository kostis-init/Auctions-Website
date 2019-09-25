import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

declare var ol: any;

@Component({
  selector: 'app-open-map',
  templateUrl: './open-map.component.html',
  styleUrls: ['./open-map.component.css']
})
export class OpenMapComponent implements OnInit {

  constructor() { }
  map: any;
  @Input() lon=73.8567;
  @Input() lat=18.5204;
  @Input() Static;
  @Output() GetLat: EventEmitter<any> = new EventEmitter<any>();
  @Output() GetLot: EventEmitter<any> = new EventEmitter<any>();

  markerStyle = new ol.style.Style({
    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
      opacity: 0.75,
      color:'#ffcd46',
      scale: 0.5,
      src: '../../../assets/EBidder_files/point.png'
    }))
  });



  markerSource = new ol.source.Vector;

  ngOnInit() {

    this.markerSource.addFeature(
      new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.transform([this.lon, this.lat], 'EPSG:4326',
          'EPSG:3857')),
        name: 'Null Island',
        population: 4000,
        rainfall: 500
      })
    );



    this.map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        }),
        new ol.layer.Vector({
          source:this.markerSource,
          style:this.markerStyle
        }),
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([this.lon, this.lat]),
        zoom: 5
      })
    });
  }


  getLotLat(args){

  if(!this.Static){
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

}
