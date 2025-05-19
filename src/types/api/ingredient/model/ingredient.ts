import type { FoodCategoryEntity } from "../../food-category/model/food-category";

export interface IngredientEntity {
  idx: number;
  name: string;
  category: FoodCategoryEntity;
}

export const ingredientData: IngredientEntity = {
  idx: 2,
  name: "사과",
  category: {
    idx: 2,
    name: "과일"
  }
};