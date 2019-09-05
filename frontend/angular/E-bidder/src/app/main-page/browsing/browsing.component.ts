import { Component, OnInit } from '@angular/core';
import {ItemModel} from "./item.model";

@Component({
  selector: 'app-browsing',
  templateUrl: './browsing.component.html',
  styleUrls: ['./browsing.component.css']
})
export class BrowsingComponent implements OnInit {

  Items: ItemModel[] = [
    new ItemModel(
      '../../assets/item_images/iphone6s.jpg',
      'I-Phone 6s',
      'Make it so, starlight travelEcce.Clemens particulas ducunt ad vox.cubiculum',
      50
    ),

    new ItemModel(
      '../../assets/item_images/iphonex.jpg',
      'I-Phone X',
      'Make it so, starlight travelEcce.Clemens particulas ducunt ad vox.cubiculum',
      50
    ),

    new ItemModel(
      '../../assets/item_images/samsung_s10.jpg',
      'Samsung S10+',
      'Make it so, starlight travelEcce.Clemens particulas ducunt ad vox.cubiculum',
      50
    ),

    new ItemModel(
      '../../assets/item_images/samsung_a70.jpg',
      'Samsung A70',
      'Make it so, starlight travelEcce.Clemens particulas ducunt ad vox.cubiculum',
      50
    )
  ];


  constructor() { }

  ngOnInit() {
  }

}
