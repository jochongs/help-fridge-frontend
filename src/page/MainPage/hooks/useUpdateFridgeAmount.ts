import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../util/axiosInstance";
import axios from "axios";
import type { FridgeHistoryReason } from "../../../types/fridge-history-type";
import { wait } from "../../../util/wait";

interface Options {
  onSuccess: () => void;
}

export default function useUpdateFridgeAmount({ onSuccess }: Options) {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({
      idx,
      amount,
      reasonIdx,
    }: {
      idx: number;
      amount: number;
      reasonIdx: FridgeHistoryReason;
    }) => {
      await wait(500);
      await axiosInstance.put<void>(`/v2/fridge/${idx}/amount`, {
        amount: amount,
        reasonIdx: reasonIdx,
      });
    },
    onSuccess: () => {
      onSuccess();
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        const statusCode = err.response?.status;

        if (statusCode === 401) {
          navigate("/login");
          return;
        }
      }

      return alert("알 수 없는 오류가 발생했습니다. 다시 시도해주세요.");
    },
  });
}
