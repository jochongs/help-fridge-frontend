import type { FridgeEntity } from "../../../types/api/fridge/model/fridge";
import FoodCard from "../../../components/FoodCard";
import {
  fridgeHistoryReason,
  type FridgeHistoryReason,
} from "../../../types/fridge-history-type";
import { useEffect, useRef, useState } from "react";
import useUpdateFridgeAmount from "../hooks/useUpdateFridgeAmount";
import { cn } from "../../../util/cn";
import Lottie from "react-lottie";
import eatSuccessData from "../../../lottie/eat-success-animation.json";
import throwSuccessData from "../../../lottie/throw-success-animation.json";

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

  const [success, setSuccess] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { mutate, status: updateStatus } = useUpdateFridgeAmount({
    onSuccess: () => {
      onSuccess && onSuccess();
      setSuccess(true);
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

  const buttonText = type === fridgeHistoryReason.EATEN ? "확인" : "버리기";

  return (
    <>
      {isOpen ? (
        <div
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center bg-black/30",
          )}
          onClick={handleClose}
        >
          {success ? (
            <div
              className="flex flex-col bg-white p-6 h-[322px] w-[334px] rounded-2xl shadow-xl relative px-5 pt-5 py-4 animate-[var(--animate-popin)]"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Lottie
                options={{
                  loop: false,
                  autoplay: true,
                  animationData:
                    type === fridgeHistoryReason.EATEN
                      ? eatSuccessData
                      : throwSuccessData,
                }}
                speed={type === fridgeHistoryReason.EATEN ? 1 : 3}
                height={271}
                isClickToPauseDisabled={true}
                eventListeners={[
                  {
                    eventName: "complete",
                    callback: () => {
                      onClose();
                    },
                  },
                ]}
              />
            </div>
          ) : (
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
              <div className="border-[1px] border-[#F2F2F2] my-3"></div>
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
                  {fridge.unit.name}{" "}
                  {type === fridgeHistoryReason.EATEN
                    ? `먹었어요.`
                    : `버릴래요.`}
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
                {updateStatus === "pending" ? (
                  <div className="flex items-center justify-center gap-4">
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="w-6 h-6 text-gray-300 animate-spin fill-gray-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    </div>
                  </div>
                ) : (
                  buttonText
                )}
              </button>
            </div>
          )}
        </div>
      ) : null}
    </>
  );
}
