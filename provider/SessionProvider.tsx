import { ReactNode, useEffect, useState } from 'react';
import { SessionContext } from '../context/SessionContext';
import {onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential, signOut} from 'firebase/auth'
import {auth, db} from '../firebaseConfig.js'
import {doc, setDoc, getDoc} from 'firebase/firestore'
import { LoginInput, RegisterInput } from '../helpers/types/user.controller';
import { View } from 'react-native';
import { ActivityIndicator } from '@react-native-material/core';
import { IUser } from '../helpers/types/user.dto';

export const SessionProvider = ({children}:{children: ReactNode}):JSX.Element => {
  //constants

  //states
  const [user, setUser] = useState<IUser | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [splashScreen, setSplashScreen] = useState<boolean>(true)
  //hooks

  //functions
  async function handleSignUp (event: RegisterInput): Promise<string | UserCredential | undefined>
  {
    const { user_email, user_name, password } = event;
    try {
      // register a user in firebase
      const response: UserCredential = await createUserWithEmailAndPassword(auth,   user_email, password)
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

  async function handleSignIn (event: LoginInput): Promise<UserCredential> {
    const response = await signInWithEmailAndPassword(auth, event.user_email, event.password)
    return response
  }

  async function UpdateUserData (userId: string) {
    const docRef = doc(db, 'users', userId)
    const docSnap = await getDoc(docRef)
    
    if(docSnap.exists()){
      let data = docSnap.data()
      setUser({...user, userName: data.user_name, uid: data.userId})
    }
  } 

  async function handleSignOut() {
    await signOut(auth).then(()=> {
      setUser(null)
      setIsAuthenticated(false)
    })
  }
  //effects

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user)=>{
      if(user)
      {
        setIsAuthenticated(true)
        setUser(user)
        UpdateUserData(user.uid)
      } 
      else
      {
        setIsAuthenticated(false)
        setUser(null)
      }
      setSplashScreen(false)
    })
    return unsubscribe;
  }, [])

//render
  const {Provider} = SessionContext
  return (
    <Provider value={{user, isAuthenticated,handleSignOut,handleSignIn, handleSignUp}}>
      {splashScreen ? 
      <View style={{alignItems:'center', flex: 1,justifyContent:'center'}}>
        <ActivityIndicator size={64}/>
      </View> 
      : children}
    </Provider>
  );
}