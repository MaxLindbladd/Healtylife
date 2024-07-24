import { useEffect, useState } from 'react';
import TrophyList from '../../components/trophylist';
import { View, Text, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { getRandomTrophy } from '@/lib/trophies';
import { getCurrentUser } from '@/lib/appwrite';

export default function InventoryScreen() {
  const [steps, setSteps] = useState(500);
  const [chest, setChest] = useState([]);

  useEffect(()=>{
    if(steps >= chest.goal){
      getRandomTrophy();
      Alert.alert("sait uuden buddyn");
      setChest([]);
      removeChest();
    }
  },[]);

  useEffect(async ()=>{
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      console.log("User not logged in");
      return;
    };

    const chests = await fetchChests(currentUser.$id)
    if(chests !== undefined){
      setChest(chests)
    };

  },[]);
  

  return (
    <SafeAreaView style={{backgroundColor: "#afafaf", flexGrow: 1}}>
    <View style={styles.container}>
      <Text style={styles.header}>Inventory</Text>
      <TrophyList />
      <Text>chest slott</Text>
      <Text>10k chest</Text>
      <Text>tilanne on {steps / 10000 * 100}%</Text>

    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#afafaf',
    
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});
