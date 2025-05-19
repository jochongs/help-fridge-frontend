import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import useLogin from "./hooks/useLogin";
import FilledLogo from "../../icon/FilledLogo";
import { cn } from "../../util/cn";
import LoadingSpinner from "../../icon/LoadingSpinner";

export default function LoginPage() {
  const [idInput, setIdInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const loginBUttonRef = useRef<HTMLButtonElement>(null);

  const loginButtonHandler = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();

    if (loginBUttonRef.current) {
      loginBUttonRef.current.classList.add("bg-[#488bcd]");
      loginBUttonRef.current.classList.add("scale-95");
      setTimeout(() => {
        loginBUttonRef.current?.classList.remove("bg-[#488bcd]");
        loginBUttonRef.current?.classList.remove("scale-95");
      }, 200);
    }

    if (idInput === "" || passwordInput === "") {
      alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    mutate({
      id: idInput,
      pw: passwordInput,
    });
  };

  const idInputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setIdInput(e.target.value);
  };

  const passwordInputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(e.target.value);
  };

  const { mutate, status: loginApiStatus } = useLogin();
  const isLoading = loginApiStatus === "pending";

  return (
    <div className="relative flex justify-center items-center bg-[#F5F5F5] min-h-screen">
      <form
        onSubmit={loginButtonHandler}
        className="max-w-[600px] w-full bg-white rounded-[20px] 
                  flex flex-col items-center justify-center"
      >
        <div className="flex flex-col justify-center items-center mt-6">
          <FilledLogo />
          <div className="mt-[29px] font-semibold text-lg flex flex-col items-center">
            <p>냉장고의 숨은 재료를</p>
            <p>쉽게 관리해드려요!</p>
          </div>
        </div>
        <div className="w-[60%] mt-6 relative">
          <div>
            <label
              className="text-xl font-medium text-[##585858]"
              htmlFor="id_input"
            >
              아이디
            </label>
            <input
              onChange={idInputOnChangeHandler}
              name="id_input"
              type="text"
              className="w-full h-11.5 bg-[#F7F7F7] rounded-lg pl-2.5 mt-2
                        text-[#585858] placeholder:text-[#969696]
                        focus:outline-none"
              placeholder="아이디를 입력하세요."
            />
            <p
              className="mt-2
                        font-normal text-sm text-[#969696]"
            >
              영어와 숫자 조합의 4~20글자
            </p>
          </div>
          <div className="mt-6">
            <label
              className="text-xl font-medium text-[##585858]"
              htmlFor="pw_input"
            >
              비밀번호
            </label>
            <input
              onChange={passwordInputOnChangeHandler}
              name="pw_input"
              type="password"
              className="w-full h-11.5 bg-[#F7F7F7] rounded-lg pl-2.5 mt-2
                        text-[#585858] placeholder:text-[#969696]
                        focus:outline-none"
              placeholder="비밀번호를 입력하세요."
            />
            <p
              className="mt-2
                        font-normal text-sm text-[#969696]"
            >
              영여, 숫자, 특수문자 조합의 8~20글자
            </p>
          </div>
          <div className="mt-[119px] w-full">
            <button
              ref={loginBUttonRef}
              type="submit"
              className={cn(
                `w-full h-12 cursor-pointer
                flex justify-center items-center
                text-xl rounded-lg text-[#FFFFFF]
                active:bg-[#488bcd] active:scale-95
                transition-all duration-200 ease-in-out`,
                true ? "bg-[#5097E0]" : "bg-[#D1D1D1]",
              )}
            >
              {isLoading ? <LoadingSpinner /> : "로그인"}
            </button>
            <a
              href="/signup"
              className="w-full h-12 flex justify-center items-center
                        mt-3 mb-6 font-medium text-[#818181] text-xl"
            >
              회원가입
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
