import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchImageLibrary } from 'react-native-image-picker'; // For picking profile picture

// Mock User Data
const MOCK_USER = {
  id: 'user123',
  name: 'John Doe',
  profilePic: 'https://via.placeholder.com/150/6200EE/FFFFFF?text=JD', // Placeholder image
  bannerImage: 'https://via.placeholder.com/400x150/03DAC6/000000?text=John%27s+Banner', // Placeholder banner
  betsMade: 25,
  betsSuccessful: 18,
  successRate: 72,
  rankLevel: 'Intermediate', // Beginner, Intermediate, Advanced, Legendary
  points: 1250,
  friendGroups: ['Gym Buddies', 'Code Crew', 'Bookworms'],
  pranksRedeemed: [
    { id: 'p1', name: 'Draw on Banner', cost: 200 },
    { id: 'p2', name: 'Change App Icon', cost: 500 },
  ],
};

const ProfileScreen = () => {
  // Function to handle profile picture upload
  const handleChoosePhoto = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const source = { uri: response.assets[0].uri };
        // Here you would upload the image to your backend
        // For now, let's just log it
        console.log('New profile pic URI:', source.uri);
        Alert.alert('Profile Picture Updated', 'Your profile picture has been updated!');
      }
    });
  };

  const renderRankIcon = (rank) => {
    switch (rank) {
      case 'Beginner': return <Icon name="leaf" size={20} color="#9CCC65" />; // Green
      case 'Intermediate': return <Icon name="shield-half-full" size={20} color="#2196F3" />; // Blue
      case 'Advanced': return <Icon name="star" size={20} color="#FFD700" />; // Gold
      case 'Legendary': return <Icon name="crown" size={20} color="#FFEB3B" />; // Yellow
      default: return <Icon name="account" size={20} color="#fff" />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Banner Image */}
        <Image source={{ uri: MOCK_USER.bannerImage }} style={styles.banner} />

        {/* Profile Picture */}
        <View style={styles.profilePicContainer}>
          <Image source={{ uri: MOCK_USER.profilePic }} style={styles.profilePic} />
          <TouchableOpacity style={styles.editProfilePicButton} onPress={handleChoosePhoto}>
            <Icon name="camera" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* User Info */}
        <View style={styles.userInfoSection}>
          <Text style={styles.userName}>{MOCK_USER.name}</Text>
          <View style={styles.rankContainer}>
            {renderRankIcon(MOCK_USER.rankLevel)}
            <Text style={styles.rankLevelText}>{MOCK_USER.rankLevel}</Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{MOCK_USER.betsMade}</Text>
            <Text style={styles.statLabel}>Bets Made</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{MOCK_USER.betsSuccessful}</Text>
            <Text style={styles.statLabel}>Successful Bets</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{MOCK_USER.successRate}%</Text>
            <Text style={styles.statLabel}>Success Rate</Text>
          </View>
        </View>

        {/* Points Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Points: <Text style={styles.pointsText}>{MOCK_USER.points}</Text></Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Redeem Pranks</Text>
          </TouchableOpacity>
        </View>

        {/* Friend Groups */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Friend Groups</Text>
          {MOCK_USER.friendGroups.map((group, index) => (
            <Text key={index} style={styles.groupText}>- {group}</Text>
          ))}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Manage Groups</Text>
          </TouchableOpacity>
        </View>

        {/* Settings/Logout */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.settingItem}>
            <Icon name="cog" size={20} color="#fff" />
            <Text style={styles.settingText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem} onPress={() => Alert.alert('Logged Out', 'You have been logged out.')}>
            <Icon name="logout" size={20} color="#FF6347" />
            <Text style={[styles.settingText, { color: '#FF6347' }]}>Log Out</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  banner: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  profilePicContainer: {
    alignSelf: 'center',
    marginTop: -75, // Overlap with banner
    marginBottom: 20,
    position: 'relative',
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: '#000', // Matches background
  },
  editProfilePicButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#6200EE',
    borderRadius: 20,
    padding: 8,
    borderWidth: 2,
    borderColor: '#000',
  },
  userInfoSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  rankContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  rankLevelText: {
    fontSize: 16,
    color: '#eee',
    marginLeft: 8,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
    paddingHorizontal: 16,
  },
  statBox: {
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    padding: 15,
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 5,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#03DAC6',
  },
  statLabel: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 5,
  },
  section: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    marginHorizontal: 16,
    padding: 16,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  pointsText: {
    color: '#03DAC6',
  },
  groupText: {
    fontSize: 16,
    color: '#eee',
    marginBottom: 5,
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#6200EE',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  settingText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 10,
  },
});

export default ProfileScreen;
