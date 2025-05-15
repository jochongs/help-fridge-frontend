import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axiosInstance from "../../../util/axiosInstance";
import type { StorageType } from "../../../types/storage-type";
import type { FridgeEntity } from "../../../types/api/fridge/model/fridge";

export const useGetFridgeAll = (type: StorageType) => {
  const [flag, setFlag] = useState(false);

  const rerender = () => {
    setFlag((prev) => !prev);
  };

  const query = useQuery({
    queryKey: ["fridge-"],
    async queryFn() {
      const response = await axiosInstance.get<FridgeEntity[]>(
        "/v2/fridge?type=" + type,
      );

      return response.data;
    },
    staleTime: 0,
  });

  return {
    query,
  };
};
