import { Link, useFocusEffect } from 'expo-router';
import { View, Text, StyleSheet, Dimensions, Image, SafeAreaView, ScrollView } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Pedometer } from 'expo-sensors';
import { useEffect, useState } from 'react';
import { getCurrentUser, saveTrophy, getUserTask } from '@/lib/appwrite';
import Thumbs from '@/components/thumbs';
import React from 'react';

const PlaceholderImage = require('/Users/maxlindblad/Healtylife/assets/images/react-logo.png');
const windowWidth = Dimensions.get('window').width;

export default function HomeScreen() {

  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [pastStepCount, setPastStepCount] = useState(0);
  const [task, setTask] = useState([]);
  const [trophyGiven, setTophyGiven] = useState(false);

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
    }
  };

  useEffect(() => {
    const subscription = subscribe();
    return () => subscription && subscription.remove();
  }, []);


  useEffect(() => {
    if (pastStepCount >= 100) {
      console.log("annetaan trophy")
      //saveTrophy();                          ettei database täyty liikaa  poista kommentti jos haluat käyttää
      setTophyGiven(true);
    }
  }, [pastStepCount]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchTasks = async () => {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          const fetchedTasks = await getUserTask(currentUser.$id);
          setTask(fetchedTasks);
          console.log("Fetched tasks:", fetchedTasks);
        }
      };

      fetchTasks();

      return () => {
        // Cleanup function if needed
      };
    }, [])
  );

  return (
    <SafeAreaView style={{backgroundColor: "#afafaf", flexGrow: 1}}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <View style={styles.topRow}>
          <View style={styles.topText}>
            <Text>Hello Max!</Text>
            <Text>You have done amazing today</Text>
          </View>
          <Thumbs
            imageSource={PlaceholderImage}
            title={`olet saanut ${pastStepCount} askelta tänää`}
            period="sinulla on 7x streak"
          />
        </View>
        <Text style={styles.leftAlignedText} >päivittäiset tehtävät</Text>
        
        {task.map((task, index) => (
        <View key={index} style={{ paddingVertical: 10 }}> 
        <Thumbs
        key={index}
        imageSource={PlaceholderImage}
        title={task.title}
        period={task.period}
        showCheckbox={true}
        onCheckboxPress={(isChecked) => console.log(`Checkbox  is ${isChecked}`)}
        />
        </View>
        

        ))}
      </View>
      </ScrollView>
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
  scrollViewContent: {
    backgroundColor: "#afafaf",
    flexGrow: 1,
    alignItems: "center",
    
  },


});


