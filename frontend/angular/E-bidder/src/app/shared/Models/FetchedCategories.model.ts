import {SubCategoryModel} from "./subCategory.model";

export class FetchedCategoriesModel {

  constructor(public name:string, public id:number, public image:[],SubCategories?:SubCategoryModel[]){}
}
