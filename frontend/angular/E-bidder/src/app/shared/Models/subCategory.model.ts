export class SubCategoryModel {

  name: string;
  id:number;
  imageUrl:string;
  constructor(name:string,id:number,ByteArray:Array<any>){
    this.name = name;
    this.id = id;
    let uints = new Uint8Array(ByteArray);
    let stringchar = String.fromCharCode.apply(null, uints);
    let base64 = btoa(stringchar);
    this.imageUrl = base64;
  };
}
