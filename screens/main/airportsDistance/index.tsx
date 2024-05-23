import { RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/core'
import { View } from 'react-native'
import { RootStackNavigator, mainNavProp } from '../../../navigation/main/types'
import { Layout } from '../../../components/Layout'
import { Box, Divider, HStack, Text } from '@react-native-material/core'
import { Colors } from '../../../theme/colors'
import { useEffect, useRef } from 'react'
import { getDistance } from 'geolib'
import { nFormatter } from '../../../utils/numberFormatter'
import MapView, { Marker } from 'react-native-maps'
import MapDirections from 'react-native-maps-directions'
import { GOOGLE_MAPS_API_KEY } from '@env'

export const AirportsDistanceScreen = (): JSX.Element => {
    //constants
    const { params } =
        useRoute<RouteProp<RootStackNavigator, 'DistanceScreen'>>()
    const airportA = params.airportA
    const airportB = params.airportB
    const distance = getDistance(
        { latitude: airportA.LATITUDE, longitude: airportA.LONGITUDE },
        { latitude: airportB.LATITUDE, longitude: airportB.LONGITUDE }
    )
    const nauticalMilesDistance = distance / 1852

    //states

    //hooks
    const mapRef = useRef<MapView>(null)
    const { setOptions } = useNavigation<mainNavProp>()
    const focusedScreen = useIsFocused()
    //functions

    //effects
    useEffect(() => {
      setOptions({ title: 'Distance between airports' })
    }, [])
    
    useEffect(() => {
        mapRef.current?.fitToCoordinates(
            [
                { latitude: airportA.LATITUDE, longitude: airportA.LONGITUDE },
                { latitude: airportB.LATITUDE, longitude: airportB.LONGITUDE },
            ],
            {
                edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                animated: true,
            }
        )
    }, [mapRef,focusedScreen, airportA, airportB])

    //render

    return (
        <Layout>
            <Box
                border={1}
                topStartRadius={20}
                topEndRadius={20}
                // h={300}
                borderColor="transparent"
                bg={Colors.white}
                p={20}
                style={{
                    alignSelf: 'center',
                    width: '100%',
                    justifyContent: 'space-around',
                }}>
                <Text variant="overline">
                    Juan Velozo's airlanes says: distance between...
                </Text>
                <Divider />
                <HStack justify="between" items="center" mv={10}>
                    <View style={{ width: '40%', justifyContent: 'flex-end' }}>
                        <Text style={{ fontWeight: '800' }}>
                            {airportA.STATE}
                        </Text>
                        <Text
                            variant="overline"
                            numberOfLines={2}
                            style={{ fontWeight: '800' }}>
                            {airportA.AIRPORT}
                        </Text>
                        <Text variant="caption">{airportA.CITY}</Text>
                    </View>
                    <Text variant="overline">...and...</Text>
                    <View style={{ width: '40%', justifyContent: 'flex-end' }}>
                        <Text style={{ textAlign: 'right', fontWeight: '800' }}>
                            {airportB.STATE}
                        </Text>
                        <Text
                            variant="overline"
                            numberOfLines={2}
                            style={{ textAlign: 'right', fontWeight: '800' }}>
                            {airportB.AIRPORT}
                        </Text>
                        <Text style={{ textAlign: 'right' }} variant="caption">
                            {airportB.CITY}
                        </Text>
                    </View>
                </HStack>
                <Text variant="overline" style={{ textAlign: 'center' }}>
                    ...is (approximately)...
                </Text>
                <Text variant="h3" style={{ textAlign: 'center' }}>
                    {nFormatter(nauticalMilesDistance, 2)} miles
                </Text>
                <Divider />
            </Box>
            <MapView
                ref={mapRef}
                liteMode
                toolbarEnabled={false}
                initialRegion={{
                    latitude: airportA.LATITUDE,
                    longitude: airportA.LONGITUDE,
                    latitudeDelta: 0.09,
                    longitudeDelta: 0.04,
                }}
                style={{ width: '100%', height: 300 }}>
                <Marker
                    coordinate={{
                        latitude: airportA.LATITUDE,
                        longitude: airportA.LONGITUDE,
                    }}
                />
                <Marker
                    coordinate={{
                        latitude: airportB.LATITUDE,
                        longitude: airportB.LONGITUDE,
                    }}
                />
                <MapDirections
                    apikey={GOOGLE_MAPS_API_KEY}
                    origin={{
                        latitude: airportA.LATITUDE,
                        longitude: airportA.LONGITUDE,
                    }}
                    destination={{
                        latitude: airportB.LATITUDE,
                        longitude: airportB.LONGITUDE,
                    }}
                />
            </MapView>
        </Layout>
    )
}
