import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import PageContainer from '../components/PageContainer';
import { COLORS, FONTS, SIZES, images } from '../constants';

// Dummy data for rewards (replace it with your actual data)
const recommendedRewards = [
  { image: images.Rewards1, text: 'Reward 1', points: 100 },
  { image: images.Rewards2, text: 'Reward 2', points: 150 },
  { image: images.Rewards3, text: 'Reward 3', points: 200 },
];

const favoriteRewards = [
  { image: images.Rewards4, text: 'Favorite Reward 1' },
  { image: images.Rewards5, text: 'Favorite Reward 2' },
];

const Rewards = () => {
  // State to store user's collected points (replace it with actual data)
  const [collectedPoints, setCollectedPoints] = useState(50);

  // Function to calculate the recommended points needed to become Bronze Donor
  const calculateRecommendedPoints = () => {
    return 250 - collectedPoints;
  };

  useEffect(() => {
    // You can perform any additional logic or API calls here if needed
  }, [collectedPoints]);

  return (
    <PageContainer>
      {/* Container Section */}
      <View style={styles.content}></View>
      <View style={styles.container}>
        <Text style={styles.yourPointsText}>Your Points</Text>
        <Text style={styles.boldPoints}>{collectedPoints} Points</Text>
        <View style={styles.pointsLine}></View>
        <Text style={styles.recommendedPointsText}>
          {calculateRecommendedPoints()} Points to become Bronze Donor
        </Text>
      </View>

      {/* Recommended Rewards Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeading}>Recommended Rewards</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.rewardsContainer}>
            {recommendedRewards.map((reward, index) => (
              <View key={index} style={styles.rewardItem}>
                <Image source={reward.image} style={styles.biggerRewardImage} />
                <Text style={styles.rewardText}>{reward.text}</Text>
                <Text style={styles.rewardPoints}>{reward.points} Points</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Favorite Rewards Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeading}>Favorite Rewards</Text>
        <View style={styles.rewardsContainer}>
          {favoriteRewards.map((reward, index) => (
            <View key={index} style={styles.rewardItem}>
              <Image source={reward.image} style={styles.rewardImage} />
              <Text style={styles.rewardText}>{reward.text}</Text>
            </View>
          ))}
        </View>
      </View>
    </PageContainer>
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
  container: {
    marginTop: 20,
    alignItems: 'center',
  },
  yourPointsText: {
    ...FONTS.h2,
    color: COLORS.black,
  },
  boldPoints: {
    ...FONTS.h1,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginTop: 5,
  },
  pointsLine: {
    height: 2,
    width: '80%',
    backgroundColor: COLORS.primary,
    marginTop: 5,
  },
  recommendedPointsText: {
    ...FONTS.body3,
    color: COLORS.black,
    marginTop: 5,
  },
  sectionContainer: {
    marginTop: 20,
  },
  sectionHeading: {
    ...FONTS.h2,
    color: COLORS.black,
  },
  rewardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  rewardItem: {
    alignItems: 'center',
    marginRight: 10, // Adjust the spacing between rewards as needed
  },
  biggerRewardImage: {
    width: 300,  // Adjust the width as needed
    height: 200, // Adjust the height as needed
    borderRadius: SIZES.radius,
  },
  rewardImage: {
    width: 200,
    height: 200,
    borderRadius: SIZES.radius,
  },
  rewardText: {
    ...FONTS.body3,
    color: COLORS.black,
    marginTop: 5,
  },
  rewardPoints: {
    ...FONTS.body4,
    color: COLORS.primary,
    marginTop: 3,
  },
});

export default Rewards;
