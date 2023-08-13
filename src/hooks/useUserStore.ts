import { Session, User } from "@supabase/auth-helpers-nextjs"
import { Subscription, UserDetails } from "@/types/custom.types"
import { create } from "zustand"


export interface UserStore {
  // session: Session | null
  user: User | null
  // accessToken: string | null;
  // isLoading: boolean
  userDetails: UserDetails | null
  subscription: Subscription | null 
}

// interface UserStore extends UserProps {

//   // setAccessToken: (accessToken: string | null) => void
//   // setIsLoading: (state: boolean ) => void
//   setSession: (newSession: Session | null) => void
//   setUser: (newUser: User | null) => void
//   setUserDetails: (userDatas: UserDetails | null) => void
//   setSubscription: (subscription: Subscription | null) => void
// }

export const useUserStore = create<UserStore>((set) => ({
  // session: null,
  user: null,
  userDetails: null,
  subscription: null,
}));


// export type UserStore = ReturnType<typeof createUserStore>

// export const createUserStore = (initProps?: Partial<UserProps>) => {

//   const accessToken = initProps?.session?.access_token ?? null;
//   const initialState: Partial<UserProps> = {
//     accessToken,  
//   }

//   return createStore<Partial<UserState>>()((set) => ({
//     ... initProps,
//     ... initialState,
//   }))
// }

// // Extracting context logic into a custom hook
// export const useUserStore = () => {
//   const store = useContext(UserContext)
//   if(!store) throw new Error("Missing UserContext.Provider in the tree")
//   return store;
// }