import React, { useState } from 'react';
import { SafeAreaView, View, Image, Text, TouchableOpacity } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import Input from '../components/Input';
import Button from '../components/Button';
import PageContainer from '../components/PageContainer';
import { images, FONTS, COLORS } from '../constants';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');

  const auth = getAuth(); // Create auth instance

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      navigation.navigate('NavBar');
    } catch (error) {
      console.error('Error during login:', error.message);
      // Handle login error, e.g., display a message to the user
      setErrorText('Invalid email or password');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
        <PageContainer>
        <View style={{ flex: 1, marginHorizontal: 22, marginTop:170, alignItems: 'center' }}>

            <Image
              source={images.logo}
              resizeMode="contain"
              style={{ maxHeight: 150, maxWidth:150, marginBottom: 5 }}
            />

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ ...FONTS.h1, color: COLORS.primary }}>Share</Text>
              <Text style={{ ...FONTS.h1, color: COLORS.black, marginHorizontal: 8 }}>Life,</Text>
              <Text style={{ ...FONTS.h1, color: COLORS.primary }}>Share</Text>
              <Text style={{ ...FONTS.h1, color: COLORS.black, marginHorizontal: 8 }}>Hope!</Text>
            </View>

            <View style={{ marginVertical: 20 }}>
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
                errorText={errorText}
              />
            </View>

            <Button
              title="LOGIN"
              onPress={handleLogin}
              filled
              style={{ width: '100%' }}
            />

            {errorText !== '' && (
              <View style={{ marginVertical: 10 }}>
                <Text style={{ ...FONTS.body4, color: COLORS.red }}>{errorText}</Text>
              </View>
            )}

            <View style={{ marginVertical: 20, flexDirection: 'row' }}>
              <Text style={{ ...FONTS.body3, color: COLORS.black }}>Don't have an account?{' '}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={{ ...FONTS.body3, color: COLORS.primary }}>Sign Up</Text>
              </TouchableOpacity>
            </View>

        </View>
        </PageContainer>
    </SafeAreaView>
  );
};

export default Login;
