import FoodCard from "../../../components/FoodCard";
import FoodCardDrag from "../../../components/FoodCardDrag";
import type { FoodEntity } from "../../../types/api/food/model/food";
import {
  fridge,
  type FridgeEntity,
} from "../../../types/api/fridge/model/fridge";
import type { StrictPropsWithChildren } from "../../../types/react";
import { storageType, type StorageType } from "../../../types/storage-type";
import { cn } from "../../../util/cn";
import { useGetFridgeAll } from "../hooks/useGetFridgeAll";

interface Props extends StrictPropsWithChildren {
  className?: string;
  fridgeList?: FridgeEntity[];
}

export default function SpaceSection({
  className = "",
  children,
  fridgeList,
}: Props) {
  if (typeof fridgeList === "string") {
    fridgeList = [fridge];
  }

  return (
    <section className={cn("p-4 pb-0 rounded-lg bg-white w-full", className)}>
      <article>
        <header className="font-semibold text-2xl">{children}</header>
        <main className="mt-4 grid grid-cols-3 gap-2 h-[300px] overflow-y-scroll pb-4 [&::-webkit-scrollbar]:hidden items-start">
          {/* <FoodCardDrag key={fridge.food.idx} fridge={fridge} /> */}
          {fridgeList &&
            fridgeList.map((fridge) => (
              <FoodCardDrag key={fridge.food.idx} fridge={fridge} />
            ))}
        </main>
      </article>
    </section>
  );
}
