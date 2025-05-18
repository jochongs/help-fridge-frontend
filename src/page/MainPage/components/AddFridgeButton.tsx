import { overlay } from "overlay-kit";
import type { StorageType } from "../../../types/storage-type";
import AddFridgeDialog from "./AddFridgeDialog";

interface Props {
  className?: string;
  type: StorageType;
  onSuccess: () => void;
}

export function AddFridgeButton({ type, onSuccess }: Props) {
  const buttonClickHandler = async () => {
    await overlay.openAsync((props) => (
      <AddFridgeDialog
        onClose={() => {
          overlay.close(props.overlayId);
        }}
        isOpen={props.isOpen}
        type={type}
        afterSuccess={onSuccess}
      />
    ));
  };

  return (
    <button
      className="flex gap-1.5 text-lg text-[#818181] items-center font-medium cursor-pointer active:scale-90 transition-all duration-100 ease-in-out"
      onClick={buttonClickHandler}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.99984 4.1665C10.2209 4.1665 10.4328 4.2543 10.5891 4.41058C10.7454 4.56686 10.8332 4.77882 10.8332 4.99984V9.1665H14.9998C15.2209 9.1665 15.4328 9.2543 15.5891 9.41058C15.7454 9.56686 15.8332 9.77882 15.8332 9.99984C15.8332 10.2209 15.7454 10.4328 15.5891 10.5891C15.4328 10.7454 15.2209 10.8332 14.9998 10.8332H10.8332V14.9998C10.8332 15.2209 10.7454 15.4328 10.5891 15.5891C10.4328 15.7454 10.2209 15.8332 9.99984 15.8332C9.77882 15.8332 9.56686 15.7454 9.41058 15.5891C9.2543 15.4328 9.1665 15.2209 9.1665 14.9998V10.8332H4.99984C4.77882 10.8332 4.56686 10.7454 4.41058 10.5891C4.2543 10.4328 4.1665 10.2209 4.1665 9.99984C4.1665 9.77882 4.2543 9.56686 4.41058 9.41058C4.56686 9.2543 4.77882 9.1665 4.99984 9.1665H9.1665V4.99984C9.1665 4.77882 9.2543 4.56686 9.41058 4.41058C9.56686 4.2543 9.77882 4.1665 9.99984 4.1665Z"
          fill="#818181"
        />
      </svg>
      음식 추가
    </button>
  );
}
