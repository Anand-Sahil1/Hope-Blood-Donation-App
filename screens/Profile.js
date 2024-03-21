import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Slider } from 'react-native';
import PageContainer from '../components/PageContainer';
import { FONTS, COLORS, SIZES, images } from '../constants';
import Button from '../components/Button';
import { Ionicons } from '@expo/vector-icons';
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from '../backend/firebase';

const Profile = ({ navigation }) => { // Include navigation prop
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDocRef = doc(db, 'users', auth.currentUser.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          setUser(userDocSnapshot.data());
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    // Perform logout logic here
    // For example, you can sign out the user from Firebase authentication
    navigation.navigate('GetStarted');
  };

  return (
    <PageContainer>
      <View style={styles.container}>

        <View style={styles.profileImageContainer}>
          <Image
            source={images.noProfile}  // Replace with the actual image source
            style={styles.profileImage}
          />
        </View>

        {user && (
          <View>
            <Text style={styles.Name}>{user.fullName}</Text>
            <Text style={styles.ProfileInfo}>Location: {user.address}, {user.city}, {user.postcode}</Text>
            <Text style={styles.ProfileInfo}>Blood Type: {user.bloodType}</Text>
          </View>
        )}

        <View style={styles.buttonsContainer}>
          <Button title="Edit Profile" style={{width: '49%'}} />
          <Button filled title="Add Image" style={{width: '49%'}} />
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeading}>Donation History</Text>
        </View>

        {/* Settings Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeading}>Settings</Text> 
          {/* Privacy and Support buttons */}
          <TouchableOpacity style={styles.settingsButton}>
            <Text style={styles.buttonText}>Privacy</Text>
            <Ionicons name="chevron-forward-outline" size={20} color={COLORS.black} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsButton}>
            <Text style={styles.buttonText}>Notifications</Text>
            <Ionicons name="chevron-forward-outline" size={20} color={COLORS.black} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsButton}>
            <Text style={styles.buttonText}>Support</Text>
            <Ionicons name="chevron-forward-outline" size={20} color={COLORS.black} />
          </TouchableOpacity>
        </View>

        <View style={styles.buttonsContainer}>
          <Button filled title="LOG OUT" style={{width: '100%'}} onPress={handleLogout} />
        </View>

      </View>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
  },
  profileImageContainer: {
    alignItems: 'flex-start',
    marginTop:15,
    marginBottom: 10,
    marginLeft: 5
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  Name: {
    ...FONTS.h1,
    color: COLORS.black,
  },
  ProfileInfo: {
    ...FONTS.body3,
    marginTop: 4,
    color: COLORS.primary,
  },
  
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 10
  },
  buttonText: {
      ...FONTS.body3,
      color: COLORS.black,
    },
  sectionContainer: {
    marginTop: 20,
  },
  sectionHeading: {
    ...FONTS.h2,
    color: COLORS.black,
  },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
});

export default Profile;
