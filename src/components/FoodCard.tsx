import Chip from "./Chip";
import type { FridgeEntity } from "../types/api/fridge/model/fridge";

interface Props {
  fridge: FridgeEntity;
}

export default function FoodCard({ fridge }: Props) {
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
    today.setHours(0, 0, 0, 0);
    expiredAt.setHours(0, 0, 0, 0);

    const diffTime = expiredAt.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const diffDays = subExpiredAt(
    calculateExpirationDate(
      fridge.expiredAt ? new Date(fridge.expiredAt) : null,
      fridge.food.expiration,
    ),
  );

  const calculateColor = (diffDays: number) => {
    if (diffDays <= -1) {
      return "purple";
    }
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
    <div>
      <header className="flex">
        <h3 className="text-xl font-semibold mr-2">{fridge.food.name}</h3>
        <Chip type={color} className="mr-0.5">
          {diffDays > 0
            ? `D-${diffDays}`
            : diffDays === 0
            ? "D-day"
            : `D+${Math.abs(diffDays)}`}
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
            calculateExpirationDate(
              fridge.expiredAt ? new Date(fridge.expiredAt) : null,
              fridge.food.expiration,
            ),
          )}
        </p>
      </main>
    </div>
  );
}
