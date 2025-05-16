import { useDrag } from "react-dnd";
import type { FridgeEntity } from "../types/api/fridge/model/fridge";
import FoodCard from "./FoodCard";

interface Props {
  fridge: FridgeEntity;
}

export default function FoodCardDrag({ fridge }: Props) {
  const [{ opacity }, dragRef] = useDrag({
    type: "FOOD",
    item: () => ({ fridge }), // ✅ item을 함수로 전달 → 최신 fridge 사용
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  return (
    <article
      ref={dragRef as any}
      style={{ opacity }}
      className="w-full px-4 py-2.5 rounded-lg border-2 border-[#F2F2F2] cursor-pointer"
    >
      <FoodCard fridge={fridge} />
    </article>
  );
}
