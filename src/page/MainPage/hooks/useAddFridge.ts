import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import type { StorageType } from "../../../types/storage-type";
import axiosInstance from "../../../util/axiosInstance";
import { wait } from "../../../util/wait";

interface Options {
  onSuccess: () => void;
}

interface AddFridgeDTO {
  foodIdx: number;
  unitIdx: number;
  storage: StorageType;
  amount: number;
  expiredAt: Date | null;
}

export default function useAddFridge({ onSuccess }: Options) {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (dto: AddFridgeDTO) => {
      await wait(300);
      await axiosInstance.post("/v2/fridge", {
        foodIdx: dto.foodIdx,
        unitIdx: dto.unitIdx,
        storage: dto.storage,
        amount: dto.amount,
        expiredAt: dto.expiredAt,
      });
    },
    onSuccess() {
      onSuccess();
    },
    onError(err) {
      if (axios.isAxiosError(err)) {
        const statusCode = err.response?.status;

        if (statusCode === 401) {
          navigate("/login");
          return;
        }
      }

      alert("알 수 없는 오류가 발생했습니다. 다시 시도해주세요.");
    },
  });
}
