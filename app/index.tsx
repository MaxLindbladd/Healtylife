import { Link, Redirect, router } from 'expo-router';
import { View, Text, StyleSheet, Dimensions, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useGlobalContext } from "../context/GlobalProvider";

import 'react-native-url-polyfill/auto'

const PlaceholderImage = require('/Users/maxlindblad/Healtylife/assets/images/react-logo.png');
const AnotherImage = require('/Users/maxlindblad/Healtylife/assets/images/react-logo.png');  // Replace with your actual image path
const windowWidth = Dimensions.get('window').width;

export default function LandingScreen() {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />;
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.thumbs}>
          <Image source={PlaceholderImage} style={styles.image} />
          <Text style={styles.appName}>HealthyLife</Text>
        </View>
        
        <View style={styles.mainContent}>
          <Image source={AnotherImage} style={styles.mainImage} />
          <Text style={styles.mainText}>Let's start your journey to better health with HealthyLife</Text>
          <Text style={styles.subText}>Where habits meet games. Enjoy without even noticing.</Text>
        </View>
        
        <TouchableOpacity style={styles.emailButton} onPress={()=>{router.push("/signIn")}}>
          <Text style={styles.buttonText}>Start with Email</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  thumbs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    width: windowWidth - 40,
    marginBottom: 20,
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8a5027',
  },
  mainContent: {
    alignItems: 'center',
    marginBottom: 20,
  },
  mainImage: {
    width: windowWidth - 40,
    height: 400,
    borderRadius: 20,
    marginBottom: 20,
  },
  mainText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginVertical: 10,
  },
  subText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  emailButton: {
    width: windowWidth - 80,
    padding: 15,
    backgroundColor: "#4caf50",
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});

