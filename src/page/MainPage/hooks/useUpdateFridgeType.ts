import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../util/axiosInstance";
import type { StorageType } from "../../../types/storage-type";
import type { FridgeEntity } from "../../../types/api/fridge/model/fridge";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Options {
  onSuccess: (fridge: FridgeEntity, toStorageIdx: StorageType) => void;
}

export default function useUpdateFridgeType({ onSuccess }: Options) {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({
      fridge,
      toStorageIdx,
    }: {
      fridge: FridgeEntity;
      toStorageIdx: StorageType;
    }) => {
      await axiosInstance.put<void>(`/v2/fridge/${fridge.idx}`, {
        storage: toStorageIdx,
      });

      return { fridge, toStorageIdx };
    },
    onSuccess({ fridge, toStorageIdx }) {
      onSuccess(fridge, toStorageIdx);
    },
    onError(err) {
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
