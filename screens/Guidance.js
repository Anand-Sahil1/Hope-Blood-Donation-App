import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import PageContainer from '../components/PageContainer';
import { COLORS, FONTS, SIZES } from '../constants';

const Guidance = () => {
  const [selectedBox, setSelectedBox] = useState(null);

  const guidanceData = [
    {
      id: 1,
      title: 'What are the different blood types?',
      image: require('../assets/images/Guide1.jpg'), 
      description: `Blood types are classified based on the presence or absence of certain antigens on the surface of red blood cells. The two main systems used to categorize blood types are the ABO system and the Rh system.
        
1. ABO System:
  - Type A: Has A antigens on the surface of red blood cells.
  - Type B: Has B antigens on the surface of red blood cells.
  - Type AB: Has both A and B antigens on the surface of red blood cells.
  - Type O: Has no A or B antigens on the surface of red blood cells.

2. Rh System:
- Rh-positive (Rh+): Has the Rh antigen on the surface of red blood cells.
- Rh-negative (Rh-): Lacks the Rh antigen on the surface of red blood cells.

Combining the ABO and Rh systems, you get eight main blood types:
- A+
- A-
- B+
- B-
- AB+
- AB-
- O+
- O-
        
Knowing your blood type is important for blood transfusions and organ transplants, as mismatched blood types can lead to serious complications.
      `,
    },
    {
      id: 2,
      title: 'What is anemia?',
      image: require('../assets/images/Guide3.jpg'), 
      description: `Anemia is a condition that occurs when a person doesn't have enough red blood cells or hemoglobin, which are essential for carrying oxygen to the body's tissues. Red blood cells contain hemoglobin, a protein that binds to oxygen in the lungs and transports it to various parts of the body.
      
There are different types of anemia, and they can result from various causes, such as a lack of iron, vitamin B12, or folic acid; chronic diseases; genetic factors; or other health conditions that affect the production or lifespan of red blood cells.
        
Common symptoms of anemia include fatigue, weakness, pale skin, shortness of breath, dizziness, and difficulty concentrating. Treatment often involves addressing the underlying cause of the anemia, which may include dietary changes, supplements, or other medical interventions. If someone suspects they have anemia, it's essential to consult with a healthcare professional for proper diagnosis and guidance on appropriate treatment.
      `,
    },
    {
      id: 3,
      title: 'Who can donate blood?',
      image: require('../assets/images/Guide2.jpg'), 
      description: `Anyone who fits in with the criteria below may be able to give blood:
1. Between the age of 17 and 66 (for your first donation)
2. Weight over 7 stone 12 pounds (50kg)
3. Healthy and not subject to medical exclusions`,
    },
  ];

  const handleBoxPress = (boxId) => {
    setSelectedBox(boxId);
  };

  return (
    <PageContainer>
      <ScrollView>
        <View style={{ margin: SIZES.padding3 }}>
          {guidanceData.map((box) => (
            <TouchableOpacity
              key={box.id}
              style={{
                borderRadius: SIZES.radius,
                overflow: 'hidden',
                marginBottom: SIZES.padding3,
                backgroundColor: selectedBox === box.id ? COLORS.secondary : COLORS.secondary,
              }}
              onPress={() => handleBoxPress(box.id)}
            >
              <Image
                source={box.image}
                style={{
                  width: '100%',
                  height: 275,
                  borderTopLeftRadius: SIZES.radius,
                  borderTopRightRadius: SIZES.radius,
                }}
              />
              <View
                style={{
                  padding: SIZES.padding2,
                  backgroundColor: COLORS.secondary,
                  borderBottomLeftRadius: SIZES.radius,
                  borderBottomRightRadius: SIZES.radius,
                }}
              >
              
             <Text style={{ ...FONTS.h3, color: COLORS.black }}>{box.title}</Text>
              
              </View>
              {selectedBox === box.id && (
                <View style={{ backgroundColor: COLORS.secondary, padding: SIZES.padding3 }}>
                  <Text style={{ ...FONTS.body3 }}>
                    {box.description}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </PageContainer>
  );
};

export default Guidance;
