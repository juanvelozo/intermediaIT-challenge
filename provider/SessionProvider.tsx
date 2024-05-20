import { ReactNode, useState } from 'react';
import { SessionContext } from '../context/SessionContext';

export const SessionProvider = ({children}:{children: ReactNode}):JSX.Element => {
//constants

//states
  const [user, setUser] = useState<object | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
//hooks

//functions
async function handleSignIn  (event: any): Promise<any> {
    
  }

async function handleSignOut() {
    setUser(null)
    setIsAuthenticated(false)
  }
//effects

//render
const {Provider} = SessionContext
    return (
       <Provider value={{user, isAuthenticated,handleSignOut,handleSignIn}}>
        {children}
       </Provider>
    );
}