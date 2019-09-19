import {CategoryModel} from "../../shared/Models/category.model";
import {
  FETCH_CATEGORIES, FETCH_CATEGORIES_WITH_IMAGES,
  FETCH_SUBCATEGORIES, FETCH_SUBCATEGORIES_IMAGES,
  MainPageActions,
  SET_CATEGORIES,
  SET_CATEGORIES_WITH_IMAGES,
  SET_SUBCATEGORIES,
  SET_SUBCATEGORIES_IMAGES
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

    case SET_SUBCATEGORIES_IMAGES:
      const ind = state.Categories.findIndex((Category:CategoryModel) => {
        return Category.id === action.payload.GeneralCategoryId;
      });

      const CurrentCategory = state.Categories[ind];
      const OldSubCategories:SubCategoryModel[] = CurrentCategory.SubCategories;
      for(let i=0;i<OldSubCategories.length;i++){
        const newSub = action.payload.SubCategories.find((SubCategory:SubCategoryModel)=>
          SubCategory.id === OldSubCategories[i].id);
        OldSubCategories[i] ={
          ...OldSubCategories[i],
          imageUrl: newSub.imageUrl
        }
      }
      const OldCategories = [...state.Categories];
      OldCategories[ind].SubCategories = OldSubCategories;
      return {
        ...state,
        loadingCategories:false,
        Categories: OldCategories
      };
    case FETCH_SUBCATEGORIES_IMAGES:
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



