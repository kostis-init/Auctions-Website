import {Component, OnInit,} from '@angular/core';
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


@Component({
  selector: 'app-new-action',
  templateUrl: './new-auction.component.html',
  styleUrls: ['./new-auction.component.css']
})
export class NewAuctionComponent implements OnInit{

  AuctionForm:FormGroup;
  CurrDate = new Date();
  SetBuyPrice= false;
  time: NgbTimeStruct = {hour: 0, minute:0,second:0};
  SubCategories$:Observable<SubCategoryModel[]>;
  state$:Observable<MainPageState>;
  categorySelected:boolean;


  constructor(private store:Store<AppState>, private fb: FormBuilder, private datePipe: DatePipe) { }

  getControls(){
    return (this.AuctionForm.get('SubCategory') as FormArray).controls;
  }

  ngOnInit() {
    this.state$ = this.store.select('mainPage');
    this.AuctionForm = this.fb.group({
      ['name']: this.fb.control('',[Validators.required]),

      ['Cat']:this.fb.group({
        ['Category']: this.fb.control('',[Validators.required]),
        ['SubCategory']: this.fb.array([],[Validators.required]),
      },{validators:this.setSubCategories.bind(this), updateOn:"blur"}),


      ['BuyPrice']: this.fb.control(null),

      ['StartingBid']: this.fb.control('',
        [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),

      ['Description']: this.fb.control('',[Validators.required]),


      ['Location']:this.fb.group({
        ['Lot']:this.fb.control('',[Validators.required]),
        ['Lat']:this.fb.control('',[Validators.required])
      }),

      ['StartDate']:this.fb.group({
        ['STDate']: this.fb.control( null,[Validators.required]),
        ['STTime']: this.fb.control(null,[Validators.required])
      },{validators:this.CheckStartTime.bind(this)}),

      ['EndDate']:this.fb.group({
        ['ENDate']: this.fb.control( null,[Validators.required]),
        ['ENTime']: this.fb.control(null,[Validators.required])
      }),

      ['Image']:this.fb.control(null,[Validators.required])
    })


  }

  setSubCategories(fg:FormGroup) {
    const selectedCategory = fg.get('Category').value;
    if(selectedCategory!=''){
      this.SubCategories$ = this.store.pipe(
        select('mainPage'),
        map((state:MainPageState) =>{
          return state.Categories;
        }),
        map((categories:CategoryModel[])=>{
          return categories.find((category:CategoryModel)=> category.name === selectedCategory);
        }),
        map((category: CategoryModel)=>{
          const Array =(fg.get('SubCategory') as FormArray);
          Array.clear();
          for(let SubCategory of category.SubCategories){
            Array.push(this.fb.group({
              [SubCategory.name]: this.fb.control('')
            }))
          }
          return category.SubCategories;
        })
      );
      this.categorySelected=true;
    }
  }

  CheckStartTime(fg: FormGroup){
    if(fg.get('STDate').value && fg.get('STTime').value){

      let SelectedDate = fg.get('STDate').value;
      let SelectedTime = fg.get('STTime').value;
      let FullDate =new Date(
        SelectedDate.year,
        SelectedDate.month-1,
        SelectedDate.day,
        SelectedTime.hour,
        SelectedTime.minute,
        0);

      if(FullDate.valueOf() < Date.now()){
        return {'InvalidStart': true}
      }
      return null;
    }
  }

  CheckEndTime(){
    let StartDate = this.AuctionForm.value.StartDate.STDate;
    let StartTime = this.AuctionForm.value.StartDate.STTime;
    let EndDate = this.AuctionForm.value.EndDate.ENDate;
    let EndTime = this.AuctionForm.value.EndDate.ENTime;
    if(StartDate && EndTime && StartTime && EndDate){


      let FullStart = new Date(
        StartDate.year,
        StartDate.month-1,
        StartDate.day,
        StartTime.hour,
        StartTime.minute,
        0
      );

      let FullEnd = new Date(
        EndDate.year,
        EndDate.month-1,
        EndDate.day,
        EndTime.hour,
        EndTime.minute,
        0
      );


      if(FullStart.valueOf() >= FullEnd.valueOf()){
        this.AuctionForm.get('EndDate').setErrors({InvalidEnd:true});
        return false;
      }
      return true;
    }
  }

  ToggleBuyPrice(){
    this.AuctionForm.get('BuyPrice').clearValidators();
    this.SetBuyPrice = !this.SetBuyPrice;
    this.AuctionForm.get('BuyPrice').setValue(null);
    if(this.SetBuyPrice){
      this.AuctionForm.get('BuyPrice').setValidators(
        [Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)]);
      this.AuctionForm.get('BuyPrice').reset();
    }
  }

  Setlot(value: number) {
    this.AuctionForm.get('Location').get('Lot').patchValue(value);
  }

  Setlat(value:number){
    this.AuctionForm.get('Location').get('Lat').patchValue(value);
  }

  onSubmit(){
    if(this.CheckEndTime())
      console.log(this.AuctionForm.value);
  }

}
