import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css']
})
export class SingUpComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSingup(form: NgForm){
    const Username = form.value.username;
    const Password = form.value.password;
    const PasswordVerification = form.value.passwordVerification;
    const FirstName = form.value.firstName;
    const LastName = form.value.lastName;
    const Email = form.value.email;
    const PhoneNum = form.value.phoneNumber;
    const Country = form.value.country;
    const City = form.value.city;
    const Address = form.value.address;
    const Afm = form.value.afm;
    console.log(Username, Password, PasswordVerification, FirstName, LastName, Email, PhoneNum, Country, City, Address, Afm);



  }

}
