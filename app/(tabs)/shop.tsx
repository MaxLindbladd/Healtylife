import { View, Text, StyleSheet } from 'react-native';

export default function ShopsScreen() {
  return (
    <View style={styles.container}>
      <Text>Shop</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
