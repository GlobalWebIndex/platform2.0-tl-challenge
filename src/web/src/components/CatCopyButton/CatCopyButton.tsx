import { FiCopy } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TooltipButton from "../TooltipButton/TooltipButton";

import CopyTextToClipboard from "../../utils/clipboard";

interface CatCopyButtonProps {
  copyText: string;
  tooltipText: string;
  size: number;
}

const CatCopyButton: React.FC<CatCopyButtonProps> = ({
  copyText,
  tooltipText,
  size,
}) => {
  return (
    <>
      <ToastContainer hideProgressBar closeOnClick />
      <TooltipButton
        text={tooltipText}
        onClick={() => {
          CopyTextToClipboard(
            copyText,
            () => {
              toast.info("Image url copied to clipboard");
            },
            () => {
              toast.error("Couldn't copy image url");
            }
          );
        }}
      >
        <FiCopy size={size} />
      </TooltipButton>
    </>
  );
};

export default CatCopyButton;
