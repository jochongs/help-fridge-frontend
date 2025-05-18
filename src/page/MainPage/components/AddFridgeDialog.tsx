import { isValidElement, useEffect, useRef, useState } from "react";
import {
  foodMockingData,
  foodMockingData2,
  type FoodEntity,
} from "../../../types/api/food/model/food";
import ArrowDown from "../../../icon/ArrowDown";
import { cn } from "../../../util/cn";
import type { UnitEntity } from "../../../types/api/unit/model/unit";
import { useSearchFood } from "../hooks/useSearchFood";
import useAddFridge from "../hooks/useAddFridge";
import type { StorageType } from "../../../types/storage-type";
import LoadingSpinner from "../../../icon/LoadingSpinner";

interface Props {
  onClose: () => void;
  isOpen: boolean;
  afterSuccess: (type: StorageType) => void;
  type: StorageType;
}

export default function AddFridgeDialog({
  isOpen,
  onClose,
  afterSuccess,
  type,
}: Props) {
  const closeDialog = () => {
    onClose();
  };
  const foodNameInput = useRef<HTMLInputElement>(null);

  const [foodSearchInput, setFoodSearchInput] = useState<string>("");

  const { data: searchResult } = useSearchFood(foodSearchInput);

  const [selectedFood, setSelectedFood] = useState<FoodEntity | undefined>();
  const [selectedUnit, setSelectedUnit] = useState<UnitEntity | undefined>();
  const [amount, setAmount] = useState<number>(0);
  const [insertDate, setInsertDate] = useState<Date | undefined>(new Date());
  const [expirationDate, setExpirationDate] = useState<Date>();

  const [insertDateInput, setInsertDateInput] = useState<string>(
    insertDate
      ? `${insertDate.getFullYear()}-${(insertDate.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${insertDate
          ?.getDate()
          .toString()
          .padStart(2, "0")}`
      : "",
  );
  const [expirationDateInput, setExpirationDateInput] = useState<string>("");

  const [isUnitOpen, setIsUnitOpen] = useState(false);

  const { mutate, status: submitStatus } = useAddFridge({
    onSuccess: () => {
      afterSuccess(type);
    },
  });

  useEffect(() => {
    if (!selectedFood) return;

    const date = new Date();
    date.setDate(date.getDate() + selectedFood.expiration);

    setExpirationDate(date);
    setExpirationDateInput(
      `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`,
    );
  }, [selectedFood]);

  const submitHandle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (submitStatus === "pending") {
      return;
    }

    if (!selectedFood) {
      return;
    }
    if (!selectedUnit) {
      return;
    }
    if (amount <= 0) {
      return;
    }
    if (!expirationDate) {
      return;
    }

    const date = new Date();
    date.setDate(date.getDate() + selectedFood.expiration);

    const expiredAt = expirationDate;

    const isSameDate =
      date.getFullYear() === expiredAt.getFullYear() &&
      date.getMonth() === expiredAt.getMonth() &&
      date.getDate() === expiredAt.getDate();

    mutate({
      foodIdx: selectedFood.idx,
      unitIdx: selectedUnit.idx,
      storage: type,
      amount,
      expiredAt: isSameDate ? null : expirationDate,
    });
  };

  // 음식 검색 input change 이벤트
  const changeFoodNameHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedFood) {
      setSelectedFood(undefined);
      setSelectedUnit(undefined);
    }
    setFoodSearchInput(e.target.value);
  };

  const insertDateInputRef = useRef<HTMLInputElement>(null);
  // 음식 넣은 날짜 blur 이벤트
  const validateInsertDate = (dateStr: string): Date | null => {
    if (isNaN(Date.parse(dateStr))) {
      if (insertDateInputRef?.current) {
        insertDateInputRef.current.classList.add("scale-105");
        insertDateInputRef.current.classList.add("bg-red-50");
        setTimeout(() => {
          insertDateInputRef.current?.classList.remove("scale-105");
          insertDateInputRef.current?.classList.remove("bg-red-50");
        }, 200);
      }
      return null;
    }

    return new Date(dateStr);
  };
  const insertDateBlurHandle = (e: React.FocusEvent<HTMLInputElement>) => {
    const date = validateInsertDate(e.target.value);

    if (!date) return;

    setInsertDate(date);
  };
  const insertDateKeyDownHandle = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter") {
      const date = validateInsertDate(e.currentTarget.value);

      if (!date) return;

      setInsertDate(date);
    }
  };
  // 넣은 날짜 change 이벤트
  const changeInsertDateHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInsertDate(undefined);
    setInsertDateInput(e.target.value);
  };

  const expirationDateInputRef = useRef<HTMLInputElement>(null);
  // 소비기한 blur 이벤트
  const validateExpirationDate = (dateStr: string): Date | null => {
    if (isNaN(Date.parse(dateStr))) {
      if (expirationDateInputRef?.current) {
        expirationDateInputRef.current.classList.add("scale-105");
        expirationDateInputRef.current.classList.add("bg-red-50");
        setTimeout(() => {
          expirationDateInputRef.current?.classList.remove("scale-105");
          expirationDateInputRef.current?.classList.remove("bg-red-50");
        }, 200);
      }
      return null;
    }
    return new Date(dateStr);
  };
  const expirationDateBlurHandle = (e: React.FocusEvent<HTMLInputElement>) => {
    const date = validateExpirationDate(e.target.value);

    if (!date) return;

    setExpirationDate(date);
  };
  const expirationDateKeyDownHandle = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter") {
      const date = validateExpirationDate(e.currentTarget.value);

      if (!date) return;

      if (expirationDateInputRef?.current) {
        expirationDateInputRef.current.blur();
      }
      setExpirationDate(date);
    }
  };
  const changeExpirationDateHandle = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setExpirationDate(undefined);
    setExpirationDateInput(e.target.value);
  };

  // 음식 선택 이벤트
  const foodButtonClickHandle = (food: FoodEntity) => () =>
    setSelectedFood(food);

  const unitClickHandle = (unit: UnitEntity) => () => {
    setSelectedUnit(unit);
    setIsUnitOpen(false);
  };

  // 단위 선택 이벤트
  const unitInputButtonClickHandle = () => {
    if (!selectedFood) {
      if (foodNameInput.current) {
        foodNameInput.current.classList.add("scale-105");
        foodNameInput.current.classList.add("bg-red-50");
        setTimeout(() => {
          foodNameInput.current?.classList.remove("scale-105");
          foodNameInput.current?.classList.remove("bg-red-50");
        }, 200);
      }

      return;
    }
    setIsUnitOpen((prev) => !prev);
  };

  // 수량 입력 이벤트
  const amountInputHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = Number(e.target.value);

    if (isNaN(input)) {
      setAmount(0);
      return;
    }

    if (input < 0) {
      setAmount(0);
      return;
    }

    if (input > 2_100_000_000) {
      setAmount(2_100_000_000);
      return;
    }

    setAmount(input);
  };

  // 음식 검색 focus out 이벤트를 위한 useEffect
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        if (!selectedFood) {
          setFoodSearchInput(""); // 또는 searchResult 닫는 처리
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedFood]);

  // 제출 가능여부 확인 메서드
  const isSubmitAble = () => {
    if (!selectedFood) return false;
    if (!selectedUnit) return false;
    if (amount <= 0) return false;
    if (!insertDate) return false;
    if (!expirationDate) return false;

    return true;
  };

  return (
    <>
      {isOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
          onClick={closeDialog}
        >
          <article
            className="w-[440px] rounded-[20px]
            animate-[var(--animate-popin)] p-5 bg-white
            flex flex-col text-xl font-semibold"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <h3 className="">추가할 음식 정보를 알려주세요.</h3>
              <form className="mt-3" onSubmit={submitHandle}>
                {/* 음식 이름 */}
                <div className="relative">
                  <label className="text-xl font-medium text-[#585858] w-fit">
                    음식 이름
                  </label>
                  <div ref={containerRef}>
                    <input
                      ref={foodNameInput}
                      type="text"
                      id="food_name"
                      autoComplete="off"
                      onChange={changeFoodNameHandle}
                      value={selectedFood?.name || foodSearchInput}
                      className={cn(
                        `w-full h-[46px] pl-2.5
                        focus:outline-none
                        text-[#585858] text-lg font-normal
                        rounded-lg mt-3 
                        placeholder:text-[#B7B7B7]
                        transition-all duration-100`,
                        selectedFood ? "bg-blue-50" : "bg-[#F7F7F7]",
                      )}
                      placeholder="검색어를 입력해주세요."
                    />
                    {foodSearchInput &&
                      searchResult &&
                      !selectedFood &&
                      searchResult.map((food, i) => (
                        <div
                          className="mt-2 w-full rounded-lg absolute h-[187px] 
                                white z-51
                                bg-white
                                border-[1px] border-[#F0F0F0] overflow-y-scroll
                                [&::-webkit-scrollbar]:hidden"
                        >
                          <div
                            key={`food-search-result-${i}`}
                            className="h-[46px] relative cursor-pointer
                                    flex items-center justify-center
                                    hover:bg-[#F7F7F7]
                                    text-[#585858] text-[18px] font-normal"
                          >
                            <button
                              type="button"
                              className="w-full h-full cursor-pointer text-left pl-2.5"
                              onClick={foodButtonClickHandle(food)}
                            >
                              {food.name}
                            </button>
                            <div
                              className="w-[394px] h-[1px] 
                                        absolute bottom-[-2px]
                                        bg-[#F0F0F0]"
                            ></div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                {/* 단위 */}
                <div className="relative mt-3">
                  <label className="text-xl font-medium text-[#585858]">
                    단위
                  </label>
                  <div>
                    <button
                      id="food_name"
                      type="button"
                      className={cn(
                        `w-full h-[46px] pl-2.5 text-left
                            text-[#585858] text-lg font-normal
                            rounded-lg mt-3 bg-[#F7F7F7]
                            placeholder:text-[#B7B7B7] cursor-pointer`,
                        selectedUnit
                          ? "text-[#585858] bg-blue-50"
                          : "text-[#B7B7B7]",
                      )}
                      onClick={unitInputButtonClickHandle}
                    >
                      {selectedUnit
                        ? selectedUnit.name
                        : "단위를 선택해주세요."}
                      <div className="absolute right-2.5 bottom-3">
                        <ArrowDown />
                      </div>
                    </button>
                  </div>

                  {isUnitOpen && (
                    <div
                      className="w-full h-[187px] rounded-lg mt-2 overflow-y-scroll 
                                absolute bg-white z-1
                                border-[1px] border-[#F0F0F0] 
                                [&::-webkit-scrollbar]:hidden"
                    >
                      {selectedFood &&
                        selectedFood.unit.map((unit, i) => (
                          <div
                            key={`food-search-result-${i}`}
                            className="h-[46px] relative cursor-pointer
                                    flex items-center justify-center
                                    hover:bg-[#F7F7F7]
                                    text-[#585858] text-[18px] font-normal"
                          >
                            <button
                              type="button"
                              className="cursor-pointer w-full h-full text-left pl-2.5"
                              onClick={unitClickHandle(unit)}
                            >
                              {unit.name}
                            </button>
                            <div
                              className="w-[394px] h-[1px] 
                                        absolute bottom-[-2px]
                                        bg-[#F0F0F0]"
                            ></div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
                {/* 수량 */}
                <div className="relative mt-3">
                  <label className="text-xl font-medium text-[#585858]">
                    수량
                  </label>
                  <input
                    type="text"
                    autoComplete="off"
                    value={amount}
                    onChange={amountInputHandle}
                    className="w-full h-[46px] pl-2.5
                            focus:outline-none
                            text-[#585858] text-lg font-normal
                            rounded-lg mt-3 bg-[#F7F7F7]
                            placeholder:text-[#B7B7B7]"
                    placeholder="양을 입력해주세요."
                  />
                </div>
                {/* 넣은 날짜 */}
                {/* <div className="relative mt-3">
                  <label className="text-xl font-medium text-[#585858]">
                    넣은 날짜
                  </label>
                  <input
                    ref={insertDateInputRef}
                    type="text"
                    autoComplete="off"
                    value={
                      insertDate
                        ? `${insertDate.getFullYear()}-${(
                            insertDate.getMonth() + 1
                          )
                            .toString()
                            .padStart(2, "0")}-${insertDate
                            .getDate()
                            .toString()
                            .padStart(2, "0")}`
                        : insertDateInput
                    }
                    className={cn(
                      `w-full h-[46px] pl-2.5
                      focus:outline-none
                      text-[#585858] text-lg font-normal
                      rounded-lg mt-3 bg-[#F7F7F7]
                      transition-all duration-100
                      placeholder:text-[#B7B7B7]`,
                      insertDate ? "bg-blue-50" : "",
                    )}
                    placeholder="냉장고에 넣은 날짜를 입력해주세요."
                    onBlur={insertDateBlurHandle}
                    onChange={changeInsertDateHandle}
                    onKeyDown={insertDateKeyDownHandle}
                  />
                </div> */}
                {/* 소비기한 */}
                <div className="relative mt-3">
                  <label className="text-xl font-medium text-[#585858]">
                    소비기한
                  </label>
                  <input
                    type="text"
                    id="food_name"
                    autoComplete="off"
                    value={
                      expirationDate
                        ? `${expirationDate.getFullYear()}-${(
                            expirationDate.getMonth() + 1
                          )
                            .toString()
                            .padStart(2, "0")}-${expirationDate
                            .getDate()
                            .toString()
                            .padStart(2, "0")}`
                        : expirationDateInput
                    }
                    ref={expirationDateInputRef}
                    onBlur={expirationDateBlurHandle}
                    onKeyDown={expirationDateKeyDownHandle}
                    onChange={changeExpirationDateHandle}
                    className={cn(
                      `w-full h-[46px] pl-2.5
                        focus:outline-none
                        text-[#585858] text-lg font-normal
                        rounded-lg mt-3 bg-[#F7F7F7]
                        transition-all duration-100
                        placeholder:text-[#B7B7B7]`,
                      expirationDate ? "bg-blue-50" : "",
                    )}
                    placeholder="음식의 소비 기한을 선택해주세요."
                  />
                </div>
                {/* 추가하기 버튼 */}
                <div>
                  <button
                    type="submit"
                    disabled={!isSubmitAble()}
                    className={cn(
                      `w-full h-12 mt-5 cursor-pointer
                      active:scale-95 transition-all duration-100
                      text-white text-xl font-semibold
                      flex items-center justify-center
                      rounded-lg`,
                      isSubmitAble() ? "bg-[#5097E0]" : "bg-[#D1D1D1]",
                    )}
                  >
                    {submitStatus === "pending" ? (
                      <LoadingSpinner />
                    ) : (
                      "추가하기"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </article>
        </div>
      ) : null}
    </>
  );
}
