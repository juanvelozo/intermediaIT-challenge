import { FC } from 'react'
import { Airport } from '../../../helpers/types/airport.controller'
import { Box, HStack, Text } from '@react-native-material/core'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import { Colors } from '../../../theme/colors'

export const AirportItem: FC<Airport & { isSelected: boolean }> = (
    props
): JSX.Element => {
    //render
    return (
        <Box p={10} bg={props.isSelected ? Colors.orange : Colors.white}>
            <Text
                variant="h6"
                numberOfLines={1}
                color={props.isSelected ? 'white' : 'black'}>
                {props.AIRPORT}
            </Text>
            <HStack style={{ alignItems: 'center' }}>
                <Icon
                    name="airplane"
                    color={props.isSelected ? 'white' : 'black'}
                />
                <Text
                    variant="caption"
                    color={props.isSelected ? 'white' : 'black'}>
                    {props.CITY + ', ' + props.STATE}
                </Text>
            </HStack>
        </Box>
    )
}
