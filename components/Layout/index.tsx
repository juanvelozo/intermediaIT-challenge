import { FC } from 'react'
import { View } from 'react-native'
import { ILayoutProps } from './types'
import { styles } from './styles'

export const Layout: FC<ILayoutProps> = (props): JSX.Element => {
    //constants
    const { backgroundColor } = props
    const style = styles(backgroundColor!)
    //states

    //hooks

    //functions

    //effects

    //render

    return (
        <View {...props} style={style.layout}>
            {props.children}
        </View>
    )
}
