import { ReactNode, useEffect, useState } from 'react';
import { SessionContext } from '../context/SessionContext';
import {onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential} from 'firebase/auth'
import {auth, db} from '../firebaseConfig.js'
import {doc, setDoc, getDoc} from 'firebase/firestore'
import { RegisterInput } from '../helpers/types/user.controller';
export const SessionProvider = ({children}:{children: ReactNode}):JSX.Element => {
//constants

//states
  const [user, setUser] = useState<object | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
//hooks

//functions
async function handleSignUp  (event: RegisterInput) {
console.log("event",event);

  const { user_email, user_name, password } = event;
  try {
    // register a user in firebase
    const response: UserCredential = await createUserWithEmailAndPassword(auth, user_email, password)
    console.log(response);

    // set the user in the database
    await setDoc(doc(db, "users", response?.user?.uid),{
      user_name,
      userId: response?.user?.uid
    })
    
    return response
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      
      return error.message
    }
  }
    
  }
  async function handleSignIn  (event: any): Promise<any> {
    const response = await signInWithEmailAndPassword(auth, event.email, event.password)
  }

async function handleSignOut() {
    setUser(null)
    setIsAuthenticated(false)
  }
//effects

useEffect(() => {
const unsubscribe = onAuthStateChanged(auth, (user)=>{
  console.log(auth, user);
  
  if(user){
setIsAuthenticated(true)
setUser(user)
  } else{
setIsAuthenticated(false)
setUser(null)
  }
})
  return unsubscribe;

}, [])

//render
const {Provider} = SessionContext
    return (
       <Provider value={{user, isAuthenticated,handleSignOut,handleSignIn, handleSignUp}}>
        {children}
       </Provider>
    );
}