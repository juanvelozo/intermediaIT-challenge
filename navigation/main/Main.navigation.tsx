import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
    RootStackNavigator,
    RootStackRoutesEnum,
    MainComponents,
} from './types'

const { Navigator, Screen } = createNativeStackNavigator<RootStackNavigator>()

export function MainNavigator() {
    return (
        <Navigator initialRouteName={RootStackRoutesEnum.Home}>
            {Object.values(RootStackRoutesEnum).map((route, index) => {
                return (
                    <Screen
                        key={index}
                        name={route}
                        component={MainComponents[route]}
                        options={{
                            headerShown: route != RootStackRoutesEnum.Home,
                        }}
                    />
                )
            })}
        </Navigator>
    )
}
