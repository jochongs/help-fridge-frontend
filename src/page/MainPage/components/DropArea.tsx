import type { StrictPropsWithChildren } from "../../../types/react";

interface Props extends StrictPropsWithChildren {
  className?: string;
  icon: string;
}

export function DropArea({ children, className = "", icon }: Props) {
  return (
    <div className="bg-white p-2.5 h-[106px] flex-1 rounded-lg">
      <div className="text-base flex justify-center items-center flex-1 border-dashed border-[#D1D1D1] border-[1px] h-full rounded-xs flex-col gap-2">
        <p>{icon}</p>
        <p className="text-base text-[#969696]">{children}</p>
      </div>
    </div>
  );
}
