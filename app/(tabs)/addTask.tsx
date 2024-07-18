import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, TouchableOpacity, Modal, Text, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { saveTask } from '@/lib/appwrite';
import ImagePicker from '@/components/imagePicker'; // Varmista oikea tuontipolku

export default function AddTaskScreen() {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskPeriod, setTaskPeriod] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [isPeriodPickerVisible, setPeriodPickerVisible] = useState(false);
  const navigation = useNavigation();

  const periods = ['Päivittäin', 'Viikoittain', 'Kuukausittain'];

  const handleSaveTask = async () => {
    if (taskTitle && taskPeriod) {
      try {
        await saveTask({ title: taskTitle, period: taskPeriod, imageSource: selectedImage.name });
        setTaskTitle('');
        setTaskPeriod('');
        setSelectedImage(null);
        navigation.goBack();
      } catch (error) {
        console.error('Error saving task:', error);
        alert('Failed to save task. Please try again.');
      }
    } else {
      alert('Please fill out all fields');
    }
  };

  const handleSelectPeriod = (period) => {
    setTaskPeriod(period);
    setPeriodPickerVisible(false);
  };

  const handleSelectImage = (image) => {
    setSelectedImage(image);
    setPickerVisible(false);
  };

  return (
    <SafeAreaView style={{backgroundColor: "#afafaf", flexGrow: 1}}>
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Task Title"
        value={taskTitle}
        onChangeText={setTaskTitle}
      />
      <TouchableOpacity onPress={() => setPeriodPickerVisible(true)}>
        <View style={styles.pickerContainer}>
          <Text>{taskPeriod || 'Select Period'}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setPickerVisible(true)}>
        <View style={styles.imageSelector}>
          {selectedImage ? (
            <Image source={selectedImage.uri } style={styles.selectedImage} />
          ) : (
            <Button title="Pick an Image" onPress={() => setPickerVisible(true)} />
          )}
        </View>
      </TouchableOpacity>
      <Button title="Save Task" onPress={handleSaveTask} />
      
      {/* Modal for Period Selection */}
      <Modal
        visible={isPeriodPickerVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setPeriodPickerVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {periods.map((period, index) => (
              <TouchableOpacity
                key={index}
                style={styles.periodOption}
                onPress={() => handleSelectPeriod(period)}
              >
                <Text>{period}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      <ImagePicker
        visible={isPickerVisible}
        onSelect={handleSelectImage}
        onClose={() => setPickerVisible(false)}
      />
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#afafaf',
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    padding: 10,
    marginBottom: 12,
    alignItems: 'center',
  },
  imageSelector: {
    alignItems: 'center',
    marginBottom: 12,
  },
  selectedImage: {
    width: 100,
    height: 100,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    elevation: 5,
    minWidth: 300,
  },
  periodOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
