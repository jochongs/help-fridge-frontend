import type { FridgeEntity } from "../../../types/api/fridge/model/fridge";
import FoodCard from "../../../components/FoodCard";
import {
  fridgeHistoryReason,
  type FridgeHistoryReason,
} from "../../../types/fridge-history-type";
import { useEffect, useRef, useState } from "react";
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

  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { mutate, status: updateStatus } = useUpdateFridgeAmount({
    onSuccess: () => {
      onSuccess && onSuccess();
      onClose();
    },
  });

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const buttonSubmitEvent = () => {
    if (amountInput > fridge.amount) {
      setAmountInput(fridge.amount);
      return;
    }

    if (amountInput <= 0) {
      if (inputRef.current) {
        inputRef.current.classList.add("scale-110");
        inputRef.current.classList.add("bg-red-200");
        setTimeout(() => {
          inputRef.current?.classList.remove("scale-110");
          inputRef.current?.classList.remove("bg-red-200");
        }, 200);
      }
      return;
    }

    mutate({
      idx: fridge.idx,
      amount: amountInput,
      reasonIdx: type,
    });
  };

  const onPressInInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 왼쪽 화살표를 누르면 0으로 바뀜
    // 오른쪽 화살표를 누르면 fridge.amount로 바뀜
    // 아래 화살표를 누르면 1이 줄어듦
    // 위 화살표를 누르면 1이 늘어남
    if (e.key === "ArrowLeft") {
      setAmountInput(0);
    }
    if (e.key === "ArrowRight") {
      setAmountInput(fridge.amount);
    }
    if (e.key === "ArrowDown") {
      setAmountInput((prev) => {
        if (prev === 0) return 0;
        return prev - 1;
      });
    }
    if (e.key === "ArrowUp") {
      setAmountInput((prev) => {
        if (prev === fridge.amount) return fridge.amount;
        return prev + 1;
      });
    }
    if (e.key === "Enter") {
      if (buttonRef.current) {
        buttonRef.current.classList.add("scale-95");
        setTimeout(() => {
          buttonRef.current?.classList.remove("scale-95");
        }, 100);
      }
      buttonSubmitEvent();
    }
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
                onKeyDown={onPressInInput}
                ref={inputRef}
                type="text"
                className="caret-transparent w-8.5 h-8.5 text-xl rounded-sm bg-[#F0F0F0] mr-1.5 text-[#494949] flex justify-center items-center text-center focus:outline-none"
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
              ref={buttonRef}
              className="h-12 bg-[#F0F0F0] text-xl font-semibold mt-5 rounded-lg cursor-pointer active:scale-95 transition-all duration-100 hover:bg-[#E0E0E0] text-[#494949]"
              disabled={updateStatus === "pending"}
              onClick={() => {
                buttonSubmitEvent();
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
