import { StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import ScreenWrapper from '@/components/ScreenWrapper';
import { useRouter } from 'expo-router';
import { hp, wp } from '@/helper/common';
import BackButton from '@/assets/icons/BackButton';
import { StatusBar } from 'expo-status-bar';
import Button from '@/components/Button';
import Navbar from '@/components/Navbar';
import { API_URL } from '@/Auth/api';
import {STORAGE_KEYS, storeData, getData} from '@/Auth/storage.ts';
const volunteer = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [expertise, setExpertise] = useState('');
  const [userRole, setUserRole] = useState(null);

useEffect(() => {
  const fetchUserRole = async () => {
    const role = await getData(STORAGE_KEYS.USER_ROLE);
    setUserRole(role);
    if(role === 'volunteer'){
      router.push('/vMessages');
    }
  };
  fetchUserRole();
}, []);

  const handleSubmit = async() => {
    setLoading(true);
    console.log("reachers")
    
    try{
      const response = await fetch(`${API_URL}/volunteerSignup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          phNo:phoneNumber,
          address,
          fieldOfExpertise:expertise,
        }),
      })
      console.log('here')
      // const result = await response.json();
      // console.log(result);
    }
    catch(e){
      console.log(e)
    }
    
   
    setTimeout(() => {
      setLoading(false);
    
    }, 1500);
  };

  return (
    <ScreenWrapper bg="white">
      <StatusBar style="dark" />
      <Navbar  title ="Volunteer Page" router = {router}/>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          

          <Text style={styles.caption}>Make a Difference!</Text>

          <Text style={styles.title}>Volunteer Registration</Text>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="gray"
                value={name}
                onChangeText={setName}
              />
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                placeholderTextColor="gray"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
              <TextInput
                style={styles.input}
                placeholder="Address"
                placeholderTextColor="gray"
                multiline
                numberOfLines={3}
                value={address}
                onChangeText={setAddress}
                textAlignVertical="top"
              />
              <TextInput
                style={styles.input}
                placeholder="Field of Expertise"
                placeholderTextColor="gray"
                value={expertise}
                onChangeText={setExpertise}
              />
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>
                By registering as a volunteer, you agree to dedicate your time and skills to help others in need. Our team will contact you shortly to discuss available opportunities.
              </Text>
            </View>

            <Button 
              title={loading ? "Submitting..." : "Register as Volunteer"} 
              onPress={handleSubmit} 
              buttonStyle={{ 
                paddingVertical: hp(1.2),
                paddingHorizontal: wp(4), 
                marginVertical: hp(2),
                backgroundColor: "green" 
              }} 
              textStyle={{}}
            />
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default volunteer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(4),
    paddingBottom: hp(4),
    backgroundColor: 'white',
  },
  header: {
    marginTop: hp(2),
    alignSelf: 'flex-start',
  },
  caption: {
    fontSize: hp(3),
    color: "gray",
    textAlign: 'center',
    marginVertical: hp(1),
  },
  title: {
    fontSize: hp(4),
    fontWeight: '800',
    textAlign: 'center',
    marginVertical: hp(1),
    color: "black",
  },
  formContainer: {
    marginTop: hp(2),
  },
  inputContainer: {
    marginTop: hp(2),
    gap: hp(2),
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 14,
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
    fontSize: hp(2.2),
    color: "black",
  },
  infoContainer: {
    marginTop: hp(3),
    padding: hp(2),
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
  },
  infoText: {
    fontSize: hp(1.8),
    color: "#444",
    lineHeight: hp(2.4),
  }
});