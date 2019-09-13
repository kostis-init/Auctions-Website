import {CategoryModel} from "../../shared/Models/category.model";
import {SubCategoryModel} from "../../shared/Models/subCategory.model";

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const FETCH_SUBCATEGORIES = 'FETCH_SUBCATEGORIES';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_SUBCATEGORIES = 'SET_SUBCATEGORIES';


export class FetchCategories {
  readonly type = FETCH_CATEGORIES;
}

export class FetchSubCategories {
  readonly type = FETCH_SUBCATEGORIES;
  constructor(public  payload:{GeneralCategoryId:number}){}
}

export class SetCategories {
  readonly type = SET_CATEGORIES;
  constructor(public payload:{Categories:CategoryModel[]}){}
}

export class SetSubCategory {
  readonly type = SET_SUBCATEGORIES;
  constructor(public payload: {SubCategories:SubCategoryModel[], GeneralCategoryId:number}) {}
}

export type MainPageActions = FetchCategories | FetchSubCategories | SetCategories | SetSubCategory;
