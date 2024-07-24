import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';


const windowWidth = Dimensions.get('window').width;


const ShopItem = ({ title, price, imageSource, onPurchase }) => {

 

  return (
    <View style={styles.thumbs}>
      <Image source={imageSource} style={styles.image} />
      <View style={styles.thumbsColumn}>
        <Text style={styles.centeredText}>{title}</Text>
        <Text style={styles.centeredText}>{price} tokenia</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={onPurchase}>
        <Text style={styles.buttonText}>Buy</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ShopItem;

const styles = StyleSheet.create({
  thumbs: {
    backgroundColor: 'white',
    borderRadius: 30,
    marginBottom: 10,
    width: windowWidth - 40,
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10, 
  },
  thumbsColumn: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 1, 
  },
  centeredText: {
    paddingVertical: 4,
  },
  image: {
    width: 120,
    height: 60,
    margin: 10, 
    resizeMode: "contain"
  },
  button: {
    backgroundColor: '#007BFF', 
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5, 
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
