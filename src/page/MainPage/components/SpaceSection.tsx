import { useEffect, useState } from "react";
import FoodCard from "../../../components/FoodCard";
import FoodCardDrag from "../../../components/FoodCardDrag";
import type { FoodEntity } from "../../../types/api/food/model/food";
import {
  fridgeMockingData,
  type FridgeEntity,
} from "../../../types/api/fridge/model/fridge";
import type { StrictPropsWithChildren } from "../../../types/react";
import { storageType, type StorageType } from "../../../types/storage-type";
import { cn } from "../../../util/cn";
import { useGetFridgeAll } from "../hooks/useGetFridgeAll";
import { useDrop } from "react-dnd";
import useUpdateFridgeType from "../hooks/useUpdateFridgeType";
import { AddFridgeButton } from "./AddFridgeButton";
import type { SortType } from "../../../types/sort-type";

interface Props extends StrictPropsWithChildren {
  className?: string;
  fridgeList?: FridgeEntity[];
  type: StorageType;
  refetchFridgeList: [() => void, () => void, () => void];
}

export default function SpaceSection({
  className = "",
  children,
  fridgeList,
  type,
  refetchFridgeList,
}: Props) {
  const [sortType, setSortType] = useState<SortType>(1);

  const {
    query: { data: fridgeListData },
    rerender: refetchFridgeListData,
  } = useGetFridgeAll(type, sortType);

  const { mutate } = useUpdateFridgeType({
    onSuccess({ fridge, toStorageIdx, fromRefetch, toRefetch }) {
      fromRefetch?.();
      toRefetch?.();
    },
  });

  const [dropFridge, setDropFridge] = useState<FridgeEntity | undefined>();

  const [{ isOver }, dropRef] = useDrop({
    accept: "FOOD",
    drop: (item: { fridge: FridgeEntity; refetch: () => void }) => {
      const { fridge, refetch } = item;

      if (fridge.storage !== type) {
        mutate({
          fridge,
          toStorageIdx: type,
          fromRefetch: refetch,
          toRefetch: refetchFridgeListData,
        });
      }
    },
    hover: (item, monitor) => {
      const { fridge } = item;
      if (fridge.storage !== type) {
        setDropFridge(fridge);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  useEffect(() => {
    if (!isOver) {
      setDropFridge(undefined);
    }
  }, [isOver]);

  const addFridgeSuccess = () => {
    refetchFridgeListData();
  };

  return (
    <section
      ref={dropRef as any}
      className={cn(
        "p-4 pb-0 rounded-lg bg-white w-full transition-all duration-100 ease-in-out",
        className,
        dropFridge ? "scale-[101%]" : "",
      )}
    >
      <article>
        <header className="font-semibold text-2xl select-none flex justify-between items-end">
          <div className="flex items-center gap-2">
            <h1>{children}</h1>
            <select
              className="border border-[#D9D9D9] rounded-lg px-2 py-1 text-sm"
              value={sortType}
              onChange={(e) => {
                setSortType(Number(e.target.value) as SortType);
              }}
            >
              <option value={1}>만료 날짜</option>
              <option value={2}>이름</option>
              <option value={3}>넣은 날짜</option>
            </select>
          </div>
          <AddFridgeButton type={type} onSuccess={addFridgeSuccess} />
        </header>
        <main className="mt-4 h-[300px] overflow-y-scroll pb-4 [&::-webkit-scrollbar]:hidden items-start">
          <div className="grid grid-cols-3 gap-2">
            {(fridgeListData ?? []).map((fridge) => (
              <FoodCardDrag
                key={fridge.food.idx}
                fridge={fridge}
                refetch={refetchFridgeListData}
              />
            ))}
          </div>
        </main>
      </article>
    </section>
  );
}
