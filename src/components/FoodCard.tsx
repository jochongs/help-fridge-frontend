import Chip from "./Chip";
import React from "react";
import { useDrag } from "react-dnd";
import type { FoodEntity } from "../types/api/food/model/food";
import type { FridgeEntity } from "../types/api/fridge/model/fridge";

interface Props {
  fridge: FridgeEntity;
}

export default function FoodCard({ fridge }: Props) {
  const [{ opacity }, dragRef] = useDrag(() => ({
    type: "FOOD", // <- DropArea에서 받을 수 있도록
    item: { id: 1 }, // id는 예시, 실제 데이터 넣기
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  }));

  /**
   * @param expiredAt - 유통기한
   * @param expiration - 유통기한이 null일 경우
   */
  const calculateExpirationDate = (
    expiredAt: Date | null,
    expiration: number,
  ) => {
    if (expiredAt) {
      return expiredAt;
    }

    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + expiration);

    return expirationDate;
  };

  /**
   * YYYY-MM-DD 형식으로 날짜를 포맷팅하는 함수
   */
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const subExpiredAt = (expiredAt: Date) => {
    const today = new Date();
    const diffTime = Math.abs(expiredAt.getTime() - today.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const diffDays = subExpiredAt(
    calculateExpirationDate(fridge.expiredAt, fridge.food.expiration),
  );

  const calculateColor = (diffDays: number) => {
    if (diffDays <= 3) {
      return "red";
    }
    if (diffDays < 7) {
      return "orange";
    }
    return "green";
  };

  const color = calculateColor(diffDays);

  return (
    <article
      ref={dragRef as any}
      style={{ opacity }}
      className="w-full p-4 rounded-lg border-2 border-[#F2F2F2] cursor-pointer"
    >
      <div>
        <header className="flex">
          <h3 className="text-xl font-semibold mr-2">{fridge.food.name}</h3>
          <Chip type={color} className="mr-0.5">
            {diffDays < 0 ? "유통기한 만료" : `D-${diffDays}`}
          </Chip>
          <Chip type="gray">{`${fridge.amount}${fridge.unit.name}`}</Chip>
        </header>
        <main className="mt-3">
          <p className="text-[#969696] text-base font-normal ">
            넣은 날짜: {formatDate(new Date(fridge.createdAt))}
          </p>
          <p className="text-[#969696] text-base font-normal mt-1.5">
            소비 기한:{" "}
            {formatDate(
              calculateExpirationDate(fridge.expiredAt, fridge.food.expiration),
            )}
          </p>
        </main>
      </div>
    </article>
  );
}
