import NavBar from "../../components/NavBar";
import { DropArea } from "./components/DropArea";
import SpaceSection from "./components/SpaceSection";

function MainPage() {
  return (
    <>
      <NavBar />
      <div className="bg-[#F5F5F5]">
        <main className="max-w-[930px] w-full flex mx-auto px-7.5 flex-col pb-6">
          <div className="flex gap-8.5 mt-6">
            <DropArea icon="😊">
              맛있게 먹은 재료들을 드래그 해서 넣어주세요.
            </DropArea>
            <DropArea icon="😢">
              먹지 못한 재료들을 드래그 해서 넣어주세요
            </DropArea>
          </div>
          <SpaceSection className="mt-9">냉동실</SpaceSection>
          <SpaceSection className="mt-6">냉장실</SpaceSection>
          <SpaceSection className="mt-6">서랍</SpaceSection>
        </main>
      </div>
    </>
  );
}
export default MainPage;
