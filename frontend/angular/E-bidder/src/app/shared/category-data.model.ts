export class CategoryDataModel{
  id: number;
  imgPath: any;
  name: string;

  constructor(id: number, name:string, imgPath:any){
    this.id = id;
    this.name = name;
    this.imgPath = imgPath;
  }
}
