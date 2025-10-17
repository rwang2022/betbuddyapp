import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker'; // You'll need to install this
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Install picker: npm install @react-native-picker/picker

const AddBetScreen = ({ navigation }) => {
  const [betActivity, setBetActivity] = useState('');
  const [opponent, setOpponent] = useState(''); // Could be user ID or username
  const [proofType, setProofType] = useState('Live Photo');
  const [frequency, setFrequency] = useState('3x/week');
  const [betLength, setBetLength] = useState('1 month');
  const [stake, setStake] = useState(''); // Points stake

  const handleAddBet = () => {
    if (!betActivity || !opponent || !stake) {
      Alert.alert('Missing Info', 'Please fill in all required fields.');
      return;
    }
    // Here you would typically send this data to your backend
    console.log({ betActivity, opponent, proofType, frequency, betLength, stake });
    Alert.alert('Bet Added!', 'Your bet has been proposed.');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Propose New Bet</Text>
        <View style={{ width: 24 }} /> {/* Spacer */}
      </View>

      <ScrollView style={styles.formContainer}>
        <Text style={styles.label}>What's the Bet Activity?</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Go to gym 3x/week, Read 1 book, Learn React Native"
          placeholderTextColor="#888"
          value={betActivity}
          onChangeText={setBetActivity}
        />

        <Text style={styles.label}>Bet With Who?</Text>
        <TextInput
          style={styles.input}
          placeholder="Friend's Username or Group Name"
          placeholderTextColor="#888"
          value={opponent}
          onChangeText={setOpponent}
        />

        <Text style={styles.label}>Proof Type:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={proofType}
            onValueChange={(itemValue) => setProofType(itemValue)}
            style={styles.picker}
            itemStyle={styles.pickerItem} // Styling for picker items
          >
            <Picker.Item label="Live Photo" value="Live Photo" />
            <Picker.Item label="Location Check-in" value="Location" />
            <Picker.Item label="Screenshot" value="Screenshot" />
          </Picker>
        </View>

        <Text style={styles.label}>Frequency:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={frequency}
            onValueChange={(itemValue) => setFrequency(itemValue)}
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            <Picker.Item label="Daily" value="Daily" />
            <Picker.Item label="3x/week" value="3x/week" />
            <Picker.Item label="1x/week" value="1x/week" />
            <Picker.Item label="2x/month" value="2x/month" />
            <Picker.Item label="1x/month" value="1x/month" />
          </Picker>
        </View>

        <Text style={styles.label}>Bet Length:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={betLength}
            onValueChange={(itemValue) => setBetLength(itemValue)}
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            <Picker.Item label="1 Week" value="1 week" />
            <Picker.Item label="2 Weeks" value="2 weeks" />
            <Picker.Item label="1 Month" value="1 month" />
            <Picker.Item label="3 Months" value="3 months" />
            <Picker.Item label="6 Months" value="6 months" />
          </Picker>
        </View>

        <Text style={styles.label}>Points to Stake:</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., 100"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={stake}
          onChangeText={setStake}
        />
        <Text style={styles.infoText}>These points can be redeemed for pranks!</Text>

        <TouchableOpacity style={styles.proposeButton} onPress={handleAddBet}>
          <Text style={styles.proposeButtonText}>Propose Bet</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  formContainer: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 15,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#1C1C1E',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  pickerContainer: {
    backgroundColor: '#1C1C1E',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 10, // Added margin for spacing
  },
  picker: {
    color: '#fff',
    backgroundColor: '#1C1C1E',
  },
  pickerItem: {
    color: '#fff', // This might not work on iOS directly for individual items
  },
  infoText: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 5,
    marginBottom: 15,
  },
  proposeButton: {
    backgroundColor: '#6200EE',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 50, // Added bottom margin for scrollability
  },
  proposeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

import { getBetSuggestions } from '../utils/geminiApi'; // Import the Gemini utility


export default AddBetScreen;



