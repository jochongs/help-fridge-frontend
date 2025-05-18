import type { FoodCategoryEntity } from "../../food-category/model/food-category";
import type { UnitEntity } from "../../unit/model/unit";

export interface FoodEntity {
  idx: number;
  name: string;
  category: FoodCategoryEntity;
  unit: UnitEntity[];
  expiration: number;
}

export const foodMockingData: FoodEntity = {
  idx: 1,
  name: "김치",
  category: {
    idx: 1,
    name: "채소",
  },
  unit: [
    {
      idx: 1,
      name: "kg",
    },
    {
      idx: 2,
      name: "g",
    },
  ],
  expiration: 7,
};

export const foodMockingData2: FoodEntity = {
  idx: 2,
  name: "사과",
  category: {
    idx: 2,
    name: "과일",
  },
  unit: [
    {
      idx: 1,
      name: "kg",
    },
    {
      idx: 2,
      name: "g",
    },
  ],
  expiration: 14,
};
