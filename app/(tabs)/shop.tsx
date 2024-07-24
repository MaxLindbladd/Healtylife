import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, Dimensions } from 'react-native';
import ShopItem from '@/components/shopItem';
import { useEffect, useState } from 'react';
import { fetchUserdocument, getCurrentUser, handleTokens } from '@/lib/appwrite';

const windowWidth = Dimensions.get('window').width;
const PlaceholderImage = require('/Users/maxlindblad/Healtylife/assets/images/react-logo.png');

export default function ShopsScreen() {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const fetchUserTokens = async () => {
      const currentUser = await getCurrentUser();

      if (!currentUser) {
        console.log("User not logged in");
        return;
      }

      const userDocument = await fetchUserdocument(currentUser.$id);

      if (userDocument && userDocument.token !== undefined) {
        setPoints(userDocument.token);
      } else {
        console.log("User document or token balance not found");
      }
    };

    fetchUserTokens();
  }, []); 

  const handlePurchase = async (price, item) => {
    await handleTokens(-price); // Subtract the price from the user's tokens

        setPoints(points -price); // Update the points state with the new token balance
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#afafaf", flexGrow: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <View style={styles.shopStats}>
            <Text>shop</Text>
            <Text>sinulla on {points} tokenia </Text>
          </View>
          <Text style={styles.leftAlignedText}>Trophy chests</Text> 

          <ShopItem
            imageSource={PlaceholderImage}
            title="10k arkku"
            price="10"
            onPurchase={() => handlePurchase(10, "10karkku")} 
          />

          <ShopItem
            imageSource={PlaceholderImage}
            title="30k arkku"
            price="40"
            onPurchase={() => handlePurchase(40, "30karkku")} 
          />

          <ShopItem
            imageSource={PlaceholderImage}
            title="50k arkku"
            price="60"
            onPurchase={() => handlePurchase(60, "50karkku")} 
          />
          <Text style={styles.leftAlignedText}>Chest slots coming soon</Text>
          <ShopItem
            imageSource={PlaceholderImage}
            title="Second chest slot"
            price="20"
            onPurchase={() => handlePurchase(20, "chestslot2")} // Handle purchase
          />
          <ShopItem
            imageSource={PlaceholderImage}
            title="Third chest slot"
            price="60"
            onPurchase={() => handlePurchase(60, "chestslot3")} // Handle purchase
          /> 
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    backgroundColor: "#afafaf",
    flexGrow: 1,
    alignItems: "center",
  },
  container: {
    alignItems: 'center',
    alignContent: "center",
    backgroundColor: "#afafaf",
    height: "100%"
  },
  shopStats: {
    backgroundColor: "white",
    borderRadius: 18,
    padding: 30,
    marginVertical: 10,
    width: windowWidth - 40,
  },
  leftAlignedText: {
    padding: 30,
    fontSize: 28,
    textAlign: 'left',
    alignSelf: 'flex-start'
  },
});
