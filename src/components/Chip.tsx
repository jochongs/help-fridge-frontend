import type { StrictPropsWithChildren } from "../types/react";
import { cn } from "../util/cn";

interface Props extends StrictPropsWithChildren {
  type: "purple" | "orange" | "green" | "gray" | "red";
  className?: string;
}

export default function Chip({ children, type, className = "" }: Props) {
  return (
    <div
      className={cn(
        "py-0.5 px-1.5 text-base font-medium rounded-sm",
        type === "purple" ? "text-[#A45EE5] bg-[#F2E6FF]" : "",
        type === "orange" ? "text-[#FF7D05] bg-[#FFEDD8]" : "",
        type === "green" ? "text-[#42A840] bg-[#D5F3D5]" : "",
        type === "gray" ? "text-[#585858] bg-[#F0F0F0]" : "",
        type === "red" ? "text-[#FF5D5D] bg-[#FFE8E8]" : "",
        className,
      )}
    >
      {children}
    </div>
  );
}
