export class ItemModel{
  imgPath: string;
  name: string;
  description:string;
  price:number;

  constructor(imgPath:string, name:string, description:string, price:number){
    this.imgPath = imgPath;
    this.description = description;
    this.name = name;
    this.price = price;
  }
}
