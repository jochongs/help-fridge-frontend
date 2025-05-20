import type { RecipeEntity } from "../../recipe/model/recipe";

export interface RecommendRecipeEntity {
  recipe: RecipeEntity;
  nearExpiringCount: number;
  totalOwnedCount: number;
  totalIngredientCount: number;
  nearExpiringRatio: number;
  totalOwnedRatio: number;
  url: string;
}

export const recommendRecipeData: RecommendRecipeEntity = {
  recipe: {
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
            name: '채소류'
        }
      }
    ]
  },
  nearExpiringCount: 1,
  totalOwnedCount: 1,
  totalIngredientCount: 4,
  nearExpiringRatio: 25,
  totalOwnedRatio: 25,
  url: "https://www.10000recipe.com/recipe/6929394"
};