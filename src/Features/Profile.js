import React, {useEffect} from 'react';
import {View, StyleSheet, Text, Dimensions, Image} from 'react-native';
import LogOutBtn from '../Components/Animation/LogOutBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {auth} from '../../firebase';

export const Profile = ({navigation}) => {
  // Sign Out
  const signOut = () => {
    auth.signOut();
    AsyncStorage.setItem('userData', JSON.stringify({loggedIn: false}));
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.View}>
      <View style={styles.avatar}>
        <Image
          style={{width: 250, height: 250, borderRadius: 75}}
          source={require('../Assets/flick_plix.png')}
        />
      </View>
      <View>
        <View style={styles.textView}>
          <Text style={styles.title}>About</Text>
          <Text style={styles.text}>
            Do you love watching trailers for the latest and hottest movies, TV
            shows, and animes? With this amazing app, you can do just that!
            Enjoy catching up on your favorite flicks with ease. Find what's hot
            in the world of entertainment with our quick and easy-to-use search
            engine. Watch the trailers right away or save them to watch later.
            Get ready for a thrilling movie experience today!
          </Text>
          <Text style={styles.quote}>
            " The hardest thing you'll ever learn is how to say goodbye. "
          </Text>
        </View>
      </View>
      <View style={styles.container}>
        <LogOutBtn iconName="logout" title="Log Out" onPress={signOut} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  View: {
    flex: 1,
    backgroundColor: '#fff',
  },
  avatar: {
    backgroundColor: '#fff',
    marginVertical: 15,
    width: 150,
    height: 150,
    borderRadius: 75,
    borderColor: '#fff',
    left: Dimensions.get('screen').width * 0.2,
  },
  textView: {
    marginTop: 80,
    marginLeft: 20,
    marginRight: 20,
  },
  title: {
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 17,
  },
  quote: {
    color: '#000',
    marginTop: 50,
    marginLeft: 20,
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontFamily: 'serif',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
  },
});

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
