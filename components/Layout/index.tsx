import { FC } from 'react'
import { View } from 'react-native'
import { ILayoutProps } from './types'

export const Layout: FC<ILayoutProps> = (props): JSX.Element => {
    //constants
    const { backgroundColor } = props
    //states

    //hooks

    //functions

    //effects

    //render

    return (
        <View
            {...props}
            style={{
                backgroundColor: backgroundColor,
                paddingVertical: 40,
                paddingHorizontal: 20,
                flex: 1,
                maxWidth: 420,
            }}>
            {props.children}
        </View>
    )
}
