import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { verifyPhoto } from '../utils/geminiApi'; // Import Gemini utility

const ProofSubmissionScreen = ({ navigation, route }) => {
  const { betId, betActivity } = route.params; // Get bet details from navigation params
  const [photoUri, setPhotoUri] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [geminiResult, setGeminiResult] = useState(null);

  const takePhoto = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false, // Set to true if your backend expects base64 directly
      maxHeight: 1000,
      maxWidth: 1000,
      quality: 0.7,
      cameraType: 'front', // Or 'back' depending on preferred proof
    };
    launchCamera(options, handleImagePickerResponse);
  };

  const chooseFromLibrary = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 1000,
      maxWidth: 1000,
      quality: 0.7,
    };
    launchImageLibrary(options, handleImagePickerResponse);
  };

  const handleImagePickerResponse = (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorMessage) {
      console.log('ImagePicker Error: ', response.errorMessage);
      Alert.alert('Error', 'Failed to pick image.');
    } else if (response.assets && response.assets.length > 0) {
      setPhotoUri(response.assets[0].uri);
      setGeminiResult(null); // Clear previous result
    }
  };

  const handleSubmitProof = async () => {
    if (!photoUri) {
      Alert.alert('No Photo', 'Please take or select a photo as proof.');
      return;
    }

    setIsUploading(true);
    setGeminiResult(null);

    try {
      // In a real app, you'd first upload the photo to your storage (e.g., Firebase Storage, AWS S3)
      // and get a URL. Then send that URL to your backend for Gemini processing.
      // For this simulation, we pass the local URI.
      const result = await verifyPhoto({ uri: photoUri }, betActivity);

      if (result.success) {
        setGeminiResult(result);
        if (result.isSuspicious) {
            Alert.alert(
                'Gemini Alert!',
                `The AI detected potential issues: ${result.reason}\nConfidence: ${result.confidence}. This will be flagged for your opponent.`
            );
        } else {
            Alert.alert(
                'Proof Submitted!',
                `Your proof has been submitted for opponent verification. Gemini confidence: ${result.confidence}.`
            );
        }
        // Here, you would send the photo URL, Gemini result, and betId to your backend
        // Your backend updates the bet status to 'pending_opponent_verification'
        navigation.goBack(); // Go back after submission
      } else {
        Alert.alert('Gemini Error', result.error || 'Failed to verify photo with AI.');
      }
    } catch (error) {
      console.error('Error submitting proof:', error);
      Alert.alert('Error', 'An error occurred while submitting proof.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Submit Proof</Text>
        <View style={{ width: 24 }} /> {/* Spacer */}
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.betActivityText}>Bet: {betActivity}</Text>

        {photoUri ? (
          <Image source={{ uri: photoUri }} style={styles.previewImage} />
        ) : (
          <View style={styles.placeholderImage}>
            <Icon name="image-plus" size={60} color="#888" />
            <Text style={styles.placeholderText}>No Photo Selected</Text>
          </View>
        )}

        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.mediaButton} onPress={takePhoto}>
            <Icon name="camera" size={24} color="#fff" />
            <Text style={styles.mediaButtonText}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mediaButton} onPress={chooseFromLibrary}>
            <Icon name="folder-image" size={24} color="#fff" />
            <Text style={styles.mediaButtonText}>Choose from Library</Text>
          </TouchableOpacity>
        </View>

        {geminiResult && (
          <View style={styles.geminiResultContainer}>
            <Text style={styles.geminiResultTitle}>AI Verification Result:</Text>
            <Text style={styles.geminiResultText}>
              <Text style={styles.geminiLabel}>Status:</Text> {geminiResult.isSuspicious ? 'Suspicious 🚨' : 'Appears OK ✅'}
            </Text>
            <Text style={styles.geminiResultText}>
              <Text style={styles.geminiLabel}>Reason:</Text> {geminiResult.reason}
            </Text>
            <Text style={styles.geminiResultText}>
              <Text style={styles.geminiLabel}>Confidence:</Text> {(geminiResult.confidence * 100).toFixed(0)}%
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmitProof}
          disabled={!photoUri || isUploading}
        >
          {isUploading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Submit Proof</Text>
          )}
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
  content: {
    alignItems: 'center',
    padding: 20,
  },
  betActivityText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#eee',
    marginBottom: 20,
    textAlign: 'center',
  },
  previewImage: {
    width: '90%',
    height: 300,
    borderRadius: 12,
    resizeMode: 'cover',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#6200EE',
  },
  placeholderImage: {
    width: '90%',
    height: 300,
    borderRadius: 12,
    backgroundColor: '#1C1C1E',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  placeholderText: {
    color: '#888',
    marginTop: 10,
    fontSize: 16,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginBottom: 30,
  },
  mediaButton: {
    backgroundColor: '#333',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  mediaButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
  geminiResultContainer: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 15,
    width: '90%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#03DAC6',
  },
  geminiResultTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  geminiResultText: {
    fontSize: 14,
    color: '#eee',
    marginBottom: 4,
  },
  geminiLabel: {
    fontWeight: 'bold',
    color: '#03DAC6',
  },
  submitButton: {
    backgroundColor: '#6200EE',
    paddingVertical: 15,
    borderRadius: 8,
    width: '90%',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 50,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProofSubmissionScreen;
    