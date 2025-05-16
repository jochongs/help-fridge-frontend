import NavBar from "../../components/NavBar";
import { fridgeHistoryReason } from "../../types/fridge-history-type";
import { storageType } from "../../types/storage-type";
import { DropArea } from "./components/DropArea";
import SpaceSection from "./components/SpaceSection";
import { useGetFridgeAll } from "./hooks/useGetFridgeAll";

function MainPage() {
  const {
    query: { data: fridgeList1 },
    rerender: refetchFrozFridge,
  } = useGetFridgeAll(storageType.FROZ);

  const {
    query: { data: fridgeList2 },
    rerender: refetchRefrFridge,
  } = useGetFridgeAll(storageType.REFR);

  const {
    query: { data: fridgeList3 },
    rerender: refetchDrawFridge,
  } = useGetFridgeAll(storageType.DRAW);

  return (
    <>
      <NavBar />
      <div className="bg-[#F5F5F5]">
        <main className="relative max-w-[930px] w-full flex mx-auto px-7.5 flex-col pb-6">
          {/* 그림자 테일윈드: 
            shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] 
            그림자: shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]
            그림자: shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]
          */}
          <div className="sticky w-full top-[72px] z-50 flex gap-8">
            <DropArea
              refetchDrawFridge={refetchDrawFridge}
              refetchFrozFridge={refetchFrozFridge}
              refetchRefrFridge={refetchRefrFridge}
              type={fridgeHistoryReason.EATEN}
              icon="😊"
            >
              맛있게 먹은 재료들을 드래그 해서 넣어주세요.
            </DropArea>
            <DropArea
              refetchDrawFridge={refetchDrawFridge}
              refetchFrozFridge={refetchFrozFridge}
              refetchRefrFridge={refetchRefrFridge}
              type={fridgeHistoryReason.EXPIRED}
              icon="😢"
            >
              먹지 못한 재료들을 드래그 해서 넣어주세요
            </DropArea>
          </div>
          <SpaceSection
            type={storageType.FROZ}
            fridgeList={fridgeList1}
            className="mt-9"
            refetchFridgeList={[
              refetchRefrFridge,
              refetchFrozFridge,
              refetchDrawFridge,
            ]}
          >
            냉동실
          </SpaceSection>
          <SpaceSection
            type={storageType.REFR}
            fridgeList={fridgeList2}
            className="mt-6"
            refetchFridgeList={[
              refetchRefrFridge,
              refetchFrozFridge,
              refetchDrawFridge,
            ]}
          >
            냉장실
          </SpaceSection>
          <SpaceSection
            type={storageType.DRAW}
            fridgeList={fridgeList3}
            className="mt-6"
            refetchFridgeList={[
              refetchRefrFridge,
              refetchFrozFridge,
              refetchDrawFridge,
            ]}
          >
            서랍
          </SpaceSection>
        </main>
      </div>
    </>
  );
}
export default MainPage;
