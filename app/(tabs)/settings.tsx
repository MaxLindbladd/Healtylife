import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';




export default function DetailsScreen() {


  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <Text style={styles.leftAlignedText}>Goals</Text>
        <View style={styles.calenderContainer}>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#afafaf",
    height: "100%"
  },
  leftAlignedText: {
    padding: 30,
    fontSize: 28,
    textAlign: 'left',
    alignSelf: 'flex-start'
  },
  calenderContainer: {},
});
