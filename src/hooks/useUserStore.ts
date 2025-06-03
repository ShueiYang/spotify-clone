import { use } from "react";
import { useStore } from "zustand";

import { UserContext, UserState } from "@/providers/UserProvider";

export function useUserStore<T>(selector: (state: UserState) => T): T {
  const store = use(UserContext);

  if (!store) {
    throw new Error("useUserStore must be used within a UserProvider");
  }

  return useStore(store, selector);
}
