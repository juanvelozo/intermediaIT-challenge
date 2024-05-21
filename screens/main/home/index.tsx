import {  Pressable } from 'react-native';
import { useAuth } from '../../../hooks/useAuth';
import { Layout } from '../../../components/Layout';
import { Text } from '@react-native-material/core';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

export const Home = ():JSX.Element => {
    //constants

    //states

    //hooks
    const { handleSignOut, user } = useAuth()
    //functions
    async function logout(){
        await handleSignOut()
    }
    //effects    
    //render
    return (
        <Layout>
            <Pressable onPress={logout} style={{alignSelf:'flex-end', justifyContent: 'center', alignItems:'center'}}>
                <Icon name='exit-to-app' color="red" size={30}/>
                <Text variant='caption'color='red'>Sign out</Text>
            </Pressable>
            <Text variant='h3'>Hello again👋</Text>
        </Layout>
    );
}