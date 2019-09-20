import {SubCategoryModel} from "../../shared/Models/subCategory.model";
import {UserDataModel} from "../../shared/Models/user-data.model";
import {CategoryModel} from "../../shared/Models/category.model";

export class ItemModel{
  id: number;
  imageUrl: string;
  name: string;
  description:string;
  bids: any;
  numberOfBids: number;
  currentBid: number;
  buyPrice: number;
  city: string;
  country: string;
  seller: UserDataModel;
  categories: SubCategoryModel;
  images: any[][];

  constructor(bids: any, images: any[][], categories: SubCategoryModel, description: string, id: number, name: string,
              numberOfBids: number, currentBid: number, buyPrice: number, city: string, country: string, seller: UserDataModel){
    this.id = id;
    this.name = name;
    this.description = description;
    this.numberOfBids = numberOfBids;
    this.currentBid = currentBid;
    this.buyPrice = buyPrice;
    this.bids = bids;
    this.seller = seller;
    this.city = city;
    this.country = country;
    let uints = new Uint8Array(images[0]);
    let stringchar = String.fromCharCode.apply(null, uints);
    let base64 = btoa(stringchar);
    this.imageUrl = base64;
    this.images = images;
  }
}
