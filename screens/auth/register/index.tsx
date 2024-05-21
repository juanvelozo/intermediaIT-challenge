import { Box, Button, Text, VStack } from '@react-native-material/core';
import { Pressable, View } from 'react-native';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Layout } from '../../../components/Layout';
import { Input } from '../../../components/Input';
import { useForm } from 'react-hook-form';
import { schemaLogin } from '../../../helpers/schemas/login.schema';
import { InferType } from 'yup';
import { Colors } from '../../../theme/colors';
import { LoginFormFields, RegisterFormFields } from '../../../helpers/types/user.dto';
import { useIsFocused } from '@react-navigation/core';
import { schemaRegister } from '../../../helpers/schemas/register.schema';
import { useAuth } from '../../../hooks/useAuth';

type FormType = InferType<typeof schemaRegister>


export const Register = ():JSX.Element => {
//constants

//states

//hooks
const {handleSignUp} = useAuth()
const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<FormType>()
//functions
async function onSubmit(event: FormType){
    console.log("loading", isSubmitting);
    console.log("event client side", event)
    
    const response =  await handleSignUp({
        password: event.password,
        user_email: event.user_email,
        user_name: event.user_name
    })
    console.log('🤣🤣',response)
}
//effects
//   useEffect(() => {
//     setValue(LoginFormFields.userName, '')
//     setValue(LoginFormFields.userPass, '')
//   }, [isFocused])
//render

    return (
        <Layout backgroundColor={Colors.purpleBlue}>
            <View style={{width: '100%',justifyContent:'center', marginVertical: 20}}> 
            <Text variant='h2' color='white'>
                Create account
            </Text>
            <Text variant='body1' color='white'>
                Sign up now! It's free
            </Text>
            </View>
            <View style={{width: '100%',justifyContent:'center', marginVertical: 10}}>
                <Input control={control} name={RegisterFormFields.userName}placeholder='User name'variant='outlined' color={Colors.orange} leading={()=><Icon name="account"size={20}/>}/>
                <Input control={control} name={RegisterFormFields.userEmail}placeholder='Email'variant='outlined' color={Colors.orange} leading={()=><Icon name="account"size={20}/>}/>
                <Input control={control} name={RegisterFormFields.userPass} placeholder='Password'variant='outlined' color={Colors.orange}leading={()=><Icon name="lock"size={20}/>}/>
                <VStack spacing={10} >
                <Button title="Sign Up" onPress={handleSubmit(onSubmit)} color={Colors.orange} trailing={props => <Icon name="arrow-right" {...props} />} loading={isSubmitting} />
                </VStack>
            </View>
        </Layout>
    );
}