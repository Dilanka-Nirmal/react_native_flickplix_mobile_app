import React from 'react';
import {View, Text, SafeAreaView, Keyboard, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase imports
import {signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth';
import {auth} from '../../../firebase';

// Custom imports
import COLORS from '../Animation/Colors';
import Button from '../Animation/Button';
import Input from '../Animation/Input';
import Loader from '../Animation/Loader';

// Login Screen
const LoginScreen = ({navigation}) => {
  const [inputs, setInputs] = React.useState({email: '', password: ''});
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  // Validate inputs
  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.email) {
      handleError('Please input email', 'email');
      isValid = false;
    }
    if (!inputs.password) {
      handleError('Please input password', 'password');
      isValid = false;
    }
    if (isValid) {
      login();
    }
  };

  // Login
  const login = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, inputs.email, inputs.password)
      .then(async () => {
        setLoading(false);
        onAuthStateChanged(auth, user => {
          if (user) {
            AsyncStorage.setItem(
              'userData',
              JSON.stringify({...user, loggedIn: true}),
            );
          }
        });
        navigation.navigate('MainNavigator');
      })
      .catch(error => {
        setLoading(false);
        const errorMessage = error.message;
        Alert.alert('Error', errorMessage);
      });
  };

  // Handle input change
  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  // Handle error
  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };
  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      <Loader visible={loading} />
      <View style={{paddingTop: 50, paddingHorizontal: 20}}>
        <Text style={{color: COLORS.black, fontSize: 40, fontWeight: 'bold'}}>
          Log In
        </Text>
        <Text style={{color: COLORS.gray, fontSize: 18, marginVertical: 10}}>
          Enter Your Details to Login
        </Text>
        <View style={{marginVertical: 20}}>
          {/* Email input */}
          <Input
            onChangeText={text => handleOnchange(text, 'email')}
            onFocus={() => handleError(null, 'email')}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            error={errors.email}
            value={inputs.email}
          />
          {/* Password input */}
          <Input
            onChangeText={text => handleOnchange(text, 'password')}
            onFocus={() => handleError(null, 'password')}
            iconName="lock-outline"
            label="Password"
            placeholder="Enter your password"
            error={errors.password}
            password
            value={inputs.password}
          />
          {/* Login button */}
          <Button title="Log In" onPress={validate} />
          {/* Register */}
          <Text
            onPress={() => navigation.navigate('RegistrationScreen')}
            style={{
              paddingTop: 10,
              color: COLORS.black,
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 16,
            }}>
            Don't have an account? Register
          </Text>
          {/* Reset password */}
          <Text
            onPress={() => navigation.navigate('ResetPasswordScreen')}
            style={{
              paddingTop: 20,
              color: COLORS.black,
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 16,
            }}>
            Forgotten your password? Reset
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

/* Reference: https://reactnative.dev/
              https://www.npmjs.com/
              https://firebase.google.com/docs?authuser=0&hl=en
              https://www.youtube.com/@DesignIntoCode
              https://www.youtube.com/watch?v=0c0v_40MPq8&t=366s
              https://www.youtube.com/watch?v=TwxdOFcEah4
              https://www.youtube.com/watch?v=sc7RNl2YZHY
              https://www.youtube.com/watch?v=zEL-L2F0o7Q
              https://stackoverflow.com/
              https://medium.com/
 */
