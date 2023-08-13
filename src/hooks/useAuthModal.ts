import { create } from "zustand"

export type ViewType = "sign_in" | "sign_up" 

interface AuthModalStore {
  isOpen: boolean
  view: ViewType
  onOpen: () => void
  onClose: () => void
  setView: (view: ViewType) => void
}

export const useAuthModal = create<AuthModalStore>((set) => ({
  isOpen: false,
  view : "sign_in",
  onOpen: () => set({isOpen: true}),
  onClose: () => set({isOpen: false}),
  setView: (view) => set({view})  // shorthand
}))
