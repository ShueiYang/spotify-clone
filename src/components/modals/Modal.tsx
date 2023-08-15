import * as Dialog from "@radix-ui/react-dialog";
import { IoMdClose } from "react-icons/io"

interface ModalProps {
  isOpen: boolean
  onChange: (open: boolean) => void
  title: string
  description: string
  children: React.ReactNode
}


const Modal: React.FC<ModalProps> = ({
  isOpen,
  onChange,
  title,
  description,
  children
}) => {
  return (
    <Dialog.Root
      open={isOpen}
      defaultOpen={isOpen}
      onOpenChange={onChange}
    >
      {/* <Dialog.Trigger /> */}
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay fixed inset-0 bg-neutral-900/90 backdrop-blur-sm z-20"/>
        <Dialog.Content
          className="DialogContent fixed bg-neutral-800 drop-shadow-md border border-neutral-700 
          top-[50%] left-[50%] p-6 w-full md:w-[90vw] md:max-w-[450px] h-full md:h-auto md:max-h-[750px] 
          translate-x-[-50%] translate-y-[-50%] rounded-md focus:outline-none z-30"
        >
          <Dialog.Title className="text-xl text-center font-bold mb-4">
            {title}
          </Dialog.Title>
          <Dialog.Description className="text-sm leading-normal text-center mb-5">
            {description}
          </Dialog.Description>
          <div>
            {children}
          </div>
          <Dialog.Close asChild>
            <button 
              className="absolute top-[10px] right-[10px] w-6 h-6 inline-flex items-center justify-center
              text-neutral-400 rounded-full appearance-none focus:outline-none hover:text-white"
            >
              <IoMdClose size={20} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default Modal;