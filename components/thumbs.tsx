import { Dimensions, StyleSheet, Text, Image, View } from 'react-native'
import React from 'react'
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const windowWidth = Dimensions.get('window').width;

const Thumbs = ({ imageSource, title, period, showCheckbox, onCheckboxPress, checked }) => {
    return (
      <View style={styles.thumbs}>
        <Image source={imageSource} style={styles.image} />
        <View style={styles.thumbsColumn}>
          <Text style={styles.centeredText}>{title}</Text>
          <Text style={styles.centeredText}>{period}</Text>
        </View>
        {showCheckbox && (
          <BouncyCheckbox 
          style={styles.checkbox} 
          onPress={onCheckboxPress} 
          isChecked = {checked} 
          />
        )}
      </View>
    );
  };

export default Thumbs

const styles = StyleSheet.create({
    thumbs: {
      backgroundColor: 'white',
      borderRadius: 30,
      marginBottom: 10,
      width: windowWidth - 40,
      height: 80,
      flexDirection: 'row',
      alignItems: 'center',
    },
    thumbsColumn: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    centeredText: {
      paddingVertical: 4,
    },
    image: {
      width: 60,
      height: 60,
      margin: 20,
    },
    checkbox: {
        position: "absolute",
        right: 20
      },
  });