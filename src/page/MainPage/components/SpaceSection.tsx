import { use, useEffect, useState } from "react";
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
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

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
  const { mutate } = useUpdateFridgeType({
    onSuccess(fridge, toStorageIdx) {
      refetchFridgeList[(fridge.storage - 1) as number]();
      refetchFridgeList[(toStorageIdx - 1) as number]();
    },
  });

  const [dropFridge, setDropFridge] = useState<FridgeEntity>();

  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: "FOOD",
    drop: async (item: { fridge: FridgeEntity }) => {
      const fridge = item.fridge;

      if (fridge.storage !== type) {
        mutate({ fridge, toStorageIdx: type });
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    hover: (item: { fridge: FridgeEntity }) => {
      const fridge = item.fridge;

      if (fridge.storage !== type) {
        setDropFridge(fridge);
      }
    },
  }));

  useEffect(() => {
    if (!isOver) {
      setDropFridge(undefined);
    }
  }, [isOver]);

  if (typeof fridgeList === "string") {
    fridgeList = [fridgeMockingData];
  }

  const addFridgeSuccess = () => {
    refetchFridgeList[type - 1]();
  };

  const navigate = useNavigate();
  const location = useLocation();

  const selectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newParams = new URLSearchParams(location.search);
    const selectedValue = e.target.value;

    newParams.set(`storage${type}`, selectedValue);

    navigate(`${location.pathname}?${newParams.toString()}`, {
      replace: false,
    });
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
              onChange={selectChange}
            >
              <option value={1}>만료 날짜</option>
              <option value={2}>이름</option>
              <option value={3}>넣은 날짜</option>
            </select>
          </div>
          <AddFridgeButton
            type={type}
            onSuccess={() => {
              addFridgeSuccess();
            }}
          />
        </header>
        <main className="mt-4  h-[300px] overflow-y-scroll pb-4 [&::-webkit-scrollbar]:hidden items-start">
          <div className="grid grid-cols-3 gap-2">
            {/* {dropFridge && <FoodCardDrag fridge={dropFridge} />} */}

            {fridgeList &&
              fridgeList.map((fridge) => (
                <FoodCardDrag key={fridge.idx} fridge={fridge} />
              ))}
          </div>
        </main>
      </article>
    </section>
  );
}
