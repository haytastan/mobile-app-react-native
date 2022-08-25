/* eslint-disable curly */
import {DefaultTheme, useNavigation} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import React, {useContext, useEffect, useState} from 'react';
import {UserContext} from 'src/context/UserContext';
import {
  LoginNavigationOptions,
  verticalAnimation,
} from 'src/navigation/NavigationTypes';
import {LoginRoutes} from './routes';
import auth from '@react-native-firebase/auth';
import {getKeyValue} from 'src/navigation/NavigationTypes';
import Header from 'src/screens/Login/Components/Header';
import {AppColorPalette} from 'src/config/styles';

export default function LoginNavigation() {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(0);
  const Stack: any = createStackNavigator();
  const navTheme = DefaultTheme;
  navTheme.colors.background = AppColorPalette.appBackgroundColor;
  const {user} = useContext(UserContext);

  const getInitialRoute = () => {
    if (auth().currentUser && !user) {
      const hasEmailAndPassword = auth().currentUser?.providerData[1];
      if (hasEmailAndPassword) {
        return LoginRoutes.ALLERGIES.name;
      } else {
        return LoginRoutes.SIGN_UP.name;
      }
    } else {
      return LoginRoutes.GET_STARTED.name;
    }
  };

  const screenOptions: StackNavigationOptions = props => {
    switch (props.route.name) {
      case LoginRoutes.PHONE_NUMBER.name:
        setLoading(0);
        setIsVisible(true);
        break;
      case LoginRoutes.SIGN_UP.name:
        setLoading(0.2);
        setIsVisible(true);
        break;
      case LoginRoutes.EMAIL.name:
        setLoading(0.4);
        setIsVisible(true);
        break;
      case LoginRoutes.ENTER_OTP.name:
        setLoading(0);
        setIsVisible(true);
        break;
      case LoginRoutes.SET_PASSWORD.name:
        setLoading(0.6);
        setIsVisible(true);
        break;
      case LoginRoutes.ALLERGIES.name:
        setLoading(0.8);
        setIsVisible(true);
        break;
      case LoginRoutes.CUISINES.name:
        setLoading(1);
        setIsVisible(true);
        break;
      case LoginRoutes.GET_STARTED.name:
        setIsVisible(false);
        break;
    }

    return LoginNavigationOptions;
  };

  // onPressUp,
  // onPressDown,
  // upArrow,
  // downArrow,

  return (
    <>
      <Header loading={loading} isVisible={isVisible} />
      <Stack.Navigator
        screenOptions={screenOptions}
        theme={navTheme}
        initialRouteName={getInitialRoute()}>
        {Object.keys(LoginRoutes).map(key => {
          return (
            <Stack.Screen
              name={getKeyValue(key)(LoginRoutes).name}
              component={getKeyValue(key)(LoginRoutes).component}
              key={getKeyValue(key)(LoginRoutes).name}
            />
          );
        })}
      </Stack.Navigator>
    </>
  );
}
