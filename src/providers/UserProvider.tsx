"use client";

import { createContext, useRef } from "react";
import { createStore } from "zustand";

import { User } from "@supabase/auth-helpers-nextjs";
import { Subscription, UserDetails } from "@/types/custom.types";

interface UserInitState {
  user: User | null;
  userDetails: UserDetails | null;
  subscription: Subscription | null;
}
export interface UserState extends UserInitState {
  setUser: (user: User | null) => void;
  reset: () => void;
}

type UserProviderProps = React.PropsWithChildren<Partial<UserState>>;
type UserStore = ReturnType<typeof createUserStore>;

// Initialize state with props
const createUserStore = (initProps?: Partial<UserState>) => {
  const DEFAULT_USER_STATE: UserInitState = {
    user: null,
    userDetails: null,
    subscription: null,
  };

  return createStore<UserState>((set) => ({
    ...DEFAULT_USER_STATE,
    ...initProps,
    setUser: (userState) => set({ user: userState }),
    reset: () => set({ ...DEFAULT_USER_STATE }),
  }));
};

export const UserContext = createContext<UserStore | null>(null);

export function UserProvider({ children, ...props }: UserProviderProps) {
  const storeRef = useRef<UserStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = createUserStore(props);
  }

  return <UserContext value={storeRef.current}>{children}</UserContext>;
}
