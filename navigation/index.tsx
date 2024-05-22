import {
    NavigationContainer,
    NavigationContainerRef,
} from '@react-navigation/native'
import { RootStackNavigator } from './main/types'
import { useRef } from 'react'
import { MainNavigator } from './main/Main.navigation'
import { useAuth } from '../hooks/useAuth'
import { AuthNavigator } from './auth/Auth.navigation'

export const AppNavigator = () => {
    // refs
    const navigationRef =
        useRef<NavigationContainerRef<RootStackNavigator>>(null)

    // hooks
    const { isAuthenticated } = useAuth()

    // render
    return (
        <NavigationContainer ref={navigationRef}>
            {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    )
}
