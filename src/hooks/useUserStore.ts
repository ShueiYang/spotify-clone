import { User } from "@supabase/auth-helpers-nextjs";
import { Subscription, UserDetails } from "@/types/custom.types";
import { create } from "zustand";

export interface UserStore {
  user: User | null;
  userDetails: UserDetails | null;
  subscription: Subscription | null;
}

export const useUserStore = create<UserStore>(() => ({
  user: null,
  userDetails: null,
  subscription: null,
}));
