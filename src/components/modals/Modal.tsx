import * as Dialog from "@radix-ui/react-dialog";
import { SvgIcon } from "../svg/SvgIcon";

interface ModalProps {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
}

export function Modal({
  isOpen,
  onChange,
  title,
  description,
  children,
}: Readonly<ModalProps>) {
  return (
    <Dialog.Root
      open={isOpen}
      defaultOpen={isOpen}
      onOpenChange={onChange}
    >
      {/* <Dialog.Trigger /> */}
      <Dialog.Portal>
        <Dialog.Overlay className="dialogOverlay fixed inset-0 z-20 bg-neutral-900/90 backdrop-blur-sm" />
        <Dialog.Content className="dialogContent fixed left-[50%] top-[50%] z-30 h-full w-full translate-x-[-50%] translate-y-[-50%] rounded-md border border-neutral-700 bg-neutral-800 p-6 drop-shadow-md focus:outline-none md:h-auto md:max-h-[750px] md:w-[90vw] md:max-w-[450px]">
          <Dialog.Title className="mb-4 text-center text-xl font-bold">
            {title}
          </Dialog.Title>
          <Dialog.Description className="mb-5 text-center text-sm leading-normal">
            {description}
          </Dialog.Description>

          <div>{children}</div>

          <Dialog.Close asChild>
            <button
              type="button"
              className="absolute right-[10px] top-[10px] inline-flex h-6 w-6 appearance-none items-center justify-center rounded-full text-neutral-400 hover:text-white focus:outline-none"
            >
              <SvgIcon
                name="XIcon"
                size={20}
              />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
