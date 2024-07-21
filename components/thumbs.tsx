import { removeTask } from '@/lib/appwrite';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, Image, View, TouchableOpacity, Modal, Pressable } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const windowWidth = Dimensions.get('window').width;

const Thumbs = ({ imageSource, title, period, showCheckbox, onCheckboxPress, checked, id}) => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleLongPress = () => {
        setModalVisible(true);
    };

    const handleDelete = () => {
        removeTask(id);
        setModalVisible(false);
    };

    return (
        <>
            <TouchableOpacity onLongPress={handleLongPress}>
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
                            isChecked={checked}
                        />
                    )}
                </View>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Confirm Delete</Text>
                        <Text style={styles.modalText}>Are you sure you want to delete {title}?</Text>
                        <View style={styles.modalButtonContainer}>
                            <Pressable style={[styles.button, styles.buttonCancel]} onPress={() => setModalVisible(false)}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </Pressable>
                            <Pressable style={[styles.button, styles.buttonDelete]} onPress={handleDelete}>
                                <Text style={styles.buttonText}>Delete</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
};

export default Thumbs;

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
        position: 'absolute',
        right: 20,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: 300,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginHorizontal: 5,
    },
    buttonCancel: {
        backgroundColor: '#2196F3',
    },
    buttonDelete: {
        backgroundColor: '#f44336',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
