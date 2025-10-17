import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// ... (imports)

const BetCard = ({ bet, navigation }) => { // Add navigation prop
  const isGroupBet = bet.user2.includes('(Group)');
  return (
    <View style={styles.betCard}>
      {/* ... (existing bet details) */}
      <TouchableOpacity
        style={styles.logProofButton}
        onPress={() => navigation.navigate('ProofSubmission', {
          betId: bet.id,
          betActivity: bet.activity,
        })}
      >
        <Text style={styles.logProofButtonText}>Log Proof</Text>
      </TouchableOpacity>
    </View>
  );
};

// ... (existing styles)

// Mock Data for Bets (replace with real data from your backend)
const MOCK_BETS = [
  {
    id: '1',
    user1: 'You',
    user2: 'Sarah',
    activity: 'Go to gym 3x/week',
    proofType: 'Live Photo',
    frequency: '3x/week',
    length: '1 month',
    progress: { current: 2, total: 12 }, // e.g., 2 sessions out of 12 for a month
    status: 'active',
  },
  {
    id: '2',
    user1: 'You',
    user2: 'Mark',
    activity: 'Read 1 book/week',
    proofType: 'Live Photo',
    frequency: '1x/week',
    length: '1 month',
    progress: { current: 1, total: 4 },
    status: 'pending_verification', // Awaiting opponent verification
  },
  {
    id: '3',
    user1: 'You',
    user2: 'Dev Bros (Group)', // Example of a group bet
    activity: 'Code 5 hours/day',
    proofType: 'Live Photo',
    frequency: '5x/week',
    length: '2 months',
    progress: { current: 10, total: 40 },
    status: 'active',
  },
];


const BetsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Active Bets</Text>
        <TouchableOpacity style={styles.addBetButton} onPress={() => navigation.navigate('AddBet')}>
          <Icon name="plus" size={24} color="#fff" />
          <Text style={styles.addBetButtonText}>New Bet</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={MOCK_BETS}
        renderItem={({ item }) => <BetCard bet={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Dark background
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  addBetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6200EE', // Primary color
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 25,
  },
  addBetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  listContent: {
    padding: 16,
  },
  betCard: {
    backgroundColor: '#1C1C1E', // Slightly lighter dark for cards
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  betHeader: {
    marginBottom: 10,
  },
  betTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  betParticipants: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 4,
  },
  betDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  detailText: {
    backgroundColor: '#333',
    color: '#eee',
    borderRadius: 5,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8,
    marginBottom: 8,
    fontSize: 12,
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: '#333',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 8,
    marginBottom: 8,
    justifyContent: 'center',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#03DAC6', // Accent color
    borderRadius: 5,
  },
  progressText: {
    position: 'absolute',
    alignSelf: 'center',
    color: '#fff',
    fontSize: 9,
    fontWeight: 'bold',
  },
  pendingText: {
    color: '#FFD700', // Gold color for pending
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 8,
  },
  logProofButton: {
    backgroundColor: '#6200EE',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  logProofButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BetsScreen;
