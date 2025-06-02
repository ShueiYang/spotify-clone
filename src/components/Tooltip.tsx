import * as Tooltip from "@radix-ui/react-tooltip";

interface TooltipMenuProps {
  content: string;
  children: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
}

/**
 * Tooltip wrapper component
 */
export default function TooltipMenu({
  children,
  content,
  ref,
}: Readonly<TooltipMenuProps>) {
  return (
    // eslint-disable-next-line @eslint-react/no-context-provider
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <div ref={ref}>{children}</div>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="TooltipContent"
            sideOffset={5}
          >
            {content}
            <Tooltip.Arrow className="fill-teal-700" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
