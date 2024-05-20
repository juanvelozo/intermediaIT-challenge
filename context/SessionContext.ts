import { createContext } from "react";

export type CreateContextProps = {
  handleSignIn: (event:any) => Promise<any>
  handleSignOut: () => Promise<void>
  isAuthenticated: boolean
  user: object | null
}

export const SessionContext = createContext<CreateContextProps>({
  user: null,
  isAuthenticated: false,
  handleSignOut: () => Promise.resolve(),
  handleSignIn: (event: any) => Promise.resolve(event),
})
