import {  Pressable } from 'react-native';
import { useAuth } from '../../../hooks/useAuth';
import { Layout } from '../../../components/Layout';
import { Text, TextInput } from '@react-native-material/core';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useState } from 'react';
import { airports } from '../../../data/airports';
import { Airport } from '../../../helpers/types/airport.controller';
import { useNavigation } from '@react-navigation/core';
import { mainNavProp } from '../../../navigation/main/types';

export const Home = ():JSX.Element => {
    //constants

    //states
    const [showResultsA, setShowResultsA] = useState<boolean>(false)
    const [airportA, setAirportA] = useState<Airport | undefined>()
    const [showResultsB, setShowResultsB] = useState<boolean>(false)
    const [airportB, setAirportB] = useState<Airport | undefined>()
    //hooks
    const { handleSignOut } = useAuth()
    const {navigate} = useNavigation<mainNavProp>()
    //functions
    async function logout(){
        await handleSignOut()
    }

    function handleNavigate():void{
        navigate('DistanceScreen',{airportsList: airports})
    }
    //effects    
    //render
    return (
        <Layout>
            {!showResultsA && !showResultsB && <>
                <Pressable onPress={logout} style={{alignSelf:'flex-end', justifyContent: 'center', alignItems:'center'}}>
                    <Icon name='exit-to-app' color="red" size={30}/>
                    <Text variant='caption'color='red'>Sign out</Text>
                </Pressable>
                <Text variant='h3'>Hello again👋</Text>
                <Text variant='subtitle1'>Search on a list of {airports.length} airports on the United States!</Text>
                <TextInput variant='standard' placeholder='Airport A' onFocus={()=> setShowResultsA(true)}/>
                <TextInput variant='standard' placeholder='Airport B' onFocus={()=> setShowResultsB(true)}/>
            </>
            }
            {showResultsA && 
            <>
                <TextInput variant='standard' placeholder='Airport A' autoFocus leading={()=> <Pressable onPress={()=>{setShowResultsA(false)}}>
                    <Icon name='close' size={20} />
                </Pressable>}/>
                <Text variant='h6'>No results</Text>
            </>
            }
            {showResultsB && 
            <>
                <TextInput variant='standard' placeholder='Airport B' autoFocus leading={()=> <Pressable onPress={()=>{setShowResultsB(false)}}>
                    <Icon name='close' size={20} />
                </Pressable>}/>
                <Text variant='h6'>No results</Text>
            </>
            }
        </Layout>
    );
}