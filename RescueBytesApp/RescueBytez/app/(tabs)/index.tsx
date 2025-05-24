import {Text, View, StyleSheet, Image, Pressable, ActivityIndicator} from 'react-native';
import React, {useEffect} from 'react';
import {useRouter} from 'expo-router';
import ScreenWrapper from '@/components/ScreenWrapper';
import {StatusBar} from 'expo-status-bar';
import {wp, hp} from '@/helper/common';
import Button from '@/components/Button';
import {useAuth} from '@/Auth/AuthContext';

const index = () => {
  const router = useRouter();
  const {isAuthenticated, loading} = useAuth();
  
  useEffect(() => {
    console.log(isAuthenticated)
    if (isAuthenticated && !loading) {
      router.replace('home');
    }
  }, [isAuthenticated, loading, router]);

  const handleLoginPress = () => {
    console.log(isAuthenticated)

    router.push('login');
  };

  const handleGetStartedPress = () => {
    router.push('register');
  };

  // Show loading indicator while checking authentication status
  if (loading) {
    return (
      <ScreenWrapper bg="white">
        <View style={[styles.container, styles.centered]}>
          <ActivityIndicator size="large" color="#34ae00" />
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper bg="white">
      <StatusBar style="dark"/>
      <View style={styles.container}>
        <Image style={styles.welcomeImage} resizeMode="contain" source={require("@/assets/images/WelcomeImage.png")} />
        <View>
          <Text style={styles.title}>RescueBytezz</Text>
          <Text style={styles.punchline}>Plan before the Storm, not during it</Text>
        </View>
        <View style={styles.footer}>
          <Button 
            onPress={handleGetStartedPress} 
            title="Getting Started" 
            buttonStyle={{marginHorizontal: wp(3)}} 
            textStyle={{}}
          />
          <View style={styles.bottomTextContainer}>
            <Text style={styles.loginText}>
              Already have an account?
            </Text>
            <Pressable onPress={handleLoginPress}>
              <Text style={[styles.loginText, {color: '#2c9500', fontWeight: '500'}]}>
                Login
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: wp(4)
  },
  centered: {
    justifyContent: 'center',
  },
  welcomeImage: {
    height: hp(30),
    width: wp(100),
    alignSelf: 'center',
  },
  title: {
    color: '#34ae00',
    fontSize: hp(4),
    fontWeight: '800',
    textAlign: 'center'
  },
  punchline: {
    textAlign: 'center',
    fontSize: hp(2.5),
    color: '#004aad',
    paddingHorizontal: wp(10),
  },
  footer: {
    gap: 30,
    width: '100%',
  },
  bottomTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5
  },
  loginText: {
    textAlign: 'center',
    color: '#494949',
    fontSize: hp(1.6),
  }
});