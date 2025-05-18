import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../util/axiosInstance";
import { useEffect } from "react";
import type { AxiosError } from "axios";
import type { FoodEntity } from "../../../types/api/food/model/food";

export const useSearchFood = (name: string) => {
  const navigate = useNavigate();

  const query = useQuery<FoodEntity[], AxiosError>({
    queryKey: [`search-food-${name}`],
    async queryFn() {
      const response = await axiosInstance.get<FoodEntity[]>(`/food`, {
        params: {
          name,
        },
      });

      return response.data;
    },
  });

  useEffect(() => {
    if (!query.isError || !query.error) return;

    const status = query.error.response?.status;

    if (status === 401) {
      navigate("/login");
      return;
    }

    alert("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
  });

  return query;
};
