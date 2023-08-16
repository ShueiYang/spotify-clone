import * as Tooltip from "@radix-ui/react-tooltip";
import { forwardRef } from "react";

interface TooltipMenuProps {
  content: string
  children: React.ReactNode
}

// tooltip wrapper component
const TooltipMenu = forwardRef<HTMLDivElement, TooltipMenuProps>(
  ({ content, children }, ref ) => {

  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild >
          <div ref={ref}>
           {children} 
          </div>     
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className="TooltipContent" sideOffset={5}>
            {content}
            <Tooltip.Arrow className="fill-teal-700" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
})
TooltipMenu.displayName = "TooltipMenu"

export default TooltipMenu;