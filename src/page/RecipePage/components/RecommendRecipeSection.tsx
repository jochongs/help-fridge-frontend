import RecommendRecipeCard from "../../../components/RecommendRecipeCard";
import {
  fridgeMockingData,
  type FridgeEntity,
} from "../../../types/api/fridge/model/fridge";
import type { RecommendRecipeEntity } from "../../../types/api/recommend-recipe/model/recommend-recipe";
import type { StrictPropsWithChildren } from "../../../types/react";
import { type StorageType } from "../../../types/storage-type";
import { cn } from "../../../util/cn";

interface Props extends StrictPropsWithChildren {
  className?: string;
  recommendRecipeList?: RecommendRecipeEntity[];
  fridgeList?: FridgeEntity[];
}

export default function RecommendRecipeSection({
  className = "",
  children,
  recommendRecipeList,
  fridgeList,
}: Props) {
  // if (typeof fridgeList === "string") {
  //   fridgeList = [fridgeMockingData];
  // }

  return (
    <section
      className={cn(
        "p-4 pb-0 rounded-lg bg-white w-full transition-all duration-100 ease-in-out",
        className,
      )}
    >
      <article>
        <header className="font-semibold text-2xl select-none flex justify-between items-end">
          <h1>{children}</h1>
        </header>
        <main className="mt-4  h-[300px] overflow-y-scroll pb-4 [&::-webkit-scrollbar]:hidden items-start">
          <div className="grid grid-cols-3 gap-2">
            {recommendRecipeList &&
              recommendRecipeList.map((recommendRecipe) => (
                <RecommendRecipeCard
                  key={recommendRecipe.recipe.idx}
                  recommendRecipe={recommendRecipe}
                  fridgeList={fridgeList}
                />
              ))}
          </div>
        </main>
      </article>
    </section>
  );
}
