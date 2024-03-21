import React, { useState } from 'react';
import { SafeAreaView, View, Image, Text, TouchableOpacity } from 'react-native';
import { FontAwesome, MaterialIcons, Fontisto } from '@expo/vector-icons';
import Input from '../components/Input';
import Button from '../components/Button';
import PageContainer from '../components/PageContainer';
import { images, FONTS, COLORS } from '../constants';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../backend/firebase';

const Register = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postcode, setPostcode] = useState('');
  const [errorText, setErrorText] = useState('');

  const handleRegister = async () => {
    try {
      // Register user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store additional user details in the Firestore database
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, {
        fullName, phoneNumber, bloodType, address, city, postcode
      });

      navigation.navigate('NavBar');
    } catch (error) {
      console.error('Error during registration:', error.message);
      // Handle registration error, e.g., display a message to the user
      setErrorText('Registration failed. Please try again.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageContainer>

          <View style={{ flex: 1, marginHorizontal: 22, marginTop:15 ,alignItems: 'center' }}>
            <Image
              source={images.logo}
              resizeMode="contain"
              style={{ maxHeight: 100, marginBottom: 10 }}
            />

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ ...FONTS.h1, color: COLORS.primary }}>Share</Text>
              <Text style={{ ...FONTS.h1, color: COLORS.black, marginHorizontal: 8 }}>Life,</Text>
              <Text style={{ ...FONTS.h1, color: COLORS.primary }}>Share</Text>
              <Text style={{ ...FONTS.h1, color: COLORS.black, marginHorizontal: 8 }}>Hope!</Text>
            </View>

            <View style={{ marginVertical: 20 }}>
              <Input
                icon="user"
                iconPack={FontAwesome}
                id="fullName"
                value={fullName}
                onInputChanged={(id, value) => setFullName(value)}
                placeholder="Enter your full name"
              />
              <Input
                icon="email"
                iconPack={MaterialIcons}
                id="email"
                value={email}
                onInputChanged={(id, value) => setEmail(value)}
                placeholder="Enter your email"
                keyboardType="email-address"
              />
              <Input
                icon="lock"
                iconPack={FontAwesome}
                id="password"
                value={password}
                onInputChanged={(id, value) => setPassword(value)}
                placeholder="Enter your password"
                secureTextEntry
              />
              <Input
                icon="lock"
                iconPack={FontAwesome}
                id="password2"
                value={password2}
                onInputChanged={(id, value) => setPassword2(value)}
                placeholder="Confirm Password"
                secureTextEntry
              />
              <Input
                icon="phone"
                iconPack={FontAwesome}
                id="phoneNumber"
                value={phoneNumber}
                onInputChanged={(id, value) => setPhoneNumber(value)}
                placeholder="Enter your phone number"
              />
              <Input
                icon="blood-drop"
                iconPack={Fontisto}
                id="bloodType"
                value={bloodType}
                onInputChanged={(id, value) => setBloodType(value)}
                placeholder="Enter your blood type"
              />
              <Input
                icon="home"
                iconPack={MaterialIcons}
                id="address"
                value={address}
                onInputChanged={(id, value) => setAddress(value)}
                placeholder="Enter your address"
              />
              <Input
                icon="map"
                iconPack={MaterialIcons}
                id="city"
                value={city}
                onInputChanged={(id, value) => setCity(value)}
                placeholder="Enter your city"
              />
              <Input
                icon="location-on"
                iconPack={MaterialIcons}
                id="postcode"
                value={postcode}
                onInputChanged={(id, value) => setPostcode(value)}
                placeholder="Enter your postcode"
              />
            </View>

            <Button
              title="REGISTER"
              onPress={handleRegister}
              filled
              style={{ width: '100%' }}
            />

            <View style={{ marginVertical: 20, flexDirection: 'row' }}>
              <Text style={{ ...FONTS.body3, color: COLORS.black }}>Already have an account ?{' '}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={{ ...FONTS.body3, color: COLORS.primary }}>Login</Text>
              </TouchableOpacity>
            </View>
            
          </View>
      </PageContainer>
    </SafeAreaView>
  );
};

export default Register;
