import { Component, OnInit } from '@angular/core';
import {slideInAnimation} from "../shared/animations";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
@Component({
  selector: 'app-home',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {

  categoryUrl: string;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  getCategories(){
    this.categoryUrl = 'category';
    return this.http.get(this.categoryUrl);
  }

}
