import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { getUserTrophies, getCurrentUser } from '../lib/appwrite';

const TrophyList = () => {
  const [trophies, setTrophies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrophies = async () => {
      setLoading(true);
      const currentUser = await getCurrentUser();
      if (currentUser) {
        const fetchedTrophies = await getUserTrophies(currentUser.$id);
        setTrophies(fetchedTrophies);
      }
      setLoading(false);
    };

    fetchTrophies();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.trophyItem}>
      <Text style={styles.trophyText}>{item.trophy}</Text>
    </View>
  );

  if (loading) {
    return <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.listContainer}>
      <Text style={styles.title}>Your Trophies:</Text>
      <FlatList
        data={trophies}
        keyExtractor={item => item.$id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  trophyItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  trophyText: {
    fontSize: 16,
  },
  loader: {
    marginTop: 50,
  },
});

export default TrophyList;
