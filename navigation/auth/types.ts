import { ParamListBase, RouteProp } from "@react-navigation/core";
import { ComponentType } from "react";
import { Login } from "../../screens/auth/login";

// All the routes in the navigator
export type AuthStackNavigator = {
    Login: undefined;
    Register: undefined;
    ForgotPassword: undefined;
}

// An enum to enumerate all routes
export enum AuthStackRoutesEnum {
    Login='Login',
    Register='Register',
    ForgotPassword='ForgotPassword',
}

// Typing the "component" attribute in Stack.Screen
export type ScreenComponentType<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList
> =
  | React.ComponentType<{
      route: RouteProp<ParamList, RouteName>
      navigation: unknown
    }>
  | ComponentType<object>


// This is a selector for all the values in the enum
type RouteComponentsType = {
  [x in AuthStackRoutesEnum]: ScreenComponentType<
    AuthStackNavigator,
    AuthStackRoutesEnum
  >
}

// Here, we select the component according to the value in the array
export const AuthComponents: RouteComponentsType = {
  [AuthStackRoutesEnum.Login]: Login,
  [AuthStackRoutesEnum.Register]: Login, 
  [AuthStackRoutesEnum.ForgotPassword]: Login,
}