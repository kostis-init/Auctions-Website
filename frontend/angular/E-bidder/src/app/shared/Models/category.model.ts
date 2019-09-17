import {SubCategoryModel} from "./subCategory.model";

export class CategoryModel {
  name: string;
  id:number;
  imageUrl:string;
  SubCategories?:SubCategoryModel[];
  constructor(name:string,id:number,SubCategories?: SubCategoryModel[]){
    this.name = name;
    this.id = id;
    this.SubCategories = SubCategories;
    this.imageUrl = null;
  }
}
