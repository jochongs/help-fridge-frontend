import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../util/axiosInstance";
import axios from "axios";
import type { SetState } from "../../../types/react";

const validateCheck = (id: string) => {
  if (id.length < 4 || id.length > 20) {
    alert("아이디는 4자 이상 20자 이하로 입력해주세요.");
    return false;
  }

  if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,20}$/.test(id)) {
    alert("아이디는 영문자와 숫자를 포함해야 합니다.");
    return false;
  }

  return true;
};

export default function useCheckIdDuplicate(setIsIdChecked: SetState<boolean>) {
  return useMutation({
    mutationFn: async (id: string) => {
      if (!validateCheck(id)) {
        return;
      }

      return await axiosInstance.post<void>("/auth/check-duplicate", {
        id,
      });
    },
    onSuccess(data) {
      if (!data) return;

      setIsIdChecked(true);

      alert("사용 가능한 아이디입니다.");
    },
    onError(err) {
      if (axios.isAxiosError(err)) {
        const statusCode = err.response?.status;

        if (statusCode === 409) {
          return alert("이미 존재하는 아이디입니다.");
        }
      }

      alert("알 수 없는 오류가 발생했습니다. 다시 시도해주세요.");
    },
  });
}
