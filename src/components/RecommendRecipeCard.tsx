import type { FridgeEntity } from "../types/api/fridge/model/fridge";
import type { RecommendRecipeEntity } from "../types/api/recommend-recipe/model/recommend-recipe";
import { recommendType, type RecommendType } from "../types/recommend-type";
import { cn } from "../util/cn";

interface Props {
  recommendRecipe: RecommendRecipeEntity;
  fridgeList?: FridgeEntity[];
  type?: RecommendType;
}

export default function RecommendRecipeCard({
  recommendRecipe,
  fridgeList,
  type,
}: Props) {
  const handleClick = () => {
    window.open(recommendRecipe.url, "_blank");
  };

  const calculateExpirationDate = (
    expiredAt: Date | null,
    expiration: number,
    createdAt: Date,
  ): Date => {
    if (expiredAt) return new Date(expiredAt);
    const created = createdAt;
    created.setDate(created.getDate() + expiration);
    return created;
  };

  const subExpiredAt = (expiredAt: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    expiredAt.setHours(0, 0, 0, 0);
    const diffTime = expiredAt.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const usedIngredients = (fridgeList || []).filter((fridge) =>
    recommendRecipe.recipe.ingredient.some(
      (ingredient) => ingredient.idx === fridge.food.idx,
    ),
  );

  const nearingExpiration = usedIngredients.filter((fridge) => {
    const expDate = calculateExpirationDate(
      fridge.expiredAt ? new Date(fridge.expiredAt) : null,
      fridge.food.expiration,
      new Date(fridge.createdAt),
    );
    const days = subExpiredAt(expDate);
    return days <= 3;
  });

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
                key={ingredient.idx}
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

          {type === recommendType.NEAR && nearingExpiration.length > 0 && (
            <p className="text-[#969696] text-base font-normal mt-4">
              소비기한 임박 재료 :{" "}
              {nearingExpiration.map((fridge, i, arr) => (
                <span key={fridge.food.idx}>
                  {fridge.food.name}
                  {i < arr.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
          )}
        </main>
      </div>
    </article>
  );
}
