import { FlatList, Pressable } from 'react-native'
import { useAuth } from '../../../hooks/useAuth'
import { Layout } from '../../../components/Layout'
import { Button, Divider, Text, TextInput } from '@react-native-material/core'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import { useEffect, useState } from 'react'
import { airportsList } from '../../../data/airports'
import { Airport } from '../../../helpers/types/airport.controller'
import { useIsFocused, useNavigation } from '@react-navigation/core'
import { mainNavProp } from '../../../navigation/main/types'
import { AirportItem } from '../../../components/features/airport/AirportItem'

export const Home = (): JSX.Element => {
    //states
    const [showResultsA, setShowResultsA] = useState<boolean>(false)
    const [airportA, setAirportA] = useState<Airport | undefined>()
    const [inputAValue, setInputAValue] = useState<string>('')
    const [showResultsB, setShowResultsB] = useState<boolean>(false)
    const [airportB, setAirportB] = useState<Airport | undefined>()
    const [inputBValue, setInputBValue] = useState<string>('')
    //hooks
    const focusedScreen = useIsFocused()
    const { handleSignOut } = useAuth()
    const { navigate } = useNavigation<mainNavProp>()
    //functions
    async function logout() {
        await handleSignOut()
    }

    function handleNavigate(): void {
        if(airportA && airportB){
            navigate('DistanceScreen', { airportA: airportA, airportB: airportB })
        }
    }

    function cleanStates(): void {
        setAirportA(undefined)
        setAirportB(undefined)
        setInputAValue('')
        setInputBValue('')
    }
    //effects
    useEffect(() => {
        cleanStates()
    }, [focusedScreen])

    //render
    return (
        <Layout>
            {!showResultsA && !showResultsB && (
                <>
                    <Pressable
                        onPress={logout}
                        style={{
                            alignSelf: 'flex-end',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Icon name="exit-to-app" color="red" size={30} />
                        <Text variant="caption" color="red">
                            Sign out
                        </Text>
                    </Pressable>
                    <Text variant="h3">Hello again👋</Text>
                    <Text variant="subtitle1" style={{ marginVertical: 10 }}>
                        Search on a list of {airportsList.length} airports on
                        the United States!
                    </Text>
                    <TextInput
                        variant="standard"
                        placeholder="Airport A"
                        onFocus={() => setShowResultsA(true)}
                        value={
                            airportA
                                ? `${airportA?.AIRPORT}, ${airportA?.STATE}`
                                : ''
                        }
                        trailing={() =>
                            airportA ? (
                                <Pressable
                                    onPress={() => {
                                        setAirportA(undefined)
                                    }}>
                                    <Icon name="close" size={20} />
                                </Pressable>
                            ) : null
                        }
                    />
                    <TextInput
                        variant="standard"
                        placeholder="Airport B"
                        onFocus={() => setShowResultsB(true)}
                        value={
                            airportB
                                ? `${airportB?.AIRPORT}, ${airportB?.STATE}`
                                : ''
                        }
                        trailing={() =>
                            airportB ? (
                                <Pressable
                                    onPress={() => {
                                        setAirportB(undefined)
                                    }}>
                                    <Icon name="close" size={20} />
                                </Pressable>
                            ) : null
                        }
                    />
                    <Button
                        onPress={handleNavigate}
                        title={
                            airportA && airportB
                                ? 'Check distance'
                                : 'Select 2 airports to continue'
                        }
                        disableElevation
                        disabled={!airportA || !airportB}
                    />
                </>
            )}
            {showResultsA && (
                <>
                    <TextInput
                        clearButtonMode="always"
                        onChangeText={text => {
                            setInputAValue(text)
                        }}
                        value={inputAValue}
                        variant="standard"
                        placeholder="Search for an airport"
                        autoFocus
                        leading={() => (
                            <Pressable
                                onPress={() => {
                                    setShowResultsA(false)
                                }}>
                                <Icon name="close" size={20} />
                            </Pressable>
                        )}
                    />
                    <FlatList
                        maxToRenderPerBatch={10}
                        keyExtractor={(_item, index) => index.toString()}
                        ItemSeparatorComponent={() => <Divider />}
                        data={
                            inputAValue.toLowerCase() === ''
                                ? airportsList.filter(item => item !== airportB)
                                : airportsList.filter(item =>
                                      item.AIRPORT.toLowerCase().includes(
                                          inputAValue.toLowerCase()
                                      )
                                  )
                        }
                        renderItem={({ item }) => (
                            <Pressable
                                onPress={() => {
                                    if (airportA) {
                                        setAirportA(undefined)
                                    } else {
                                        setAirportA(item)
                                        setShowResultsA(false)
                                    }
                                }}>
                                <AirportItem
                                    {...item}
                                    isSelected={Boolean(airportA == item)}
                                />
                            </Pressable>
                        )}
                    />
                </>
            )}
            {showResultsB && (
                <>
                    <TextInput
                        clearButtonMode="always"
                        onChangeText={text => {
                            setInputBValue(text)
                        }}
                        value={inputBValue}
                        variant="standard"
                        placeholder="Search for an airport"
                        autoFocus
                        leading={() => (
                            <Pressable
                                onPress={() => {
                                    setShowResultsB(false)
                                }}>
                                <Icon name="close" size={20} />
                            </Pressable>
                        )}
                    />
                    <FlatList
                        maxToRenderPerBatch={10}
                        keyExtractor={(_item, index) => index.toString()}
                        ItemSeparatorComponent={() => <Divider />}
                        data={
                            inputBValue.toLowerCase() === ''
                                ? airportsList.filter(item => item !== airportA)
                                : airportsList.filter(item =>
                                      item.AIRPORT.toLowerCase().includes(
                                          inputBValue.toLowerCase()
                                      )
                                  )
                        }
                        renderItem={({ item }) => (
                            <Pressable
                                onPress={() => {
                                    if (airportB) {
                                        setAirportB(undefined)
                                    } else {
                                        setAirportB(item)
                                        setShowResultsB(false)
                                    }
                                }}>
                                <AirportItem
                                    {...item}
                                    isSelected={Boolean(airportB == item)}
                                />
                            </Pressable>
                        )}
                    />
                </>
            )}
        </Layout>
    )
}
