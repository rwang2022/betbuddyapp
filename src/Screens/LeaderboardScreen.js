import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Mock Leaderboard Data
const MOCK_LEADERBOARD = [
  { id: '1', name: 'Alice', successRate: 92, successfulBets: 15, rank: 1, level: 'Legendary' },
  { id: '2', name: 'Bob', successRate: 88, successfulBets: 12, rank: 2, level: 'Advanced' },
  { id: '3', name: 'Charlie', successRate: 75, successfulBets: 20, rank: 3, level: 'Advanced' },
  { id: '4', name: 'Diana', successRate: 95, successfulBets: 8, rank: 4, level: 'Intermediate' },
  { id: '5', name: 'Eve', successRate: 60, successfulBets: 30, rank: 5, level: 'Beginner' },
];

const LeaderboardItem = ({ user }) => (
  <View style={styles.leaderboardItem}>
    <Text style={styles.rankText}>{user.rank}.</Text>
    <Icon name="account-circle" size={30} color="#fff" style={styles.avatar} />
    <View style={styles.userInfo}>
      <Text style={styles.userName}>{user.name}</Text>
      <Text style={styles.userLevel}>{user.level}</Text>
    </View>
    <View style={styles.stats}>
      <Text style={styles.statText}>Rate: {user.successRate}%</Text>
      <Text style={styles.statText}>Bets: {user.successfulBets}</Text>
    </View>
  </View>
);

const LeaderboardScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Leaderboard</Text>
      <Text style={styles.subtitle}>Based on Success Rate & Total Successful Bets</Text>
      <FlatList
        data={MOCK_LEADERBOARD}
        renderItem={({ item }) => <LeaderboardItem user={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    padding: 16,
  },
  subtitle: {
    fontSize: 14,
    color: '#aaa',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  listContent: {
    padding: 16,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
  },
  rankText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700', // Gold for rank
    marginRight: 10,
    width: 30, // Fixed width for alignment
    textAlign: 'center',
  },
  avatar: {
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  userLevel: {
    fontSize: 12,
    color: '#bbb',
  },
  stats: {
    alignItems: 'flex-end',
  },
  statText: {
    fontSize: 14,
    color: '#eee',
  },
});

export default LeaderboardScreen;
