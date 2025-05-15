import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axiosInstance from "../../../util/axiosInstance";

export const useGetFridgeAll = () => {
  const [flag, setFlag] = useState(false);

  const rerender = () => {
    setFlag((prev) => !prev);
  };

  const query = useQuery({
    queryKey: ["fridge-"],
    async queryFn() {
      const response = await axiosInstance.get("/v2/fridge");

      console.log(response.data);
    },
    staleTime: 0,
  });
};
