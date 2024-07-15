import { Redirect, Stack } from 'expo-router';
import { Header } from 'react-native/Libraries/NewAppScreen';

import { useGlobalContext } from "../../context/GlobalProvider";

export default function AuthLayout() {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />;


  return (
    <Stack
    screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="signUp" options={{headerShown: false}} />
      <Stack.Screen name="signIn" options={{headerShown: false}} />
    </Stack>
  );
}
