import type { RecommendRecipeEntity } from "../types/api/recommend-recipe/model/recommend-recipe";

interface Props {
  recommendRecipe: RecommendRecipeEntity;
}

export default function RecommendRecipeCard({ recommendRecipe }: Props) {
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
          <h3 className="text-xl font-semibold mr-2">{recommendRecipe.recipe.name}</h3>
        </header>
        <main className="mt-3">
          <p className="text-[#969696] text-base font-normal ">
            {recommendRecipe.recipe.ingredient
              .map((ingredient) => ingredient.name)
              .join(", ")}
          </p>
        </main>
      </div>
    </article>
  );
}
