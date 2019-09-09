export class UserDataModel {

  constructor(
    public Id:number,
    public Username: string,
    public Password: string,
    public FirstName: string,
    public LastName: string,
    public Email:string,
    public PhoneNumber:number,
    public Country: string,
    public City: string,
    public Addresss:string,
    public Arf:number,
    public BidderRating: number,
    public SellerRating: number,
    public IsAdmin: boolean,
    public IsApproved: boolean,
  ) {}
}
