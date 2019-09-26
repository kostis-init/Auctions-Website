import {CategoryModel} from "../../shared/Models/category.model";
import {
  FETCH_CATEGORIES, FETCH_CATEGORIES_WITH_IMAGES,
  FETCH_SUBCATEGORIES,
  MainPageActions,
  SET_CATEGORIES,
  SET_CATEGORIES_WITH_IMAGES,
  SET_SUBCATEGORIES,
} from "./main-page.action";
import {SubCategoryModel} from "../../shared/Models/subCategory.model";

export interface MainPageState{
  Categories:CategoryModel[];
  loadingCategories:boolean;
}

export const InitialState:MainPageState= {
  Categories: null,
  loadingCategories: false,
};

export function MainPageReducers(state = InitialState, action: MainPageActions): MainPageState {

  switch (action.type) {

    case SET_CATEGORIES:
      return {
        ...state,
        loadingCategories:false,
        Categories: action.payload.Categories
      };

    case SET_CATEGORIES_WITH_IMAGES:
      const oldCategories:CategoryModel[] = [...state.Categories];
      for(let i=0; i<oldCategories.length; i++ ){
          const newCategory = action.payload.Categories.find((category) => category.id === oldCategories[i].id)
          oldCategories[i] = {
            ...oldCategories[i],
            imageUrl: newCategory.imageUrl
          }
      }
      return {
        ...state,
        loadingCategories:false,
        Categories: oldCategories
      };

    case SET_SUBCATEGORIES:
      const index = state.Categories.findIndex((Category:CategoryModel)=>{
         return Category.id === action.payload.GeneralCategoryId;
      });

      const category = state.Categories[index];
      const UpdatedCategory:CategoryModel = {
        ...category,
        SubCategories: action.payload.SubCategories
      };

      const categories:CategoryModel[] = [...state.Categories];
      categories[index] = UpdatedCategory;
      return {
        ...state,
        loadingCategories:false,
        Categories: categories
      };
    case FETCH_CATEGORIES_WITH_IMAGES:
    case FETCH_SUBCATEGORIES:
    case FETCH_CATEGORIES:

      return {
        ...state,
        loadingCategories:true
      };
    default:
      return state;

  }

}



