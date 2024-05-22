import { createContext } from 'react'
import { LoginInput, RegisterInput } from '../helpers/types/user.controller'
import { IUser } from '../helpers/types/user.dto'

export type CreateContextProps = {
    handleSignIn: (event: LoginInput) => Promise<any>
    handleSignUp: (event: RegisterInput) => Promise<any>
    handleSignOut: () => Promise<void>
    isAuthenticated: boolean
    user: IUser | null
}

export const SessionContext = createContext<CreateContextProps>({
    user: null,
    isAuthenticated: false,
    handleSignOut: () => Promise.resolve(),
    handleSignUp: event => Promise.resolve(event),
    handleSignIn: (event: any) => Promise.resolve(event),
})
