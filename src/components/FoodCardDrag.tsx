import { useDrag } from "react-dnd";
import type { FridgeEntity } from "../types/api/fridge/model/fridge";
import FoodCard from "./FoodCard";

interface Props {
  fridge: FridgeEntity;
}

export default function FoodCardDrag({ fridge }: Props) {
  const [{ opacity }, dragRef] = useDrag(() => ({
    type: "FOOD", // <- DropArea에서 받을 수 있도록
    item: { fridge }, // id는 예시, 실제 데이터 넣기
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  }));

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
