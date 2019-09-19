import {Component, ElementRef, OnInit,} from '@angular/core';
import {NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {select, Store} from "@ngrx/store";
import {MainPageState} from "../store/main-page.reducer";
import {Observable} from "rxjs";
import {AppState} from "../../store/app.reducer";
import {CategoryModel} from "../../shared/Models/category.model";
import {map, tap} from "rxjs/operators";
import {SubCategoryModel} from "../../shared/Models/subCategory.model";
import {DatePipe} from "@angular/common";
import {Router} from "@angular/router";
import {SaveAuctionService} from "../../shared/new-auction-form/save-auction.service";


@Component({
  selector: 'app-new-action',
  templateUrl: './new-auction.component.html',
  styleUrls: ['./new-auction.component.css']
})
export class NewAuctionComponent implements OnInit{
  ngOnInit(): void {
  }

  constructor(){}
}
