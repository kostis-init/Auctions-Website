import { Component, OnInit } from '@angular/core';
import {CategoryItemModel} from "./Category-item.model";

@Component({
  selector: 'app-home-categories',
  templateUrl: './home-categories.component.html',
  styleUrls: ['./home-categories.component.css']
})
export class HomeCategoriesComponent implements OnInit {

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


  constructor() { }

  ngOnInit() {
  }

}
