import { OverlayTrigger, Tooltip, Button } from "react-bootstrap";

interface TooltipButtonProps {
  text: string;
  onClick: () => void;
  children: React.ReactNode;
}

const TooltipButton: React.FC<TooltipButtonProps> = ({
  text,
  onClick,
  children,
}) => {
  const renderTooltip = (text: string) => (
    <Tooltip id="button-tooltip">{text}</Tooltip>
  );
  return (
    <OverlayTrigger
      placement="right"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip(text)}
    >
      <Button variant="light" onClick={onClick}>
        {children}
      </Button>
    </OverlayTrigger>
  );
};

export default TooltipButton;
