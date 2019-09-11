import {Component, OnInit, TemplateRef} from '@angular/core';
import {AppState} from "../../../store/app.reducer";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {AuthState} from "../../../auth/store/auth.reducer";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {UserLogoutAction} from "../../../auth/store/auth.actions";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../auth/auth.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  modalRef: BsModalRef;
  AuthState$: Observable<AuthState>;
  constructor(private store: Store<AppState>,
              private modalServise: BsModalService,
              private router: Router,
              private auth: AuthService) { }

  ngOnInit() {
    this.AuthState$ = this.store.select('auth');
  }

  OpenModal(template: TemplateRef<any>) {
    this.modalRef = this.modalServise.show(template);
  }

  CloseModal() {
    this.modalRef.hide();
  }

  Logout() {
    this.auth.Logout();
  }

  shop_byCat(category: number){
    //this.router.navigate(['categories', category]);
    this.router.navigateByUrl('main/categories')
  }

}
