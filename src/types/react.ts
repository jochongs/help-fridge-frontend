import type { Dispatch, SetStateAction } from "react";

/**
 * State를 변경하는 set함수 타입 정의
 */
export type SetState<T = any> = Dispatch<SetStateAction<T>>;
