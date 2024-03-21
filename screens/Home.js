import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, Image, StyleSheet, FlatList } from 'react-native';
import Swiper from 'react-native-swiper';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../backend/firebase';
import PageContainer from '../components/PageContainer';
import { FONTS, COLORS, SIZES, images } from '../constants';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const sliderImages = [images.Home1, images.Home2, images.Home3];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, 'users');
        const usersSnapshot = await getDocs(usersCollection);

        const usersData = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setUsers(usersData);
        setLoading(false);b
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    };

    fetchUsers();
  }, []);

  const renderUserItem = ({ item }) => (
    <View style={styles.userItem}>
      <Text style={styles.userName}>{item.fullName}</Text>
      <Text style={styles.userDetails}>Phone: {item.phoneNumber}</Text>
      <Text style={styles.userDetails}>Blood Type: {item.bloodType}</Text>
      <Text style={styles.userDetails}>Location: {item.address}, {item.city}, {item.postcode}</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageContainer>
        <ScrollView>
          <View style={styles.content}>

            <Swiper 
              style={styles.swiper}
              autoplay
              autoplayTimeout={3}
            >
              {sliderImages.map((image, index) => (
                <View key={index} style={styles.slide}>
                  <Image source={image} style={styles.sliderImage} />
                </View>
              ))}
            </Swiper>
                
            <View style={styles.usersContainer}>
              <Text style={styles.sectionTitle}>Available Donors</Text>
              {loading ? (
                <Text>Loading users...</Text>
              ) : (
                <FlatList
                  data={users}
                  keyExtractor={(item) => item.id}
                  renderItem={renderUserItem}
                />
              )}
            </View>
          </View>
        </ScrollView>
      </PageContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding,
  },
  swiper: {
    height: 350,
    borderRadius: SIZES.radius, 
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.radius, 
  },
  sliderImage: {
    width: '100%',
    height: '100%',
    borderRadius: SIZES.radius, 
  },
  usersContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    ...FONTS.h2,
    color: COLORS.primary,
    marginBottom: 10,
  },
  userItem: {
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.radius,
    padding: 20,
    height: 140,
    width: 400,
    marginVertical: 5,
  },
  userName: {
    ...FONTS.h2,
    color: COLORS.primary,
  },
  userDetails: {
    ...FONTS.body3,
  },
});

export default Home;
