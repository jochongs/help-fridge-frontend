import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../util/axiosInstance";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { wait } from "../../../util/wait";

interface SignupDto {
  id: string;
  pw: string;
  nickname: string;
}

const validationCheck = (data: SignupDto) => {
  // id 4 ~ 20자
  // /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,20}$/

  // pw 8 ~ 20자
  // /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{}[\]|;:'",.<>?/`~])[A-Za-z\d!@#$%^&*()\-_=+{}[\]|;:'",.<>?/`~]{8,20}$/

  // nickname 2 ~ 6자
  // /^[A-Za-z가-힣]{2,6}$/

  console.log(data);

  if (data.id.length < 4 || data.id.length > 20) {
    alert("아이디는 4자 이상 20자 이하로 입력해주세요.");
    return false;
  }
  if (data.pw.length < 8 || data.pw.length > 20) {
    alert("비밀번호는 8자 이상 20자 이하로 입력해주세요.");
    return false;
  }
  if (data.nickname.length < 2 || data.nickname.length > 6) {
    alert("닉네임은 2자 이상 6자 이하로 입력해주세요.");
    return false;
  }
  if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,20}$/.test(data.id)) {
    alert("아이디는 영문자와 숫자를 포함해야 합니다.");
    return false;
  }
  if (
    !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{}[\]|;:'",.<>?/`~])[A-Za-z\d!@#$%^&*()\-_=+{}[\]|;:'",.<>?/`~]{8,20}$/.test(
      data.pw,
    )
  ) {
    alert("비밀번호는 영문자, 숫자, 특수문자를 포함해야 합니다.");
    return false;
  }
  if (!/^[A-Za-z가-힣]{2,6}$/.test(data.nickname)) {
    alert("닉네임은 영문자 또는 한글로만 입력해주세요.");
    return false;
  }
  return true;
};

export default function useSignup() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: SignupDto) => {
      await wait(1000);
      if (!validationCheck(data)) {
        return;
      }

      return await axiosInstance.post<void>("/auth/signup", data);
    },
    onSuccess(data) {
      if (!data) return;

      const statusCode = data.status;

      navigate("/login");
    },
    onError(err) {
      if (axios.isAxiosError(err)) {
        const statusCode = err.response?.status;
        if (statusCode === 400) {
          return alert("아이디 또는 비밀번호가 잘못되었습니다.");
        }

        if (statusCode === 409) {
          return alert("이미 존재하는 아이디입니다.");
        }
      }

      alert("알 수 없는 오류가 발생했습니다. 다시 시도해주세요.");
    },
  });
}
