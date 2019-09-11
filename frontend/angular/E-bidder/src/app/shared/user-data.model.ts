export class UserDataModel {

  constructor(
    public id:number,
    public username: string,
    public password: string,
    public firstName: string,
    public lastName: string,
    public email:string,
    public telephoneNumber:number,
    public country: string,
    public city: string,
    public address:string,
    public afm:number,
    public bidderRating: number,
    public sellerRating: number,
    public isAdmin: string,
    public isApproved: string,
  ) {}
}
