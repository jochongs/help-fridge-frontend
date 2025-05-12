import { useState, type ChangeEvent } from "react";
import useLogin from "./hooks/useLogin";

export default function LoginPage() {
  const [idInput, setIdInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const loginButtonHandler = () => {
    if (idInput === "" || passwordInput === "") {
      alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    mutate({
      id: idInput,
      pw: passwordInput,
    });
  };

  const { mutate } = useLogin();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">로그인</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            loginButtonHandler();
          }}
        >
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              아이디
            </label>
            <input
              type="text"
              id="username"
              className="mt-1 block w-full border border-gray-300 rounded-md 
              shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 h-10"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setIdInput(e.target.value)
              }
            />
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
              className="mt-1 block w-full border border-gray-300 rounded-md 
              shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 h-10"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPasswordInput(e.target.value)
              }
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 cursor-pointer"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}
