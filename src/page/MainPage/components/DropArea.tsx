import { useDrop } from "react-dnd";
import type { StrictPropsWithChildren } from "../../../types/react";
import { cn } from "../../../util/cn";
import { overlay, type OverlayAsyncControllerComponent } from "overlay-kit";

type Props2 = any & {
  item: { id: number };
};

export default function ThrowAwayDialog({ item, close }: Props2) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white p-6 w-[320px] rounded-2xl shadow-xl relative">
        <button onClick={() => close()} className="absolute top-3 right-3">
          ✕
        </button>
        <h2 className="text-lg font-bold mb-3">몇 개를 버릴까요?</h2>

        <div className="border p-3 rounded-xl text-sm text-gray-600 mb-4">
          <p>재료 ID: {item.id}</p>
        </div>

        <div className="flex items-center mb-4">
          <span className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center text-lg font-bold">
            1
          </span>
          <span className="ml-3">개 버릴래요.</span>
        </div>

        <button
          onClick={() => close(1)}
          className="w-full bg-gray-100 text-center text-gray-800 py-2 rounded-md font-semibold"
        >
          버리기
        </button>
      </div>
    </div>
  );
}

interface Props extends StrictPropsWithChildren {
  className?: string;
  icon: string;
}

export function DropArea({ children, className = "", icon }: Props) {
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: "FOOD", // FoodCard에서 type 지정 필요
    drop: async (item: { id: number }) => {
      console.log("드롭된 항목:", item);
      // 여기서 먹은 것 or 못 먹은 것 처리
      const result = await overlay.openAsync<any>((props) => (
        <ThrowAwayDialog {...props} item={item} />
      ));
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div className="bg-white p-2.5 h-[106px] flex-1 rounded-lg">
      <div
        ref={dropRef as any}
        className={cn(
          "text-base flex justify-center items-center flex-1 border-dashed border-[#D1D1D1] border-[1px] h-full rounded-xs flex-col gap-2",
          isOver ? "bg-[#FAFAFA]" : "",
        )}
      >
        <p>{icon}</p>
        <p className="text-base text-[#969696]">{children}</p>
      </div>
    </div>
  );
}
