import {Actions, Effect, ofType} from "@ngrx/effects";
import {HttpClient} from "@angular/common/http";
import {
  FETCH_CATEGORIES, FETCH_CATEGORIES_WITH_IMAGES, FETCH_SUBCATEGORIES,
  FetchCategories, FetchCategoriesImages, FetchSubCategories,
  SET_CATEGORIES, SET_CATEGORIES_WITH_IMAGES, SET_SUBCATEGORIES, SetCategories, SetSubCategory,
} from "./main-page.action";
import {map, mergeMap, switchMap} from "rxjs/operators";
import {CategoryModel} from "../../shared/Models/category.model";
import {categories, categoryImages, subCategoryImages} from "../../shared/server-endpoints";
import {SubCategoryModel} from "../../shared/Models/subCategory.model";
import {of} from "rxjs";
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
        cat.push(new CategoryModel(category.name, category.id,null));
      }
      return{
        type: SET_CATEGORIES,
        payload: {Categories: cat}
      }
    })
  );

  @Effect()
  FetchCategoriesImages = this.action$.pipe(
    ofType(FETCH_CATEGORIES_WITH_IMAGES),
    switchMap((action:FetchCategories) =>{
      return this.http.get<FetchedCategoriesModel[]>(categoryImages);
    }),
    map((categories:FetchedCategoriesModel[]) =>{
      let cat:CategoryModel[]=[];
      for (let category of categories){
        let NewCategory = new CategoryModel(category.name,category.id,null);
        let uints = new Uint8Array(category.image);
        let stringchar = String.fromCharCode.apply(null, uints);
        let base64 = btoa(stringchar);
        NewCategory.imageUrl = base64;
        cat.push(NewCategory);
      }
      return{
        type: SET_CATEGORIES_WITH_IMAGES,
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
          result.push(new SubCategoryModel(subCategory.name,subCategory.id));
        this.store.dispatch(new SetSubCategory({SubCategories: result, GeneralCategoryId: res[1].payload.GeneralCategoryId}))
      });
    }),
  );


}
