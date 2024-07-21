import Thumbs from '@/components/thumbs';
import { getCurrentUser, saveTrophy, getUserTask, updateTaskStatus } from '@/lib/appwrite';
import { View, Text, StyleSheet, Dimensions, Image, SafeAreaView, ScrollView } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Pedometer } from 'expo-sensors';
import { useEffect, useState } from 'react';
import React from 'react';
import { useFocusEffect } from 'expo-router';
import { updateTask } from '@/lib/updateTask';

const PlaceholderImage = require('/Users/maxlindblad/Healtylife/assets/images/react-logo.png');
const windowWidth = Dimensions.get('window').width;

export default function HomeScreen() {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [pastStepCount, setPastStepCount] = useState(0);
  const [task, setTask] = useState([]);
  const [trophyGiven, setTrophyGiven] = useState(false);

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
        updateTask();
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
      //saveTrophy(); // Poistettu kommentti jos haluat käyttää tietokantaa enemmän
      setTrophyGiven(true);
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
        
      };
    }, [])
  );

  // Filter tasks where checked is false

  
  const uncheckedTasks = task.filter(item => !item.done);


  return (
    <SafeAreaView style={{ backgroundColor: "#afafaf", flexGrow: 1 }}>
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
          <Text style={styles.leftAlignedText}>päivittäiset tehtävät</Text>

          {uncheckedTasks.length > 0 ? (
            uncheckedTasks.map((taskItem, index) => (
              <View key={index} style={{ paddingVertical: 10 }}>
                <Thumbs
                  imageSource={PlaceholderImage}
                  title={taskItem.title}
                  period={taskItem.period}
                  showCheckbox={true}
                  onCheckboxPress={(isChecked) => updateTaskStatus(taskItem.$id, isChecked)}
                  id ={taskItem.$id}
                />
              </View>
            ))
          ) : (
            <Text style={styles.leftAlignedText}>No unchecked tasks</Text>
          )}

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
  topText: {
    margin: 30,
  },
  leftAlignedText: {
    padding: 30,
    fontSize: 28,
    textAlign: 'left',
    alignSelf: 'flex-start'
  },
  scrollViewContent: {
    backgroundColor: "#afafaf",
    flexGrow: 1,
    alignItems: "center",
  },
});
