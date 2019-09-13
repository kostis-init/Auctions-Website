import {Component, OnInit, TemplateRef} from '@angular/core';
import {AppState} from "../../../store/app.reducer";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {AuthState} from "../../../auth/store/auth.reducer";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {UserLogoutAction} from "../../../auth/store/auth.actions";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../auth/auth.service";
import {HttpClient} from '@angular/common/http';
import {CategoryDataModel} from "../../../shared/category-data.model";
import {NavBarDropdownItemComponent} from "./dropdown-item/nav-bar-dropdown-item.component";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  modalRef: BsModalRef;
  AuthState$: Observable<AuthState>;

  readonly ROOT_URL = 'http://localhost:8080/restapi/api';
  CategoriesObservable : Observable<CategoryDataModel[]>;
  categories: CategoryDataModel[];

  constructor(private store: Store<AppState>,
              private modalServise: BsModalService,
              private router: Router,
              private auth: AuthService,
              private httpClient: HttpClient) { }

  ngOnInit() {
    this.AuthState$ = this.store.select('auth');
    this.CategoriesObservable = this.httpClient.get<CategoryDataModel[]>(this.ROOT_URL + '/categories');
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

}
