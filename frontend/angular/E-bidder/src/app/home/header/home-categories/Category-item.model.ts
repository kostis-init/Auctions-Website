export class CategoryItemModel{
  ImgPath: string;
  Name: string;
  Description:string;

  constructor(ImgPath:string, Name:string, Description:string){
    this.ImgPath = ImgPath;
    this.Description = Description;
    this.Name = Name;
  }
}
