import { useDrop } from "react-dnd";
import type { StrictPropsWithChildren } from "../../../types/react";
import { cn } from "../../../util/cn";
import { overlay } from "overlay-kit";
import type { FridgeEntity } from "../../../types/api/fridge/model/fridge";
import {
  fridgeHistoryReason,
  type FridgeHistoryReason,
} from "../../../types/fridge-history-type";
import UpdateFridgeAmountDialog from "./UpdateFridgeAmountDialog";
import { storageType } from "../../../types/storage-type";

interface Props extends StrictPropsWithChildren {
  className?: string;
  icon: string;
  type: FridgeHistoryReason;
  refetchFrozFridge: () => void;
  refetchRefrFridge: () => void;
  refetchDrawFridge: () => void;
}

export function DropArea({
  children,
  className = "",
  icon,
  type,
  refetchFrozFridge,
  refetchRefrFridge,
  refetchDrawFridge,
}: Props) {
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: "FOOD",
    drop: async (item: { fridge: FridgeEntity }) => {
      const fridge = item.fridge;
      await overlay.openAsync((props) => (
        <UpdateFridgeAmountDialog
          {...props}
          fridge={fridge}
          onClose={() => {
            overlay.closeAll();
          }}
          type={type}
          onSuccess={() => {
            if (fridge.storage === storageType.FROZ) {
              refetchFrozFridge();
            } else if (fridge.storage === storageType.REFR) {
              refetchRefrFridge();
            } else if (fridge.storage === storageType.DRAW) {
              refetchDrawFridge();
            }
          }}
        />
      ));
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      className={cn(
        "shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-2.5 h-[106px] flex-1 rounded-lg transition-all duration-100",
        type === fridgeHistoryReason.EATEN
          ? "bg-[#D5F3D5] text-[#42A840]"
          : "bg-[#FFE8E8] text-[#FF5D5D]",
        isOver ? "scale-90" : "",
        className,
      )}
    >
      <div
        ref={dropRef as any}
        className={cn(
          "text-base flex justify-center items-center flex-1 border-dashed border-2 h-full rounded-xs flex-col gap-2",
          type === fridgeHistoryReason.EATEN
            ? "border-[#42A840]"
            : "border-[#FF5D5D]",
        )}
      >
        <p className="select-none">{icon}</p>
        <p
          className={cn(
            "text-base select-none",
            type === fridgeHistoryReason.EATEN
              ? "text-[#42A840]"
              : "text-[#FF5D5D]",
          )}
        >
          {children}
        </p>
      </div>
    </div>
  );
}
