import Chip from "./Chip";

export default function FoodCard() {
  return (
    <article className="w-full p-4 rounded-lg border-[1px] border-[#F2F2F2] bg-[#FFF]">
      <div>
        <header className="flex">
          <h3 className="text-xl font-semibold mr-2">고기 만두</h3>
          <Chip type="orange" className="mr-0.5">
            D-3
          </Chip>
          <Chip type="gray">2개</Chip>
        </header>
        <main className="mt-3">
          <p className="text-[#969696] text-base font-normal ">
            넣은 날짜: {"2025-05-09"}
          </p>
          <p className="text-[#969696] text-base font-normal mt-1.5">
            소비 기한: {"2025-05-09"}
          </p>
        </main>
      </div>
    </article>
  );
}
