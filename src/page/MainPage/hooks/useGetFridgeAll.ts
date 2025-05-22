import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import axiosInstance from "../../../util/axiosInstance";
import type { StorageType } from "../../../types/storage-type";
import type { FridgeEntity } from "../../../types/api/fridge/model/fridge";
import type { AxiosError } from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

export const useGetFridgeAll = (type: StorageType) => {
  const [flag, setFlag] = useState(false);

  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const sortType = searchParams.get(`storage${type}`) || 1;

  const rerender = () => {
    setFlag((prev) => !prev);
  };

  const query = useQuery<FridgeEntity[], AxiosError>({
    queryKey: [`fridge-all-${flag}-${type}`, `storage${type}-${sortType}`],
    async queryFn() {
      const response = await axiosInstance.get<FridgeEntity[]>(
        "/v2/fridge?storageType=" + type + "&sortType=" + sortType,
      );
      return response.data;
    },
    staleTime: 0,
    retry: 0,
    gcTime: 0,
    placeholderData: (previousData, previousQuery) => previousData,
  });

  useEffect(() => {
    if (!query.isError || !query.error) return;

    const status = query.error.response?.status;

    if (status === 401) {
      navigate("/login");
      return;
    }

    alert("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
  }, [query.isError, query.error]);

  return {
    query,
    rerender,
  };
};
