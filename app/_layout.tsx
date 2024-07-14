import { Stack } from 'expo-router';
import { Header } from 'react-native/Libraries/NewAppScreen';

export default function RootLayout() {
  return (
    <Stack
    screenOptions={{
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
      <Stack.Screen name="(tabs)" options={{headerShown: false}} />
    </Stack>
  );
}
