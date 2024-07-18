import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { View, StyleSheet } from 'react-native';

export default function TabLayout() {
  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: 'red',
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarStyle: {
            backgroundColor: "white",
            borderCurve: "circular",
            borderRadius: 18,
            borderBlockColor: "#afafaf"
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            tabBarShowLabel: false,
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
            headerShown: false
          }}
        />
        <Tabs.Screen
          name="goals"
          options={{
            title: 'goals',
            tabBarShowLabel: false,
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="calendar" color={color} />,
            headerShown: false
          }}
        />
        <Tabs.Screen

          name="addTask"
          options={{
            title: '',
            tabBarShowLabel: false,
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="search" color={color} />,
            headerShown: false,
            tabBarItemStyle:{
              backgroundColor: "#0088cc",
              borderRadius: 20,
              width: 20,
              height: 60,
              top: -50,
              margin:20,
            }
          }}
        />
        <Tabs.Screen
          name="inventory"
          options={{
            title: 'Inventory',
            tabBarShowLabel: false,
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="archive" color={color} />,
            headerShown: false
          }}
        />
        <Tabs.Screen
          name="shop"
          options={{
            title: 'Shop',
            tabBarShowLabel: false,
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="shopping-cart" color={color} />,
            headerShown: false
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#afafaf',
  },
});