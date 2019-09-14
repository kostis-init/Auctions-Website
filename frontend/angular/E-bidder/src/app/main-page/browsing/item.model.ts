export class ItemModel{
  id: number;
  img: any;
  name: string;
  description:string;
  price:number;

  constructor(id: number, img:any, name:string, description:string, price:number){
    this.id = id;
    this.img = img;
    this.description = description;
    this.name = name;
    this.price = price;
  }
}
