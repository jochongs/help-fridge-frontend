import { useDrop } from "react-dnd";
import type { StrictPropsWithChildren } from "../../../types/react";
import { cn } from "../../../util/cn";
import { overlay } from "overlay-kit";
import type { FridgeEntity } from "../../../types/api/fridge/model/fridge";
import type { FridgeHistoryReason } from "../../../types/fridge-history-type";
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
      className={cn("bg-white p-2.5 h-[106px] flex-1 rounded-lg", className)}
    >
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
