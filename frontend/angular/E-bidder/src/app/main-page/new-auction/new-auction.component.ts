import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {select, Store} from "@ngrx/store";
import {MainPageState} from "../store/main-page.reducer";
import {Observable} from "rxjs";
import {AppState} from "../../store/app.reducer";
import {CategoryModel} from "../../shared/Models/category.model";


@Component({
  selector: 'app-new-action',
  templateUrl: './new-auction.component.html',
  styleUrls: ['./new-auction.component.css']
})
export class NewAuctionComponent implements OnInit{

  AuctionForm:FormGroup;
  time: NgbTimeStruct = {hour: 0, minute:0,second:0};
  seconds = true;
  model;
  lot:number;
  lat:number;
  SelectedCategory$:Observable<CategoryModel>;
  state$:Observable<MainPageState>;


  constructor(private fb:FormBuilder,private store:Store<AppState>) { }

  ngOnInit() {
    this.state$ = this.store.select('mainPage');
    this.AuctionForm = this.fb.group({

      name: ['', Validators.required],

      Cat: this.fb.group({
        Category:['', Validators.required],
        SubCategory:['BLa',Validators.required],
      },{updateOn:"submit"}),

      BuyPrice:['',Validators.required],
      StartingBid:['',Validators.required],
      Description:['',Validators.required],
    })
  }

  setSubCategories(fg:FormGroup) {
    const selectedCategory = fg.get('Control').value;
    // this.SelectedCategory$ = this.store.select(selectSub,{name:selectedCategory});


  }


  Setlot(value: number) {
    this.lot = value;
  }

  Setlat(value:number){
    this.lat =value;
  }

  onSubmit(){
    console.log(this.AuctionForm.value);
  }

}
