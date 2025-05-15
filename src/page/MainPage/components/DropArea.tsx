import { useDrop } from "react-dnd";
import type { StrictPropsWithChildren } from "../../../types/react";
import { cn } from "../../../util/cn";
import { overlay, type OverlayAsyncControllerComponent } from "overlay-kit";
import type { FridgeEntity } from "../../../types/api/fridge/model/fridge";
import FoodCard from "../../../components/FoodCard";

type Props2 = {
  fridge: FridgeEntity;
  onClose: () => void;
  isOpen?: boolean;
};

export default function ThrowAwayDialog({ fridge, onClose, isOpen }: Props2) {
  const handleClose = () => {
    onClose();
  };

  return (
    <>
      {isOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
          onClick={handleClose}
        >
          <div
            className="flex flex-col bg-white p-6 w-[334px] rounded-2xl shadow-xl relative px-5 pt-5 py-4"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <h3 className="text-xl font-semibold">몇 개를 버릴까요?</h3>
            <article className="w-[294px] px-4 py-2.5 rounded-lg border-2 border-[#F2F2F2] mt-3">
              <FoodCard fridge={fridge} />
            </article>
            <div className="border-[1.5px] border-[#F2F2F2] my-3"></div>
            <div className="flex items-center-safe">
              <input
                type="text"
                className="w-8.5 h-8.5 text-xl rounded-sm bg-[#F0F0F0] mr-1.5 text-[#494949] flex justify-center items-center text-center focus:outline-none"
              />
              <span className="text-xl text-[##494949]">개 버릴래요.</span>
            </div>
            <button className="h-12 bg-[#F0F0F0] text-xl font-semibold mt-5 rounded-lg cursor-pointer">
              버리기
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

interface Props extends StrictPropsWithChildren {
  className?: string;
  icon: string;
}

export function DropArea({ children, className = "", icon }: Props) {
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: "FOOD", // FoodCard에서 type 지정 필요
    drop: async (item: { fridge: FridgeEntity }) => {
      const fridge = item.fridge;
      const result = await overlay.openAsync<any>((props) => (
        <ThrowAwayDialog
          {...props}
          fridge={fridge}
          onClose={() => {
            overlay.closeAll();
          }}
        />
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
          "text-base flex justify-center items-center flex-1 border-dashed border-[#D1D1D1] border-2 h-full rounded-xs flex-col gap-2",
          isOver ? "bg-[#FAFAFA]" : "",
        )}
      >
        <p>{icon}</p>
        <p className="text-base text-[#969696]">{children}</p>
      </div>
    </div>
  );
}
