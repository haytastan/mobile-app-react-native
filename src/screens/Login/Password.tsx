import {Icon} from '@rneui/base';
import {Button, Input, Text} from '@rneui/themed';
import React, {useCallback, useRef, useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {commonStyles} from '@config/styles';
import {LoginRoutes} from '@navigation/Login/routes';
import auth from '@react-native-firebase/auth';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/core';
import {
  LoginNavigationRoutes,
  LoginRoutesNames,
} from 'src/navigation/NavigationTypes';
import Header from './Components/Header';

export default function SetPassword() {
  const [errorText, setErrorText] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const confirmPasswordRef: any = useRef<HTMLDivElement>(null);
  const navigation = useNavigation();
  const route =
    useRoute<
      RouteProp<LoginNavigationRoutes, LoginRoutesNames['SET_PASSWORD']>
    >();

  const updateName = async () => {
    await auth().currentUser?.updateProfile({
      displayName: fullName,
    });
  };

  const email = route.params?.email;
  const fullName = route.params?.fullName;
  const submitPassword = async () => {
    setLoading(true);
    if (password !== confirmPassword) {
      setErrorText('Password’s don’t match!');
      setLoading(false);
    } else {
      // validate password
      const credential = auth.EmailAuthProvider.credential(email, password);
      // do handling, so that if a user cannot link a credential because it is already linked, this is ok!
      try {
        auth()
          .currentUser!.linkWithCredential(credential)
          .then(async () => {
            await updateName();
            navigation.navigate(
              LoginRoutes.ALLERGIES.name as LoginRoutesNames['ALLERGIES'],
            );
          })
          .catch(err => {
            console.log(err);
            if (err.code === 'auth/weak-password') {
              setErrorText('Please choose a stronger password.');
            } else if (err.code === 'auth/requires-recent-login') {
              setErrorText('Please re-authenticate.');
              navigation.navigate(
                LoginRoutes.PHONE_NUMBER
                  .name as LoginRoutesNames['PHONE_NUMBER'],
              );
            } else {
              setErrorText('Oops, there was a problem');
            }
            setLoading(false);
          });
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
  };
  return (
    <View style={[commonStyles.FlexColCenterCenter]}>
      {/* <Header loading="60%" /> */}
      <View style={[styles.ContentContainer]}>
        <View />
        <View style={[commonStyles.FlexColCenterCenter, styles.inputWrapper]}>
          <View style={styles.SectionStyle}>
            <Text style={styles.labelText} type="label">
              Lets make a password!
            </Text>
            <Input
              shake={() => {}}
              style={styles.inputStyle}
              textContentType="newPassword"
              secureTextEntry
              autoFocus={true}
              maxLength={40}
              onChangeText={input => {
                setPassword(input);
                setErrorText('');
              }}
              placeholderTextColor="#8b9cb5"
              onSubmitEditing={() =>
                confirmPasswordRef.current && confirmPasswordRef.current.focus()
              }
              underlineColorAndroid="#f000"
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <Text style={styles.labelText} type="label">
              Re-enter password
            </Text>
            <Input
              shake={() => {}}
              style={styles.inputStyle}
              ref={confirmPasswordRef}
              textContentType="newPassword"
              secureTextEntry
              maxLength={40}
              onChangeText={input => setConfirmPassword(input)}
              placeholderTextColor="#8b9cb5"
              errorMessage={errorText}
              onSubmitEditing={() => submitPassword()}
              underlineColorAndroid="#f000"
              blurOnSubmit={false}
            />
          </View>
        </View>
        <KeyboardAvoidingView
          style={[styles.buttonView]}
          keyboardVerticalOffset={-15}
          behavior="position">
          <Button
            onPress={() => (loading ? undefined : submitPassword())}
            circle={true}
            icon={
              loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Icon
                  type="material-icons"
                  name="arrow-forward"
                  iconStyle={styles.iconStyle}
                  size={25}
                />
              )
            }
            style={styles.Button}
          />
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  SectionStyle: {
    width: '100%',
    marginTop: 10,
  },
  inputStyle: {
    color: 'black',
    borderColor: '#c8c8d3',
  },
  ContentContainer: {
    marginBottom: '15%',
    alignSelf: 'center',
    justifyContent: 'space-around',
    width: '80%',
    height: '100%',
    display: 'flex',
  },
  inputWrapper: {
    bottom: windowHeight < 750 ? '1%' : '5%',
  },
  labelText: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginBottom: 5,
  },
  KeyboardView: {
    width: '100%',
    display: 'flex',
  },
  iconStyle: {
    color: 'white',
  },
  Button: {
    alignSelf: 'flex-end',
    color: 'white',
  },
  buttonView: {
    top: '4%',
  },
  lockLogo: {
    marginBottom: 20,
    marginLeft: 50,
  },
  errorText: {
    margin: 0,
    marginTop: 20,
  },
  WarningButton: {
    marginTop: 30,
    marginLeft: 10,
  },
  checkLogo: {
    marginLeft: 5,
  },
  lockIconContainer: {
    alignSelf: 'flex-start',
  },
});
