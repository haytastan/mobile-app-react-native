import {RouteProp, useNavigation, useRoute} from '@react-navigation/core';
import {Button, Icon, Input, Text} from '@rneui/themed';
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {commonStyles} from 'src/config/styles';
import {LoginRoutes} from 'src/navigation/Login/routes';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {LoginRoutesNames} from 'src/navigation/NavigationTypes';

const countryCode = '+1';

export default function PhoneNumber() {
  const navigation = useNavigation();
  const [userPhoneNumber, setUserPhoneNumber] = useState('');

  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] =
    useState<FirebaseAuthTypes.ConfirmationResult>();
  const [phoneErrorText, setPhoneErrorText] = useState('');

  const submit = () => {
    setLoading(true);
    if (userPhoneNumber.length !== 14) {
      setPhoneErrorText('Please enter a valid phone number');
      setLoading(false);
    } else {
      confirmDetails();
    }
  };

  const sentOTP = useCallback(async () => {
    await auth()
      .signInWithPhoneNumber(countryCode + userPhoneNumber)
      .then(res => {
        setConfirm(res);
      })
      .catch(err => {
        console.log(err);
        if (err.code === 'auth/invalid-phone-number') {
          setPhoneErrorText('Please enter a valid phone number');
        }
        setLoading(false);
      });
  }, [userPhoneNumber]);

  const confirmDetails = useCallback(async () => {
    sentOTP();
  }, [sentOTP]);

  useEffect(() => {
    if (confirm) {
      setLoading(false);
      navigation.navigate(
        LoginRoutes.ENTER_OTP.name as LoginRoutesNames['ENTER_OTP'],
        {
          confirm,
        },
      );
    }
  }, [confirm, confirmDetails, navigation, userPhoneNumber]);

  function formatPhoneNumber(value) {
    // if input value is falsy eg if the user deletes the input, then just return
    if (!value) return value;

    // clean the input for any non-digit values.
    const phoneNumber = value.replace(/[^\d]/g, '');

    // phoneNumberLength is used to know when to apply our formatting for the phone number
    const phoneNumberLength = phoneNumber.length;

    // we need to return the value with no formatting if its less then four digits
    // this is to avoid weird behavior that occurs if you  format the area code to early

    if (phoneNumberLength < 4) return phoneNumber;

    // if phoneNumberLength is greater than 4 and less the 7 we start to return
    // the formatted number
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }

    // finally, if the phoneNumberLength is greater then seven, we add the last
    // bit of formatting and return it.
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6,
    )}-${phoneNumber.slice(6, 10)}`;
  }

  return (
    <View style={[commonStyles.FlexColCenterCenter]}>
      <View style={[commonStyles.FlexColCenterCenter]}>
        <View style={styles.SectionStyle}>
          <View />
          <View style={styles.inputContainer}>
            <Text type="label" style={styles.labelText}>
              Whats your number?
            </Text>
            <Input
              autoFocus={true}
              shake={() => {}}
              placeholder="(555) 555-5555"
              onSubmitEditing={() => submit()}
              textContentType="telephoneNumber"
              value={formatPhoneNumber(userPhoneNumber)}
              onChangeText={number => {
                setUserPhoneNumber(number);
                setPhoneErrorText('');
              }}
              maxLength={14}
              keyboardType="number-pad"
              errorMessage={phoneErrorText}
            />
          </View>

          <KeyboardAvoidingView
            style={[styles.buttonView]}
            keyboardVerticalOffset={50}
            behavior="position">
            <Button
              onPress={() => (loading ? undefined : submit())}
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
    </View>
  );
}

export const styles = StyleSheet.create({
  SectionStyle: {
    alignSelf: 'center',
    justifyContent: 'space-around',
    width: '80%',
    height: '100%',
    display: 'flex',
    marginTop: '15%',
  },
  inputContainer: {
    bottom: '10%',
  },
  keyboardView: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
  },
  Button: {
    alignSelf: 'flex-end',
  },
  buttonView: {
    top: '4%',
  },
  inputStyle: {
    color: 'black',
  },
  labelText: {
    marginLeft: 10,
    marginBottom: 20,
  },
  iconStyle: {
    color: 'white',
  },
});
