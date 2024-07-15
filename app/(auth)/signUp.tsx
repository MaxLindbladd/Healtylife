import { router } from 'expo-router';
import { View, Text, StyleSheet, Dimensions, Image, SafeAreaView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useGlobalContext } from "../../context/GlobalProvider";
import { createUser } from "../../lib/appwrite";
import { useState } from "react";

const PlaceholderImage = require('/Users/maxlindblad/Healtylife/assets/images/react-logo.png');
const windowWidth = Dimensions.get('window').width;

export default function SignUpScreen() {

  const { setUser, setIsLogged } = useGlobalContext();

  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
      
    }

    setSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLogged(true);

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

        <Text style={styles.signUpText}>Sign Up to HealthyLife</Text>

        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input} 
            placeholder="Name" 
            placeholderTextColor="#666"
            value={form.username}
            onChangeText={(text) => setForm({ ...form, username: text })}
          />
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

        <TouchableOpacity style={styles.signupButton} onPress={submit} disabled={isSubmitting}>
          <Text style={styles.buttonText}>Sign Up</Text>
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
    textAlign: "left",
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
  signupButton: {
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
