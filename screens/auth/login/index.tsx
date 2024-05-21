import { Box, Button, Text, VStack } from '@react-native-material/core';
import { Pressable, View } from 'react-native';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Layout } from '../../../components/Layout';
import { Input } from '../../../components/Input';
import { useForm } from 'react-hook-form';
import { schemaLogin } from '../../../helpers/schemas/login.schema';
import { InferType } from 'yup';
import { Colors } from '../../../theme/colors';
import { LoginFormFields } from '../../../helpers/types/user.dto';
import { useIsFocused, useNavigation } from '@react-navigation/core';
import { useEffect } from 'react';
import { authNavProp } from '../../../navigation/auth/types';

export interface ILoginDTO {
  user_name: string
  password: string
}
type FormType = InferType<typeof schemaLogin>


export const Login = ():JSX.Element => {
//constants

//states

//hooks
const {navigate} = useNavigation<authNavProp>()
const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<FormType>()
//functions
function handleNavigate(route:'register'|'forgot_password'): void{
    switch(route){
        case 'register':
            navigate('Register')
            break;
        case 'forgot_password':
            navigate('ForgotPassword')
            break;
    }
}
//effects

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
                <Input control={control} name={LoginFormFields.userName}placeholder='Email'variant='outlined' color={Colors.orange} leading={()=><Icon name="account"size={20}/>}/>
                <Input control={control} name={LoginFormFields.userPass} placeholder='Password'variant='outlined' color={Colors.orange}leading={()=><Icon name="lock"size={20}/>}/>
                <VStack spacing={10} >
                <Button variant='text' title="Forgot your password?" color={Colors.white} trailing={props => <Icon name="arrow-right" {...props} />} loading={isSubmitting}/>
                <Button title="Sign In" color={Colors.orange} trailing={props => <Icon name="arrow-right" {...props} />} loading={isSubmitting} />
                </VStack>
            </View>
                <Pressable onPress={()=>handleNavigate('register')}>
                    <Text variant='caption' color={Colors.orange}> 
                        Create an account.
                    </Text>
                </Pressable>
        </Layout>
    );
}