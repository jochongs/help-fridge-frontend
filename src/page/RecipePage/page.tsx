import NavBar from "../../components/NavBar";
import { recommendType } from "../../types/recommend-type";
import { storageType } from "../../types/storage-type";
import { useGetFridgeAll } from "../MainPage/hooks/useGetFridgeAll";
import RecommendRecipeSection from "./components/RecommendRecipeSection";
import { useGetFridgeAllType } from "./hooks/useGetFridgeAllType";
import { useGetRecommendedRecipe } from "./hooks/useGetRecommendRecipe";

export default function RecipePage() {
  const { data: recommendRecipeList1 } = useGetRecommendedRecipe(
    recommendType.NEAR,
  );
  const { data: recommendRecipeList2 } = useGetRecommendedRecipe(
    recommendType.OWN,
  );

  const {
    query: { data: fridgeList },
  } = useGetFridgeAllType();

  return (
    <>
      <NavBar />
      <div className="bg-[#F5F5F5] min-h-[100vh]">
        <main className="relative max-w-[930px] w-full flex mx-auto px-7.5 flex-col pb-6">
          <RecommendRecipeSection
            recommendRecipeList={recommendRecipeList1}
            className="mt-9"
            fridgeList={fridgeList}
          >
            버리기 아까운 재료
          </RecommendRecipeSection>
          <RecommendRecipeSection
            recommendRecipeList={recommendRecipeList2}
            className="mt-6"
            fridgeList={fridgeList}
          >
            집콕 데이
          </RecommendRecipeSection>
        </main>
      </div>
    </>
  );
}
