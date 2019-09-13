import {createFeatureSelector, createSelector} from "@ngrx/store";
import {CategoryModel} from "../../shared/Models/category.model";
import {AppState} from "../../store/app.reducer";
import {MainPageState} from "./main-page.reducer";
import {categories} from "../../shared/server-endpoints";

export const selectMainPage = (state:AppState) => state.mainPage;

export const selectCategories = createSelector(
  selectMainPage,
  (state: MainPageState) => state.Categories
);

export const selectSub = createSelector(
  selectCategories,
  (categories: CategoryModel[],props) =>{ return categories.find((category:CategoryModel)=> category.name === props.name)}
);

