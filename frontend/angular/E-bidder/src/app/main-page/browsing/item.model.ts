export class ItemModel{
  ImgPath: string;
  Name: string;
  Description:string;
  Price:number;

  constructor(ImgPath:string, Name:string, Description:string, Price:number){
    this.ImgPath = ImgPath;
    this.Description = Description;
    this.Name = Name;
    this.Price = Price;
  }
}
