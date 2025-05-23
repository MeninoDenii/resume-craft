import {
  Tooltip as TooltipRoot,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./primitive";
import { ReactNode } from "react";

type TooltipProps = {
  children: ReactNode;
  content: string | ReactNode | number;
};

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  ...props
}) => {
  return (
    <TooltipProvider>
      <TooltipRoot delayDuration={300}>
        <TooltipTrigger asChild {...props}>
          {children}
        </TooltipTrigger>
        <TooltipContent>
          <p>{content}</p>
        </TooltipContent>
      </TooltipRoot>
    </TooltipProvider>
  );
};
