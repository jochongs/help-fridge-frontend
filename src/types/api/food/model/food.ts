import type { FoodCategoryEntity } from "../../food-category/model/food-category";
import type { UnitEntity } from "../../unit/model/unit";

export interface FoodEntity {
  idx: number;
  name: string;
  category: FoodCategoryEntity;
  unit: UnitEntity[];
  expiration: number;
}
