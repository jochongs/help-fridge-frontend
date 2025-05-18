import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../util/axiosInstance";
import { useEffect, useState } from "react";
import type { AxiosError } from "axios";
import {
  foodMockingData,
  foodMockingData2,
  type FoodEntity,
} from "../../../types/api/food/model/food";
import { wait } from "../../../util/wait";

export const useSearchFood = (name: string) => {
  const navigate = useNavigate();

  const [isFoodSearchResultOpen, setIsFoodSearchResultOpen] = useState(false);

  const query = useQuery<FoodEntity[], AxiosError>({
    queryKey: [`search-food-${name || ""}`],
    async queryFn() {
      const response = await axiosInstance.get<FoodEntity[]>(`/food`, {
        params: {
          name,
        },
      });

      if (typeof response.data === "string") {
        return [foodMockingData, foodMockingData2];
      }

      setIsFoodSearchResultOpen(true);
      return response.data;
    },
    staleTime: 0,
    retry: 0,
    gcTime: 0,
    placeholderData: (previousData, previousQuery) => previousData,
  });

  useEffect(() => {
    if (!query.isError || !query.error) return;

    setIsFoodSearchResultOpen(false);

    const status = query.error.response?.status;

    if (status === 401) {
      navigate("/login");
      return;
    }

    alert("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
  });

  return { ...query, isFoodSearchResultOpen, setIsFoodSearchResultOpen };
};
