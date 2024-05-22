import { RouteProp, useNavigation, useRoute } from '@react-navigation/core'
import { View } from 'react-native'
import { RootStackNavigator, mainNavProp } from '../../../navigation/main/types'
import { Layout } from '../../../components/Layout'
import { Box, Divider, HStack,Text } from '@react-native-material/core'
import { Colors } from '../../../theme/colors'
import { useEffect } from 'react'

export const AirportsDistanceScreen = (): JSX.Element => {
    //constants
    const {setOptions} = useNavigation<mainNavProp>()
    const { params } =
        useRoute<RouteProp<RootStackNavigator, 'DistanceScreen'>>()
    const airportA = params.airportA
    const airportB = params.airportB
    //states

    //hooks

    //functions

    //effects
useEffect(() => {

  setOptions({title: 'Distance between airports'})

}, [])

    //render

    return (
        <Layout>
            <Box
                border={1}
                radius={20}
                h={300}
                borderColor="transparent"
                bg={Colors.white}
                p={20}
                style={{ alignSelf: 'center', width: '100%', justifyContent: 'space-around' }}>
                <Text variant='overline'>Juan Velozo's airlanes says: distance between...</Text>
                <Divider />
                <HStack justify="between" items='center' mv={10}>
                    <View style={{ width: '40%' , justifyContent:'flex-end'}}>
                        <Text variant='overline' style={{fontWeight: '800'}}>{airportA.AIRPORT}</Text>
                        <Text variant='caption'>{airportA.CITY}</Text>
                    </View>
                    <Text variant='overline'>...and...</Text>
                    <View style={{ width: '40%', justifyContent:'flex-end' }}>
                        <Text variant='overline' style={{ textAlign: 'right',fontWeight: '800' }}>
                            {airportB.AIRPORT}
                        </Text>
                        <Text style={{ textAlign: 'right' }} variant='caption'>
                            {airportB.CITY}
                        </Text>
                    </View>
                </HStack>
                <Text variant='overline' style={{textAlign:'center'}}>...is (approximately)...</Text>
                <Text variant='h2' style={{textAlign:'center'}}>50 miles</Text>
                <Divider/>
            </Box>
        </Layout>
    )
}
