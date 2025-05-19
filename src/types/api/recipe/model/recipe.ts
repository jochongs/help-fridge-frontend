import type { IngredientEntity } from "../../ingredient/model/ingredient";

export interface RecipeEntity {
  idx: number;
  id: number;
  name: string;
  ingredient: IngredientEntity[];
}

export const recipeData: RecipeEntity = {
  idx: 3479,
  id: 6929394,
  name: "어묵채볶음",
  ingredient: [
    {
      idx: 1829,
      name: "맵쌀 국수",
      category: {
          idx: 44,
          name: "곡류"
      }
    },
    {
      idx: 1230,
      name: "큰구슬우렁이(골뱅이)",
      category: {
          idx: 54,
          name: "어패류 및 기타 수산물"
      }
    },
    {
      idx: 1351,
      name: "브로콜리",
      category: {
          idx: 49,
          name: "채소류"
      }
    },
    {
      idx: 1318,
      name: "당근",
      category: {
          idx: 49,
          name: "채소류"
      }
    }
  ]
};