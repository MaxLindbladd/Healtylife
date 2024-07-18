import React from 'react';
import { View, Modal, Image, TouchableOpacity, StyleSheet, ScrollView, Button } from 'react-native';



const images = [
  { uri: require('/Users/maxlindblad/Healtylife/assets/images/react-logo.png'), name: 'image1.png' },
  { uri: require('/Users/maxlindblad/Healtylife/assets/images/react-logo.png'), name: 'image2.png' },
  { uri: require('/Users/maxlindblad/Healtylife/assets/images/react-logo.png'), name: 'image3.png' },
  // Add more images as needed
];


export default function ImagePicker({ visible, onSelect, onClose }) {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <ScrollView contentContainerStyle={styles.imageContainer}>
          {images.map((image, index) => (
            <TouchableOpacity key={index} onPress={() => onSelect(image)}>
              <Image source={image.uri} style={styles.image} />
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Button title="Close" onPress={onClose} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
  },
});
