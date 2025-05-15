import FoodCard from "../../../components/FoodCard";
import type { StrictPropsWithChildren } from "../../../types/react";
import { cn } from "../../../util/cn";

interface Props extends StrictPropsWithChildren {
  className?: string;
}

export default function SpaceSection({ className = "", children }: Props) {
  return (
    <section className={cn("p-4 pb-0 rounded-lg bg-white w-full", className)}>
      <article>
        <header className="font-semibold text-2xl">{children}</header>
        <main className="mt-4 grid grid-cols-3 gap-2 h-[300px] overflow-y-scroll pb-4 [&::-webkit-scrollbar]:hidden">
          {[...Array(8)].map((_, i) => (
            <FoodCard key={i} />
          ))}
        </main>
      </article>
    </section>
  );
}
