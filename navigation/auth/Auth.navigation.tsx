import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthComponents, AuthStackNavigator, AuthStackRoutesEnum } from "./types";

const {Navigator,Screen} = createNativeStackNavigator<AuthStackNavigator>();

export function AuthNavigator(){
return (
    <Navigator initialRouteName={AuthStackRoutesEnum.Login} screenOptions={{headerShown: false}}>
            {Object.values(AuthStackRoutesEnum).map((route,index)=>{
                return (
                    <Screen key={index} name={route} component={AuthComponents[route]}/>
                )
            })}    
        </Navigator>
)
}