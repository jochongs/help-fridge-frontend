import { useState } from "react";
import {
  foodMockingData,
  foodMockingData2,
  type FoodEntity,
} from "../../../types/api/food/model/food";
import ArrowDown from "../../../icon/ArrowDown";
import { cn } from "../../../util/cn";
import type { UnitEntity } from "../../../types/api/unit/model/unit";

interface Props {
  onClose: () => void;
  isOpen: boolean;
}

export default function AddFridgeDialog({ isOpen, onClose }: Props) {
  const closeDialog = () => {
    onClose();
  };

  const [searchResult, setSearchResult] = useState<FoodEntity[] | undefined>();
  //     [
  //     foodMockingData,
  //     foodMockingData2,
  //     foodMockingData,
  //     foodMockingData2,
  //     foodMockingData,
  //     foodMockingData2,
  //     foodMockingData,
  //     foodMockingData2,
  //   ]

  const [selectedFood, setSelectedFood] = useState<FoodEntity | undefined>(
    foodMockingData,
  );
  const [selectedUnit, setSelectedUnit] = useState<UnitEntity | undefined>();

  const [isUnitOpen, setIsUnitOpen] = useState(false);

  const submitHandle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      {isOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
          onClick={closeDialog}
        >
          <article
            className="w-[440px] rounded-[20px] h-[622px] 
            animate-[var(--animate-popin)] p-5 bg-white
            flex flex-col text-xl font-semibold"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <h3 className="">추가할 음식 정보를 알려주세요.</h3>
              <form className="mt-3" onSubmit={submitHandle}>
                {/* 음식 이름 */}
                <div className="relative">
                  <label
                    htmlFor="food_name"
                    className="text-xl font-medium text-[#585858]"
                  >
                    음식 이름
                  </label>
                  <input
                    type="text"
                    id="food_name"
                    className="w-full h-[46px] pl-2.5
                            text-[#585858] text-lg font-normal
                            rounded-lg mt-3 bg-[#F7F7F7]
                            placeholder:text-[#B7B7B7]"
                    placeholder="검색어를 입력해주세요."
                  />
                  {searchResult &&
                    searchResult.map((food, i) => (
                      <div
                        className="mt-2 w-full rounded-lg absolute h-[187px] 
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
                          <button type="button" className="">
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
                        selectedUnit ? "text-[#585858]" : "text-[#B7B7B7]",
                      )}
                      onClick={() => setIsUnitOpen((prev) => !prev)}
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
                            <button type="button" className="">
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
                  <label
                    htmlFor="food_name"
                    className="text-xl font-medium text-[#585858]"
                  >
                    수량
                  </label>
                  <input
                    type="text"
                    id="food_name"
                    className="w-full h-[46px] pl-2.5
                            text-[#585858] text-lg font-normal
                            rounded-lg mt-3 bg-[#F7F7F7]
                            placeholder:text-[#B7B7B7]"
                    placeholder="양을 입력해주세요."
                  />
                </div>
                {/* 넣은 날짜 */}
                <div className="relative mt-3">
                  <label
                    htmlFor="food_name"
                    className="text-xl font-medium text-[#585858]"
                  >
                    넣은 날짜
                  </label>
                  <input
                    type="text"
                    id="food_name"
                    className="w-full h-[46px] pl-2.5
                            text-[#585858] text-lg font-normal
                            rounded-lg mt-3 bg-[#F7F7F7]
                            placeholder:text-[#B7B7B7]"
                    placeholder="냉장고에 넣은 날짜를 입력해주세요."
                  />
                </div>
                {/* 소비기한 */}
                <div className="relative mt-3">
                  <label
                    htmlFor="food_name"
                    className="text-xl font-medium text-[#585858]"
                  >
                    소비기한
                  </label>
                  <input
                    type="text"
                    id="food_name"
                    className="w-full h-[46px] pl-2.5
                            text-[#585858] text-lg font-normal
                            rounded-lg mt-3 bg-[#F7F7F7]
                            placeholder:text-[#B7B7B7]"
                    placeholder="음식의 소비 기한을 선택해주세요."
                  />
                </div>
                {/* 추가하기 버튼 */}
                <div>
                  <button
                    type="submit"
                    className="w-full h-12 mt-5 cursor-pointer
                            active:scale-95 transition-all duration-100
                            text-white text-xl font-semibold
                            bg-[#D1D1D1] rounded-lg"
                  >
                    추가하기
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
