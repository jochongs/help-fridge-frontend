import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import axiosInstance from "../../../util/axiosInstance";
import { useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";
import type { RecommendRecipeEntity } from "../../../types/api/recommend-recipe/model/recommend-recipe";
import type { RecommendType } from "../../../types/recommend-type";

export const useGetRecommendedRecipe = (type: RecommendType) => {
  const navigate = useNavigate();

  const query = useQuery<RecommendRecipeEntity[], AxiosError>({
    queryKey: ["recipe-recommend", type],
    queryFn: async () => {
      const response = await axiosInstance.get<RecommendRecipeEntity[]>(
        "/recipe/recommend?type=" + type,
      );
      return response.data;
    },
    staleTime: 0,
    retry: 0,
    gcTime: 0,
  });

  useEffect(() => {
    if (!query.isError || !query.error) return;

    const status = query.error.response?.status;

    if (status === 401) {
      navigate("/login");
    } else {
      alert("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  }, [query.isError, query.error]);

  return query;
};
