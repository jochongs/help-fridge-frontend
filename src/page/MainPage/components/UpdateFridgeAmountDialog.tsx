import type { FridgeEntity } from "../../../types/api/fridge/model/fridge";
import FoodCard from "../../../components/FoodCard";
import {
  fridgeHistoryReason,
  type FridgeHistoryReason,
} from "../../../types/fridge-history-type";
import { useEffect, useState } from "react";
import useUpdateFridgeAmount from "../hooks/useUpdateFridgeAmount";
import { cn } from "../../../util/cn";

type Props = {
  fridge: FridgeEntity;
  onClose: () => void;
  isOpen?: boolean;
  type: FridgeHistoryReason;
  onSuccess?: () => void;
};

export default function UpdateFridgeAmountDialog({
  fridge,
  onClose,
  isOpen,
  onSuccess,
  type,
}: Props) {
  const [amountInput, setAmountInput] = useState(fridge.amount);

  const { mutate, status: updateStatus } = useUpdateFridgeAmount({
    onSuccess: () => {
      onSuccess && onSuccess();
      onClose();
    },
  });

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      {isOpen ? (
        <div
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center bg-black/30",
          )}
          onClick={handleClose}
        >
          <div
            className="flex flex-col bg-white p-6 w-[334px] rounded-2xl shadow-xl relative px-5 pt-5 py-4 animate-[var(--animate-popin)]"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <h3 className="text-xl font-semibold">
              {type === fridgeHistoryReason.EATEN
                ? `몇 ${fridge.unit.name} 만큼 먹었나요?`
                : `몇 ${fridge.unit.name} 만큼 버릴래요?`}
            </h3>
            <article className="w-[294px] px-4 py-2.5 rounded-lg border-2 border-[#F2F2F2] mt-3">
              <FoodCard fridge={fridge} />
            </article>
            <div className="border-[1.5px] border-[#F2F2F2] my-3"></div>
            <div className="flex items-center-safe">
              <input
                type="text"
                className="w-8.5 h-8.5 text-xl rounded-sm bg-[#F0F0F0] mr-1.5 text-[#494949] flex justify-center items-center text-center focus:outline-none"
                value={amountInput}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "" || /^[0-9]*$/.test(value)) {
                    if (Number(value) > fridge.amount) {
                      setAmountInput(fridge.amount);
                      return;
                    }
                    setAmountInput(Number(value));
                  }
                }}
              />
              <span className="text-xl text-[##494949]">
                {fridge.unit.name} 버릴래요.
              </span>
            </div>
            <button
              className="h-12 bg-[#F0F0F0] text-xl font-semibold mt-5 rounded-lg cursor-pointer active:scale-95 transition-all duration-100 hover:bg-[#E0E0E0] text-[#494949]"
              disabled={updateStatus === "pending"}
              onClick={() => {
                mutate({
                  idx: fridge.idx,
                  amount: amountInput,
                  reasonIdx: type,
                });
              }}
            >
              버리기
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
