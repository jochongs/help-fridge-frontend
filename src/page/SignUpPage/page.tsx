import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import useSignup from "./hooks/useSignup";
import useCheckIdDuplicate from "./hooks/useCheckIdDuplicate";
import FilledLogo from "../../icon/FilledLogo";
import { cn } from "../../util/cn";
import LoadingSpinner from "../../icon/LoadingSpinner";

export default function SignUpPage() {
  const [idInput, setIdInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [nicknameInput, setNicknameInput] = useState("");
  const [isIdChecked, setIsIdChecked] = useState(false);

  const signupBUttonRef = useRef<HTMLButtonElement>(null);

  const signupButtonHandler = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();

    if (signupBUttonRef.current) {
      signupBUttonRef.current.classList.add("bg-[#488bcd]");
      signupBUttonRef.current.classList.add("scale-95");
      setTimeout(() => {
        signupBUttonRef.current?.classList.remove("bg-[#488bcd]");
        signupBUttonRef.current?.classList.remove("scale-95");
      }, 200);
    }

    if (idInput === "") {
      alert("아이디를 입력해주세요.");
      return;
    }
    if (passwordInput === "") {
      alert("비밀번호를 입력해주세요.");
      return;
    }
    if (nicknameInput === "") {
      alert("닉네임을 입력해주세요.");
      return;
    }

    if (!isIdChecked) {
      alert("아이디 중복확인을 해주세요.");
      return;
    }

    mutate({
      id: idInput,
      pw: passwordInput,
      nickname: nicknameInput,
    });
  };

  const idInputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setIdInput(e.target.value);
    setIsIdChecked(false);
  };

  const passwordInputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(e.target.value);
  };

  const nicknameInputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNicknameInput(e.target.value);
  };

  const { mutate: idCheckMutate } = useCheckIdDuplicate(setIsIdChecked);

  const handleIdCheck = () => {
    idCheckMutate(idInput);
  };

  const { mutate, status: signupApiStatus } = useSignup();
  const isLoading = signupApiStatus === "pending";

  return (
    <div className="relative flex justify-center items-center bg-[#F5F5F5] min-h-screen">
      <form
        onSubmit={signupButtonHandler}
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
            <div className="flex items-center gap-2 mt-2">
              <input
                onChange={idInputOnChangeHandler}
                name="id_input"
                type="text"
                className="flex-1 h-11 bg-[#F7F7F7] rounded-lg pl-2.5
                           text-[#585858] placeholder:text-[#969696]
                           focus:outline-none"
                placeholder="아이디를 입력하세요."
              />
              {isIdChecked ? (
                <span className="mt-1 text-sm text-green-500 block">
                  사용 가능한 아이디입니다.
                </span>
              ) : (
                <button
                  type="button"
                  onClick={handleIdCheck}
                  className="h-11 px-4 bg-blue-100 text-blue-600 rounded-lg whitespace-nowrap"
                  disabled={isIdChecked}
                >
                  중복확인
                </button>
              )}
            </div>
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
          <div className="mt-6">
            <label
              className="text-xl font-medium text-[##585858]"
              htmlFor="nickname_input"
            >
              닉네임
            </label>
            <input
              onChange={nicknameInputOnChangeHandler}
              name="nickname_input"
              type="text"
              className="w-full h-11.5 bg-[#F7F7F7] rounded-lg pl-2.5 mt-2
                        text-[#585858] placeholder:text-[#969696]
                        focus:outline-none"
              placeholder="사용할 닉네임을 입력하세요."
            />
            <p
              className="mt-2
                        font-normal text-sm text-[#969696]"
            >
              영여, 한글 조합의 2~6글자
            </p>
          </div>
          <div className="mt-10 w-full mb-7">
            <button
              ref={signupBUttonRef}
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
              {isLoading ? <LoadingSpinner /> : "회원가입"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
