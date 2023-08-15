"use client"

import { useEffect } from "react"
import { UserStore, useUserStore } from "@/hooks/useUserStore"


export default function StoreInitializer({
  ...props
}: Partial<UserStore>
) {
  // const initialized = useRef(false);
  // if this ref is not initialized then we set the store.
  // if(!initialized.current) {
  //   useUserStore.setState(props)
  //   initialized.current = true;
  // }
  useEffect(() => {
    useUserStore.setState(props)
  }, [props]);

  return null;
}