import { Stack } from 'expo-router';
import { Header } from 'react-native/Libraries/NewAppScreen';
import GlobalProvider from "../context/GlobalProvider";

export default function RootLayout() {
  return (
    <GlobalProvider>
    <Stack
    screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="(auth)" options={{headerShown: false}} />
      <Stack.Screen name="(tabs)" options={{headerShown: false}} />
    </Stack>
    </GlobalProvider>
  );
}
