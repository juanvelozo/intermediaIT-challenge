import { ParamListBase, RouteProp } from "@react-navigation/core";
import { ComponentType } from "react";
import { Home } from "../../screens/main/home";
import { Profile } from "../../screens/main/profile";
import { About } from "../../screens/main/about";

// All the routes in the navigator
export type RootStackNavigator = {
    Home: undefined;
    Profile: undefined;
    About:undefined;
}

// An enum to enumerate all routes
export enum RootStackRoutesEnum {
    Home='Home',
    Profile='Profile',
    About = "About"
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
  [x in RootStackRoutesEnum]: ScreenComponentType<
    RootStackNavigator,
    RootStackRoutesEnum
  >
}

// Here, we select the component according to the value in the array
export const MainComponents: RouteComponentsType = {
  [RootStackRoutesEnum.Home]: Home, 
  [RootStackRoutesEnum.Profile]: Profile, 
  [RootStackRoutesEnum.About]: About, 
}