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
  return (
    <article
      className="w-full px-4 py-2.5 rounded-lg border-2 border-[#F2F2F2] cursor-pointer"
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
            {recommendRecipe.recipe.ingredient.map((ingredient, i) => (
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
                {recommendRecipe.recipe.ingredient.length - 1 !== i ? ", " : ""}
              </span>
            ))}
          </p>
        </main>
      </div>
    </article>
  );
}
