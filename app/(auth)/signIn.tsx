import { View, Text, StyleSheet, Dimensions, Image, SafeAreaView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Link, router } from 'expo-router'; // Import Link for navigation
import { Colors } from 'react-native/Libraries/NewAppScreen';

import { getCurrentUser, signIn } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { useState } from "react";

const PlaceholderImage = require('/Users/maxlindblad/Healtylife/assets/images/react-logo.png');
const windowWidth = Dimensions.get('window').width;

export default function LoginScreen() {

  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
      return; // Add return here to prevent further execution
    }

    setSubmitting(true);

    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true);

      Alert.alert("Success", "User signed in successfully");
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.thumbs}>
          <Image source={PlaceholderImage} style={styles.image} />
          <Text style={styles.appName}>HealthyLife</Text>
        </View>

        <Text style={styles.signUpText}>Log In to HealthyLife</Text>

        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input} 
            placeholder="Email" 
            placeholderTextColor="#666"
            keyboardType="email-address"
            value={form.email}
            onChangeText={(text) => setForm({ ...form, email: text })}
          />
          <TextInput 
            style={styles.input} 
            placeholder="Password" 
            placeholderTextColor="#666"
            secureTextEntry
            value={form.password}
            onChangeText={(text) => setForm({ ...form, password: text })}
          />
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={submit} disabled={isSubmitting}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <Link href="/signUp" style={styles.footerLink}>Sign up here</Link>
        </View>
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
    alignItems: 'center',
    justifyContent: 'center',
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
  signUpText: {
    fontSize: 20,
    color: '#333',
    textAlign: 'center',
    marginVertical: 20,
  },
  inputContainer: {
    width: windowWidth - 40,
    marginBottom: 20,
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  loginButton: {
    width: windowWidth - 80,
    padding: 15,
    backgroundColor: "#4caf50",
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
  },
  footerLink: {
    fontSize: 14,
    color: '#4caf50',
    fontWeight: 'bold',
  },
});
