import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Or any other icon set

// Import your screen components
import BetsScreen from './src/Screens/BetsScreen';
import LeaderboardScreen from './src/Screens/LeaderboardScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import AddBetScreen from './src/screens/AddBetScreen'; // For adding new bets

// ... (imports)

function BetsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BetsOverview" component={BetsScreen} />
      <Stack.Screen name="AddBet" component={AddBetScreen} />
      <Stack.Screen name="ProofSubmission" component={ProofSubmissionScreen} /> {/* Add this line */}
    </Stack.Navigator>
  );
}

// ... (rest of App.js)

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Stack for Bets screen to handle adding new bets
function BetsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BetsOverview" component={BetsScreen} />
      <Stack.Screen name="AddBet" component={AddBetScreen} />
      {/* Potentially a BetDetailsScreen later */}
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false, // Hide header for tab navigator
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Bets') {
              iconName = focused ? 'handshake' : 'handshake-outline'; // Bet icon
            } else if (route.name === 'Leaderboard') {
              iconName = focused ? 'trophy' : 'trophy-outline'; // Leaderboard icon
            } else if (route.name === 'Profile') {
              iconName = focused ? 'account-circle' : 'account-circle-outline'; // Profile icon
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#6200EE', // Your brand color
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: '#1C1C1E', // Darker background for tab bar
            borderTopWidth: 0, // Remove top border
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
        })}
      >
        <Tab.Screen name="Bets" component={BetsStack} />
        <Tab.Screen name="Leaderboard" component={LeaderboardScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;