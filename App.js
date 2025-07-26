"use client";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useState, createContext, useContext, View, Text } from "react";

// Import main screens
import EcoLockScreen from "./src/screens/EcoLockScreen";
import EcoIntelligence from "./src/screens/EcoIntelligence";
import EcoAction from "./src/screens/EcoAction";
import EcoRewards from "./src/screens/EcoReward";
import EcoCommunity from "./src/screens/EcoCommunity";
import LoginScreen from "./src/screens/auth/LoginScreen";
import SignUpScreen from "./src/screens/auth/SignUpScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import QuizScreen from "./src/screens/QuizScreen";
import ChallengeDetailsScreen from "./src/screens/ChallengeDetailsScreen";
import NewsDetailsScreen from "./src/screens/NewsDetailsScreen";
import HomeScreen from "./src/screens/HomeScreen"; // New HomeScreen

// Import Intelligence sub-screens
import LearningDashboard from "./src/screens/intelligence/LearningDashboard";
import InteractiveQuiz from "./src/screens/intelligence/InteractiveQuiz";
import LearningModule from "./src/screens/intelligence/LearningModule";

// Import Action sub-screens
import MissionCatalog from "./src/screens/action/MissionCatalog";
import ActionVerification from "./src/screens/action/ActionVerification";
import MissionComplete from "./src/screens/action/MissionComplete";

// Import Rewards sub-screens
import RewardsDashboard from "./src/screens/rewards/RewardsDashboard";
import RewardMarketplace from "./src/screens/rewards/RewardMarketPlace";
import EnvironmentalImpact from "./src/screens/rewards/EnvironmentalImpact";

// Import Community sub-screens
import SocialFeed from "./src/screens/community/SocialFeed";
import GroupChallenges from "./src/screens/community/GroupChallenges";
import MyGroups from "./src/screens/community/MyGroups";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Context for user authentication and theme
const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [ecoPoints, setEcoPoints] = useState(1250);

  const login = async (userData) => {
    try {
      console.log("Logging in user:", userData);
      setIsLoading(true);
      setUser(userData);
      setEcoPoints(userData.ecoPoints || 1250);
      console.log("User state updated, navigating to MainStack");
    } catch (error) {
      console.error("Error saving user data:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      console.log("Logging out user");
      setUser(null);
      setEcoPoints(0);
    } catch (error) {
      console.error("Error removing user data:", error);
    }
  };

  const toggleTheme = async () => {
    try {
      const newTheme = !isDarkMode;
      setIsDarkMode(newTheme);
      console.log("Theme toggled to:", newTheme ? "dark" : "light");
    } catch (error) {
      console.error("Error saving theme:", error);
    }
  };

  const updateEcoPoints = async (newPoints) => {
    try {
      setEcoPoints(newPoints);
      console.log("Eco points updated to:", newPoints);
    } catch (error) {
      console.error("Error saving points:", error);
    }
  };

  const value = {
    user,
    isLoading,
    isDarkMode,
    ecoPoints,
    login,
    logout,
    toggleTheme,
    updateEcoPoints,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Auth Stack
const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
  </Stack.Navigator>
);

// Main Tab Navigator
const MainTabs = () => {
  const { isDarkMode } = useAppContext();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Intelligence") {
            iconName = focused ? "bulb" : "bulb-outline";
          } else if (route.name === "Action") {
            iconName = focused ? "leaf" : "leaf-outline";
          } else if (route.name === "Rewards") {
            iconName = focused ? "trophy" : "trophy-outline";
          } else if (route.name === "Community") {
            iconName = focused ? "people" : "people-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#4ade80",
        tabBarInactiveTintColor: isDarkMode ? "#6b7280" : "#9ca3af",
        tabBarStyle: {
          backgroundColor: isDarkMode ? "#111827" : "#ffffff",
          borderTopColor: isDarkMode ? "#374151" : "#e5e7eb",
          height: 80,
          paddingBottom: 10,
          paddingTop: 10,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Intelligence" component={EcoIntelligence} />
      <Tab.Screen name="Action" component={EcoAction} />
      <Tab.Screen name="Rewards" component={EcoRewards} />
      <Tab.Screen name="Community" component={EcoCommunity} />
    </Tab.Navigator>
  );
};

// Main Stack Navigator
const MainStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="EcoLockScreen" component={EcoLockScreen} />
    <Stack.Screen name="MainTabs" component={MainTabs} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="Settings" component={SettingsScreen} />
    <Stack.Screen name="Quiz" component={QuizScreen} />
    <Stack.Screen name="ChallengeDetails" component={ChallengeDetailsScreen} />
    <Stack.Screen name="NewsDetails" component={NewsDetailsScreen} />
    <Stack.Screen name="LearningDashboard" component={LearningDashboard} />
    <Stack.Screen name="InteractiveQuiz" component={InteractiveQuiz} />
    <Stack.Screen name="LearningModule" component={LearningModule} />
    <Stack.Screen name="MissionCatalog" component={MissionCatalog} />
    <Stack.Screen name="ActionVerification" component={ActionVerification} />
    <Stack.Screen name="MissionComplete" component={MissionComplete} />
    <Stack.Screen name="RewardsDashboard" component={RewardsDashboard} />
    <Stack.Screen name="RewardMarketplace" component={RewardMarketplace} />
    <Stack.Screen name="EnvironmentalImpact" component={EnvironmentalImpact} />
    <Stack.Screen name="SocialFeed" component={SocialFeed} />
    <Stack.Screen name="GroupChallenges" component={GroupChallenges} />
    <Stack.Screen name="MyGroups" component={MyGroups} />
    <Stack.Screen name="ForgotPassword" component={require('./src/screens/auth/ForgotPasswordScreen').default} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
  </Stack.Navigator>
);

// App Content
const AppContent = () => {
  const { isLoading } = useAppContext();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0f172a" }}>
        <Text style={{ color: "#fff", fontSize: 18 }}>Loading...</Text>
      </View>
    );
  }

  return <MainStack />;
};

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <StatusBar style="light" backgroundColor="#0a0a0a" />
        <AppContent />
      </NavigationContainer>
    </AppProvider>
  );
}