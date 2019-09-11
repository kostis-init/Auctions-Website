import { Component, OnInit } from '@angular/core';
import {CategoryItemModel} from "../home-categories/Category-item.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-shop_by',
  templateUrl: './shop_by.component.html',
  styleUrls: ['./shop_by.component.css']
})
export class Shop_byComponent implements OnInit {

  Items: CategoryItemModel[] = [
    new CategoryItemModel(
      '../../assets/category_images/tech.jpg',
      'Tech',
      'Make it so, starlight travelEcce.Clemens particulas ducunt ad vox.cubiculum'),

    new CategoryItemModel(
      '../../assets/category_images/clothing.jpg',
      'Clothing',
      'Make it so, starlight travelEcce.Clemens particulas ducunt ad vox.cubiculum'
    ),

    new CategoryItemModel(
      '../../assets/category_images/house.jpg',
      'House',
      'Make it so, starlight travelEcce.Clemens particulas ducunt ad vox.cubiculum'
    ),

    new CategoryItemModel(
      '../../assets/category_images/sports.jpg',
      'Sports',
      'Make it so, starlight travelEcce.Clemens particulas ducunt ad vox.cubiculum'
    ),

    new CategoryItemModel(
      '../../assets/category_images/music.jpg',
      'Music',
      'Make it so, starlight travelEcce.Clemens particulas ducunt ad vox.cubiculum'
    ),

    new CategoryItemModel(
      '../../assets/category_images/car.jpg',
      'Auto-Moto',
      'Make it so, starlight travelEcce.Clemens particulas ducunt ad vox.cubiculum'
    )
  ];


  constructor(private router : Router) { }

  ngOnInit() {
  }

}
