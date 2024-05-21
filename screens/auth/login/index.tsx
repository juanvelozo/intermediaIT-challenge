import {  Button, Text, VStack } from '@react-native-material/core';
import { Keyboard, Pressable, View } from 'react-native';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Layout } from '../../../components/Layout';
import { Input } from '../../../components/Input';
import { useForm } from 'react-hook-form';
import { schemaLogin } from '../../../helpers/schemas/login.schema';
import { InferType } from 'yup';
import { Colors } from '../../../theme/colors';
import {  useNavigation } from '@react-navigation/core';
import { authNavProp } from '../../../navigation/auth/types';
import { useAuth } from '../../../hooks/useAuth';
import { LoginFormFields } from '../../../helpers/types/auth.dto';
import { useEffect, useState } from 'react';

type FormType = InferType<typeof schemaLogin>


export const Login = ():JSX.Element => {
    //constants

    //states
    const [showPassword, setShowPassword] = useState<boolean>(false)
    //hooks
    const {handleSignIn} = useAuth()
    const {navigate, setOptions} = useNavigation<authNavProp>()
    const {
        handleSubmit,
        control,
        formState: { isSubmitting },
    } = useForm<FormType>()

    //functions
    async function onSubmit(event: FormType){
        Keyboard.dismiss()
        await handleSignIn(event)
    }

    function handleShowPassword():void{
        setShowPassword(prev => !prev)
    }

    function handleNavigate(route:'register'|'forgot_password'): void{
        switch(route){
            case 'register':
                navigate('Register')
                break;
            // case 'forgot_password':
            //     navigate('ForgotPassword')
            //     break;
        }
    }
    //effects
    useEffect(() => {
    
      setOptions({headerTintColor: Colors.white})
    
    }, [])
    
    //render
    return (
        <Layout backgroundColor={Colors.purpleBlue}>
            <View style={{width: '100%',justifyContent:'center', marginVertical: 20}}> 
            <Text variant='h2' color='white'>
                Start Session
            </Text>
            <Text variant='body1' color='white'>
                Enter Your Username and Password to Access
            </Text>
            </View>
            <View style={{width: '100%',justifyContent:'center', marginVertical: 10}}>
                <Input control={control} name={LoginFormFields.userEmail}placeholder='Email'variant='outlined' color={Colors.orange} leading={()=><Icon name="account"size={20}/>}/>
                <Input control={control} name={LoginFormFields.userPass} secureTextEntry={!showPassword} placeholder='Password'variant='outlined' color={Colors.orange} leading={()=><Icon name="lock"size={20}/>} trailing={()=><Pressable onPress={handleShowPassword}><Icon name={showPassword ? 'eye-off':'eye'} size={20}/></Pressable>}/>
                <VStack spacing={10} >
                {/* <Button variant='text' title="Forgot your password?" color={Colors.white} trailing={props => <Icon name="arrow-right" {...props} />}  disabled={isSubmitting}/> */}
                <Button title="Sign In" onPress={handleSubmit(onSubmit)} color={Colors.orange} trailing={props => <Icon name="arrow-right" {...props} />} loading={isSubmitting}disabled={isSubmitting} />
                </VStack>
            </View>
                <Pressable onPress={()=>handleNavigate('register')}disabled={isSubmitting}>
                    <Text variant='caption' color={Colors.orange}> 
                        Create an account.
                    </Text>
                </Pressable>
        </Layout>
    );
}