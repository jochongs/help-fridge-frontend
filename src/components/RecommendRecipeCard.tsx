import type { FridgeEntity } from "../types/api/fridge/model/fridge";
import type { RecommendRecipeEntity } from "../types/api/recommend-recipe/model/recommend-recipe";
import { cn } from "../util/cn";

interface Props {
  recommendRecipe: RecommendRecipeEntity;
  fridgeList?: FridgeEntity[];
}

export default function RecommendRecipeCard({
  recommendRecipe,
  fridgeList,
}: Props) {
  const handleClick = () => {
    window.open(recommendRecipe.url, "_blank");
  };

  // ingredient의 idx를 기준으로 중복된 idx는 제거
  const ingredientList = recommendRecipe.recipe.ingredient.filter(
    (ingredient, index, self) =>
      index === self.findIndex((i) => i.idx === ingredient.idx),
  );

  return (
    <article
      className={cn(
        "w-full px-4 py-2.5 rounded-lg border-2 border-[#F2F2F2] cursor-pointer",
        "transition-colors duration-200",
        "hover:border-[#FF6B00] hover:bg-[#FFF6F0]",
      )}
      onClick={handleClick}
    >
      <div>
        <header className="flex">
          <h3 className="text-xl font-semibold mr-2">
            {recommendRecipe.recipe.name}
          </h3>
        </header>
        <main className="mt-3">
          <p className="text-[#969696] text-base font-normal ">
            {ingredientList.map((ingredient, i) => (
              <span
                className={cn(
                  (fridgeList || []).some(
                    (fridge) => fridge.food.idx === ingredient.idx,
                  )
                    ? "text-[#FF6B00]"
                    : "text-[#969696]",
                )}
              >
                {ingredient.name}
                {ingredientList.length - 1 !== i ? ", " : ""}
              </span>
            ))}
          </p>
        </main>
      </div>
    </article>
  );
}
