import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { wait } from "../../../util/wait";
import axiosInstance from "../../../util/axiosInstance";
import axios from "axios";

export default function useLogout() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      await wait(500);
      const result = await axiosInstance.post<void>("/auth/logout");
      return result;
    },
    onSuccess: () => {
      navigate("/login");
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        return alert("로그아웃 중 오류가 발생했습니다.");
      }
      return alert("알 수 없는 오류가 발생했습니다. 다시 시도해주세요.");
    },
  });
}