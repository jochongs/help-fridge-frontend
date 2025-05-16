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
        <main className="max-w-[930px] w-full flex mx-auto px-7.5 flex-col pb-6">
          <div className="flex gap-8.5 mt-6">
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
          <SpaceSection fridgeList={fridgeList1} className="mt-9">
            냉동실
          </SpaceSection>
          <SpaceSection fridgeList={fridgeList2} className="mt-6">
            냉장실
          </SpaceSection>
          <SpaceSection fridgeList={fridgeList3} className="mt-6">
            서랍
          </SpaceSection>
        </main>
      </div>
    </>
  );
}
export default MainPage;
