import FoodCard from "../../../components/FoodCard";
import type { FoodEntity } from "../../../types/api/food/model/food";
import type { StrictPropsWithChildren } from "../../../types/react";
import { storageType, type StorageType } from "../../../types/storage-type";
import { cn } from "../../../util/cn";
import { useGetFridgeAll } from "../hooks/useGetFridgeAll";

interface Props extends StrictPropsWithChildren {
  className?: string;
  type: StorageType;
}

export default function SpaceSection({
  className = "",
  children,
  type,
}: Props) {
  const {
    query: { data: fridgeList },
  } = useGetFridgeAll(type);

  return (
    <section className={cn("p-4 pb-0 rounded-lg bg-white w-full", className)}>
      <article>
        <header className="font-semibold text-2xl">{children}</header>
        <main className="mt-4 grid grid-cols-3 gap-2 h-[300px] overflow-y-scroll pb-4 [&::-webkit-scrollbar]:hidden items-start">
          {fridgeList &&
            fridgeList.map((fridge) => (
              <FoodCard key={fridge.food.idx} fridge={fridge} />
            ))}
        </main>
      </article>
    </section>
  );
}
