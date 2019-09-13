
export class UserSignupModel {


  constructor(
    public Username: string,
    public Password: string,
    public PasswordVerification: string,
    public FirstName: string,
    public LastName: string,
    public Email:string,
    public PhoneNum: number,
    public Country: string,
    public City: string,
    public Address: string,
    public Afm: string,
    public Latitude: number,
    public Longitude: number) {}
}



