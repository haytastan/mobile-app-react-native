import React from 'react';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {
  HeaderStyleInterpolators,
  StackCardInterpolationProps,
  StackNavigationOptions,
  TransitionSpecs,
} from '@react-navigation/stack';
import {StyleSheet, View} from 'react-native';
import {HomeRoutes} from './Home/routes';
import {Text} from '@rneui/themed';
import {ProfileRoutes} from './Profile/routes';
import {commonStyles} from 'src/config/styles';

// satisfy typescript needs
export const getKeyValue = (key: string) => (obj: Record<string, any>) =>
  obj[key];

export type LoginNavigationRoutes = {
  GET_STARTED: undefined;
  SIGN_UP: undefined;
  EMAIL: {fullName: string};
  PHONE_NUMBER: {fullName: string; email: string};
  ENTER_OTP: {
    confirm: FirebaseAuthTypes.ConfirmationResult;
    sign_up?: {
      notInDB: boolean;
      userInformation: {
        fullName: string;
        email: string;
        phone: string;
      };
    };
  };
  SET_PASSWORD: {email: string};
  ALLERGIES: undefined;
  CUISINES: {allergies: string[]};
};

export type LoginRoutesNames = {
  GET_STARTED: 'GET_STARTED';
  SIGN_UP: 'SIGN_UP';
  EMAIL: 'EMAIL';
  PHONE_NUMBER: 'PHONE_NUMBER';
  ENTER_OTP: 'ENTER_OTP';
  SET_PASSWORD: 'SET_PASSWORD';
  ALLERGIES: 'ALLERGIES';
  CUISINES: 'CUISINES';
};

export type HomeRouteNames = {
  HOME: 'HOME';
  MESSAGE: 'MESSAGE';
  ORDER: 'ORDER';
  PROFILE: 'PROFILE';
  SEARCH: 'SEARCH';
};

export type ProfileRouteNames = {
  ALLERGIES: 'ALLERGIES';
  CONTACT_INFO: 'CONTACT_INFO';
  FAVORITE_CHEFS: 'FAVORITE_CHEFS';
  FAVORITE_CUISINES: 'FAVORITE_CUISINES';
  FEEDBACK: 'FEEDBACK';
  INVITE_FRIEND: 'INVITE_FRIEND';
  PRIVACY_POLICY: 'PRIVACY_POLICY';
  REWARDS: 'REWARDS';
  TERMS_OF_SERVICE: 'TERMS_OF_SERVICE';
};

// vertical navigation
export const LoginNavigationOptions: StackNavigationOptions = {
  headerShown: false,
};

export const HomeNavigationOptions: StackNavigationOptions = {
  headerShown: false,
};

export const ProfileNavigationOptions: StackNavigationOptions = props => {
  const routeName = props.route.name;
  const displayName = ProfileRoutes[routeName]?.displayName;
  if (props.route.name === HomeRoutes.PROFILE.name) {
    return {
      headerShown: true,
      header: () => (
        <View style={[commonStyles.FlexColCenterCenter, styles.header]}>
          <Text type="header" style={styles.headerText}>
            Profile
          </Text>
        </View>
      ),
    };
  }
  return {
    title: displayName,
    headerBackTitle: 'Back',
    headerShown: true,
  };
};

export const styles = StyleSheet.create({
  header: {
    height: 100,
    backgroundColor: 'white',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  headerText: {
    marginTop: '8%',
  },
});
