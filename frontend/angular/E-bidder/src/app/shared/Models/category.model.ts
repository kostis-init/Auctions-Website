import {SubCategoryModel} from "./subCategory.model";

export class CategoryModel {
  name: string;
  id:number;
  imageUrl:string;
  SubCategories?:SubCategoryModel[];
  constructor(name:string,id:number,ByteArray:Array<number>,SubCategories?: SubCategoryModel[]){
    this.name = name;
    this.id = id;
    this.SubCategories = SubCategories;
    let uints = new Uint8Array(ByteArray);
    let stringchar = String.fromCharCode.apply(null, uints);
    let base64 = btoa(stringchar);
    this.imageUrl = base64;
    console.log(this.imageUrl);
  }
}
