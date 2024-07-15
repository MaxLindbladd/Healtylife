import { Link } from 'expo-router';
import { View, Text, StyleSheet, Dimensions, Image, SafeAreaView } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Pedometer } from 'expo-sensors';
import { useEffect, useState } from 'react';

const PlaceholderImage = require('/Users/maxlindblad/Healtylife/assets/images/react-logo.png');
const windowWidth = Dimensions.get('window').width;

export default function HomeScreen() {

  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);

  const subscribe = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();
    setIsPedometerAvailable(String(isAvailable));

    if (isAvailable) {
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 1);

      const pastStepCountResult = await Pedometer.getStepCountAsync(start, end);
      if (pastStepCountResult) {
        setPastStepCount(pastStepCountResult.steps);
      }

      return Pedometer.watchStepCount(result => {
        setCurrentStepCount(result.steps);
      });
    }
  };

  useEffect(() => {
    const subscription = subscribe();
    return () => subscription && subscription.remove();
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: "#afafaf"}}>
      <View style={styles.container}>
        <View style={styles.topRow}>
          <View style={styles.topText}>
            <Text>Hello Max!</Text>
            <Text>You have done amazing today</Text>
          </View>
          <View style={styles.thumbs}>
            <Image source={PlaceholderImage} style={styles.image} />
            <View style={styles.thumbsColumn}>
              <Text style={styles.centeredText}>olet saanut {currentStepCount} askelta tänää </Text>
              <Text style={styles.centeredText}>sinulla on 7x streak</Text>
            </View>
          </View>
        </View>
        <Text style={styles.leftAlignedText} >päivittäiset tehtävät</Text>
        <View style={styles.thumbs}>
          <Image source={PlaceholderImage} style={styles.image} />
          <View style={styles.thumbsColumn}>
            <Text style={styles.centeredText}>oletko ottanut vitamiinit tänään</Text>
            <Text style={styles.centeredText}>klo 20:20</Text>
          </View>
          <BouncyCheckbox style={styles.checkbox} onPress={(isChecked: boolean) => {}} />
        </View>
        <View style={{paddingVertical:10}}></View>

        <View style={styles.thumbs}>
          <Image source={PlaceholderImage} style={styles.image} />
          <View style={styles.thumbsColumn}>
            <Text style={styles.centeredText}>oletko ottanut vitamiinit tänään</Text>
            <Text style={styles.centeredText}>klo 20:20</Text>
          </View>
          <BouncyCheckbox style={styles.checkbox} onPress={(isChecked: boolean) => {}} />
        </View>
        <View style={{paddingVertical:10}}></View>
        

        <View style={styles.thumbs}>
          <Image source={PlaceholderImage} style={styles.image} />
          <View style={styles.thumbsColumn}>
            <Text style={styles.centeredText}>oletko ottanut vitamiinit tänään</Text>
            <Text style={styles.centeredText}>klo 20:20</Text>
          </View>
          <BouncyCheckbox style={styles.checkbox} onPress={(isChecked: boolean) => {}} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignContent: "center",
    backgroundColor: "#afafaf",
    height: "100%"
  },
  topRow: {
    width: windowWidth - 20,
    height: 300,
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: "#8a5027",
    borderRadius: 40,
    justifyContent: "space-between",
    alignItems: 'center',
  },

  image: {
    width: 60,
    height: 60,
    margin: 20,

  },
  topText: {
    margin: 30,
  },
  centeredText: {
    paddingVertical: 4,
  },
  leftAlignedText: {
    padding: 30,
    fontSize: 28,
    textAlign: 'left', 
    alignSelf: 'flex-start' 
  },
  thumbs: {
    backgroundColor: "white",
    borderRadius: 30,
    marginBottom: 10,
    width: windowWidth - 40,
    height: 80,
    flexDirection: "row",
    alignItems: "center",
  },
  thumbsColumn:{
    flexDirection: "column",
    alignItems: "flex-start",
    
  },
  checkbox: {
    marginLeft: 30,
  },


});
