// 회원가입 페이지 만들어줘
// 아이디, 아이디 중복확인 버튼, 비밀번호, 닉네임, 회원가입 완료 버튼이 있어. 그리고
// 유효성 검증할 수 있는 if문 형태만 대충 잡아줘

import { useState } from "react";
import useSignup from "./hooks/useSignup";

// 리액트로 만들어야지
export default function SignUpPage() {
  const [idInput, setIdInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [nicknameInput, setNicknameInput] = useState("");
  const { mutate } = useSignup();

  const handleIdCheck = () => {};

  const handleSignUp = () => {
    mutate({
      id: idInput,
      pw: passwordInput,
      nickname: nicknameInput,
    });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">회원가입</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label
              htmlFor="id"
              className="block text-sm font-medium text-gray-700"
            >
              아이디
            </label>
            <input
              type="text"
              id="id"
              className="pl-3 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 h-10"
              onChange={(e) => setIdInput(e.target.value)}
            />
            <button
              type="button"
              onClick={handleIdCheck}
              className="mt-2 text-white bg-blue-500 h-10 px-4 rounded-lg cursor-pointer"
            >
              중복확인
            </button>
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              className="pl-3 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 h-10"
              onChange={(e) => setPasswordInput(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="nickname"
              className="block text-sm font-medium text-gray-700"
            >
              닉네임
            </label>
            <input
              type="text"
              id="nickname"
              className="pl-3 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 h-10"
              onChange={(e) => setNicknameInput(e.target.value)}
            />
          </div>
          <button
            type="submit"
            onClick={handleSignUp}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200 cursor-pointer"
          >
            회원가입 완료
          </button>
        </form>
      </div>
    </div>
  );
}
