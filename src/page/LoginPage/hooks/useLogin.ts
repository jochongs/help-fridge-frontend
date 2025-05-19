import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../util/axiosInstance";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { wait } from "../../../util/wait";

export default function useLogin() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: { id: string; pw: string }) => {
      await wait(1000);
      const result = await axiosInstance.post<void>("/auth/login", {
        id: data.id,
        pw: data.pw,
      });

      return result;
    },
    onSuccess: (data) => {
      navigate("/");
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        const statusCode = err.response?.status;

        if (statusCode === 400) {
          return alert("아이디 또는 비밀번호가 잘못되었습니다.");
        }

        if (statusCode === 401) {
          return alert("아이디 또는 비밀번호가 잘못되었습니다.");
        }
      }

      return alert("알 수 없는 오류가 발생했습니다. 다시 시도해주세요.");
    },
  });
}
