import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Text, Input, Button, Icon} from '@rneui/themed';
import {commonStyles} from '@config/styles';
import {LoginRoutes} from '@navigation/Login/routes';
import {useNavigation} from '@react-navigation/core';

export default function Signup() {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');

  const [firstNameErrorText, setFirstNameErrorText] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = () => {
    setLoading(true);
    if (fullName.length <= 1) {
      setFirstNameErrorText('Please enter a longer name');
      setLoading(false);
    } else {
      navigation.navigate(LoginRoutes.EMAIL.name, {fullName});
      setLoading(false);
    }
  };
  return (
    <View style={commonStyles.FlexColCenterCenter}>
      <View style={styles.SectionStyle}>
        <View />
        <View style={styles.inputContainer}>
          <Text type="label" style={styles.labelText}>
            Welcome! What's your name?
          </Text>

          <Input
            autoFocus={true}
            shake={() => {}}
            style={styles.inputStyle}
            onChangeText={name => {
              setFullName(name);
              setFirstNameErrorText('');
            }}
            placeholder="John Smith"
            autoCapitalize="words"
            maxLength={20}
            errorMessage={firstNameErrorText}
            returnKeyType="next"
            onSubmitEditing={() => {}}
            blurOnSubmit={false}
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
  );
}
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  SectionStyle: {
    alignSelf: 'center',
    justifyContent: 'space-around',
    width: '80%',
    height: '100%',
    display: 'flex',
    marginTop: '15%',
  },
  inputStyle: {
    color: 'black',
  },
  labelText: {
    marginLeft: 10,
    marginBottom: 20,
  },
  inputContainer: {
    bottom: '15%',
  },
  KeyboardView: {
    width: '100%',
    display: 'flex',
  },
  Button: {
    alignSelf: 'flex-end',
  },
  buttonView: {
    top: '4%',
  },
  errorText: {
    margin: 0,
    marginTop: 20,
    marginBottom: windowHeight < 700 ? 10 : 5,
    fontSize: 16,
    fontFamily: 'WorkSans-Regular',
    fontWeight: '600',
  },
  iconStyle: {
    color: 'white',
  },
});
