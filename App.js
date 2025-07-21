import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { StatusBar } from "expo-status-bar"
import { Ionicons } from "@expo/vector-icons"
import EcoLockScreen from "./src/screens/EcoLockScreen"
import EcoIntelligence from "./src/screens/EcoIntelligence"
import EcoAction from "./src/screens/EcoAction"
import EcoRewards from "./src/screens/EcoReward"
import EcoCommunity from "./src/screens/EcoCommunity"

const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor="#0a0a0a" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName

            if (route.name === "Lock Screen") {
              iconName = focused ? "lock-closed" : "lock-closed-outline"
            } else if (route.name === "Intelligence") {
              iconName = focused ? "bulb" : "bulb-outline"
            } else if (route.name === "Action") {
              iconName = focused ? "leaf" : "leaf-outline"
            } else if (route.name === "Rewards") {
              iconName = focused ? "trophy" : "trophy-outline"
            } else if (route.name === "Community") {
              iconName = focused ? "people" : "people-outline"
            }

            return <Ionicons name={iconName} size={size} color={color} />
          },
          tabBarActiveTintColor: "#4ade80",
          tabBarInactiveTintColor: "#6b7280",
          tabBarStyle: {
            backgroundColor: "#111827",
            borderTopColor: "#374151",
            height: 80,
            paddingBottom: 10,
            paddingTop: 10,
          },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Lock Screen" component={EcoLockScreen} />
        <Tab.Screen name="Intelligence" component={EcoIntelligence} />
        <Tab.Screen name="Action" component={EcoAction} />
        <Tab.Screen name="Rewards" component={EcoRewards} />
        <Tab.Screen name="Community" component={EcoCommunity} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
