import {Actions, Effect, ofType} from "@ngrx/effects";
import {HttpClient} from "@angular/common/http";
import {
  FETCH_CATEGORIES, FETCH_SUBCATEGORIES,
  FetchCategories, FetchSubCategories,
  SET_CATEGORIES, SET_SUBCATEGORIES, SetCategories, SetSubCategory,
} from "./main-page.action";
import {map, mergeMap, switchMap} from "rxjs/operators";
import {CategoryModel} from "../../shared/Models/category.model";
import {categories} from "../../shared/server-endpoints";
import {SubCategoryModel} from "../../shared/Models/subCategory.model";
import {Observable, of} from "rxjs";
import {Store} from "@ngrx/store";
import {MainPageState} from "./main-page.reducer";
import {FetchedCategoriesModel} from "../../shared/Models/FetchedCategories.model";
import {FetchedSubCategoriesModel} from "../../shared/Models/FetchedSubCategories";


export class MainPageEffect {

  constructor(private action$: Actions,
              private http: HttpClient,
              private store: Store<MainPageState>){}

  @Effect()
  FetchCategories = this.action$.pipe(
    ofType(FETCH_CATEGORIES),
    switchMap((action:FetchCategories) =>{
      return this.http.get<FetchedCategoriesModel[]>(categories);
    }),
    map((categories:FetchedCategoriesModel[]) =>{
      let cat:CategoryModel[]=[];
      for (let category of categories){
        cat.push(new CategoryModel(category.name, category.id, category.image));
      }
      return{
        type: SET_CATEGORIES,
        payload: {Categories: cat}
      }
    })
  );


  @Effect()
  SetCategories = this.action$.pipe(
    ofType(SET_CATEGORIES),
    mergeMap((action: SetCategories) =>{
      let res=[];
      for(let category of action.payload.Categories){
        res.push(new FetchSubCategories({GeneralCategoryId: category.id}))
      }
      return res;
    })
  );


  @Effect({dispatch:false})
  fetchSubCategories = this.action$.pipe(
    ofType(FETCH_SUBCATEGORIES),
    switchMap((action:FetchSubCategories) =>{
      return of( [this.http.get<FetchedSubCategoriesModel[]>(categories + '/' + action.payload.GeneralCategoryId),action])
      }),
    map((res:Array<any>) =>{
      res[0].subscribe((s:FetchedSubCategoriesModel[])=>{
        let result:SubCategoryModel[]=[];
        for(let subCategory of s)
          result.push(new SubCategoryModel(subCategory.name,subCategory.id, subCategory.image));
        this.store.dispatch(new SetSubCategory({SubCategories: result, GeneralCategoryId: res[1].payload.GeneralCategoryId}))
      });
    }),


  )
}
