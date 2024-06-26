import '@expo/metro-runtime'

import { StyleSheet, View } from 'react-native'
import { AppNavigator } from './navigation'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { SessionProvider } from './provider/SessionProvider'

export default function App() {
    return (
        <View style={styles.container}>
            <SafeAreaProvider>
                <StatusBar style="auto" />
                <SessionProvider>
                    <AppNavigator />
                </SessionProvider>
            </SafeAreaProvider>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
})
