import Thumbs from '@/components/thumbs';
import { getCurrentUser, getUserTask } from '@/lib/appwrite';
import { useFocusEffect } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions,SafeAreaView } from 'react-native';


const PlaceholderImage = require('/Users/maxlindblad/Healtylife/assets/images/react-logo.png');
const windowWidth = Dimensions.get('window').width;

export default function DetailsScreen() {
  const [task, setTask] = useState([]);

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

  // Filter tasks by period
  const filterTasksByPeriod = (period) => {
    return task.filter(item => item.period === period);
  };

  // Filter daily, weekly and monthly tasks
  const dailyTasks = filterTasksByPeriod("Päivittäin");
  const weeklyTasks = filterTasksByPeriod("Viikoittain");
  const monthlyTasks = filterTasksByPeriod("Kuukausittain");

  return (
    <SafeAreaView style={{backgroundColor: "#afafaf", flexGrow: 1}}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.leftAlignedText}>Goals</Text>
        <Text style={styles.normalText}>Here you can see all your goals </Text>

        {/* Render daily goals */}
        {dailyTasks.length > 0 ? (
          <>
            <Text style={styles.leftAlignedText}>Daily goals</Text>
            {dailyTasks.map((taskItem, index) => (
              <View key={index} style={{ paddingVertical: 10 }}>
                <Thumbs
                  imageSource={PlaceholderImage}
                  title={taskItem.title}
                  period={taskItem.period}
                />
              </View>
            ))}
            <View style={{ paddingVertical: 10 }}></View>
          </>
        ) : (
          <Text style={styles.leftAlignedText}>No daily tasks added</Text>
        )}

        {/* Render weekly goals */}
        {weeklyTasks.length > 0 ? (
          <>
            <Text style={styles.leftAlignedText}>Weekly goals</Text>
            {weeklyTasks.map((taskItem, index) => (
              <View key={index} style={{ paddingVertical: 10 }}>
                <Thumbs
                  imageSource={PlaceholderImage}
                  title={taskItem.title}
                  period={taskItem.period}
                />
              </View>
            ))}
            <View style={{ paddingVertical: 10 }}></View>
          </>
        ) : (
          <Text style={styles.leftAlignedText}>No weekly tasks added</Text>
        )}

        {/* Render monthly goals */}
        {monthlyTasks.length > 0 ? (
          <>
            <Text style={styles.leftAlignedText}>Monthly goals</Text>
            {monthlyTasks.map((taskItem, index) => (
              <View key={index} style={{ paddingVertical: 10 }}>
                <Thumbs
                  imageSource={PlaceholderImage}
                  title={taskItem.title}
                  period={taskItem.period}
                />
              </View>
            ))}
            <View style={{ paddingVertical: 10 }}></View>
          </>
        ) : (
          <Text style={styles.leftAlignedText}>No monthly tasks added</Text>
        )}
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
  leftAlignedText: {
    padding: 30,
    fontSize: 28,
    textAlign: 'left',
    alignSelf: 'flex-start'
  },
  container: {
    alignItems: 'center',
    alignContent: "center",
    backgroundColor: "#afafaf",
    height: "100%"
  },
});
