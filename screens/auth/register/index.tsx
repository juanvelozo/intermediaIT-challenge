import { Button, Text, VStack } from '@react-native-material/core'
import { Keyboard, Pressable, View } from 'react-native'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import { Layout } from '../../../components/Layout'
import { Input } from '../../../components/Input'
import { useForm } from 'react-hook-form'
import { InferType } from 'yup'
import { Colors } from '../../../theme/colors'
import { schemaRegister } from '../../../helpers/schemas/register.schema'
import { useAuth } from '../../../hooks/useAuth'
import { RegisterFormFields } from '../../../helpers/types/auth.dto'
import { useState } from 'react'

type FormType = InferType<typeof schemaRegister>

export const Register = (): JSX.Element => {
    //constants

    //states
    const [showPassword, setShowPassword] = useState<boolean>(false)

    //hooks
    const { handleSignUp } = useAuth()
    const {
        handleSubmit,
        control,
        formState: { isSubmitting },
    } = useForm<FormType>()
    //functions
    async function onSubmit(event: FormType) {
        Keyboard.dismiss()
        await handleSignUp(event)
    }

    function handleShowPassword(): void {
        setShowPassword(prev => !prev)
    }
    //render
    return (
        <Layout backgroundColor={Colors.purpleBlue}>
            <View
                style={{
                    width: '100%',
                    justifyContent: 'center',
                    marginVertical: 20,
                }}>
                <Text variant="h2" color="white">
                    Create account
                </Text>
                <Text variant="body1" color="white">
                    Sign up now! It's free
                </Text>
            </View>
            <View
                style={{
                    width: '100%',
                    justifyContent: 'center',
                    marginVertical: 10,
                }}>
                <Input
                    control={control}
                    name={RegisterFormFields.userName}
                    placeholder="User name"
                    variant="outlined"
                    color={Colors.orange}
                    leading={() => <Icon name="account" size={20} />}
                />
                <Input
                    control={control}
                    name={RegisterFormFields.userEmail}
                    placeholder="Email"
                    variant="outlined"
                    color={Colors.orange}
                    leading={() => <Icon name="account" size={20} />}
                />
                <Input
                    control={control}
                    name={RegisterFormFields.userPass}
                    secureTextEntry={!showPassword}
                    placeholder="Password"
                    variant="outlined"
                    color={Colors.orange}
                    leading={() => <Icon name="lock" size={20} />}
                    trailing={() => (
                        <Pressable onPress={handleShowPassword}>
                            <Icon
                                name={showPassword ? 'eye-off' : 'eye'}
                                size={20}
                            />
                        </Pressable>
                    )}
                />
                <VStack spacing={10}>
                    <Button
                        title="Sign Up"
                        onPress={handleSubmit(onSubmit)}
                        color={Colors.orange}
                        trailing={props => (
                            <Icon name="arrow-right" {...props} />
                        )}
                        loading={isSubmitting}
                    />
                </VStack>
            </View>
        </Layout>
    )
}
