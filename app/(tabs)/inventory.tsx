import TrophyList from '../../components/trophylist';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

export default function InventoryScreen() {
  return (
    <SafeAreaView style={{backgroundColor: "#afafaf", flexGrow: 1}}>
    <View style={styles.container}>
      <Text style={styles.header}>Inventory</Text>
      <TrophyList />
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
