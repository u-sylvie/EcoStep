"use client";

import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useAppContext } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { BlurView } from "expo-blur";

const HomeScreen = () => {
  const { user, isDarkMode, ecoPoints } = useAppContext();
  const navigation = useNavigation();

  const homeSections = [
    { title: "Eco Intelligence", icon: "bulb-outline", screen: "Intelligence" },
    { title: "Eco Actions", icon: "flash-outline", screen: "Action" },
    { title: "Eco Rewards", icon: "trophy-outline", screen: "Rewards" },
    { title: "Eco Community", icon: "people-outline", screen: "Community" },
  ];

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? "#0f172a" : "#f8fafc" }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Header with Profile Avatar */}
        <View style={styles.headerRow}>
          <View style={styles.headerTextContainer}>
            <Text style={[styles.title, { color: isDarkMode ? "#fff" : "#1f2937" }]}>Welcome, {user?.name || "Guest"}! 🌱</Text>
            <Text style={[styles.subtitle, { color: isDarkMode ? "#9ca3af" : "#6b7280" }]}>Your eco journey starts here</Text>
          </View>
          <TouchableOpacity style={styles.lockButton} onPress={() => navigation.navigate("EcoLockScreen")}>
            <BlurView intensity={30} style={styles.lockBlur} tint={isDarkMode ? "dark" : "light"}>
              <Ionicons name="lock-closed-outline" size={24} color={isDarkMode ? "#fff" : "#1f2937"} />
            </BlurView>
          </TouchableOpacity>
          <TouchableOpacity style={styles.avatarButton} onPress={() => navigation.navigate("Profile")}> 
            <BlurView intensity={30} style={styles.avatarBlur} tint={isDarkMode ? "dark" : "light"}>
              <Ionicons name="person-circle-outline" size={40} color={isDarkMode ? "#fff" : "#1f2937"} />
            </BlurView>
          </TouchableOpacity>
        </View>

        {/* Eco Points */}
        <View style={[styles.pointsContainer, {backgroundColor : isDarkMode ? "rgba(55,65,81,0.4)" : "#f1f5f9" }]}>
          <Ionicons name="pricetags-outline" size={24} color="#10b981" style={styles.pointsIcon} />
          <Text style={[styles.pointsLabel, { color : isDarkMode ? "white" : "black"}]}>Eco Points</Text>
          <Text style={styles.pointsValue}>{ecoPoints.toLocaleString()}</Text>
        </View>

        {/* Home Sections */}
        <View style={styles.sectionsContainer}>
          {homeSections.map((section, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.sectionCard, { backgroundColor: isDarkMode ? "#1e293b" : "white" }]}
              onPress={() => navigation.navigate(section.screen)}
              activeOpacity={0.85}
            >
              <View style={styles.sectionBlur} tint={isDarkMode ? "dark" : "light"}>
                <Ionicons name={section.icon} size={30} color="#4ade80" style={styles.sectionIcon} />
                <Text style={[styles.sectionTitle, {color: isDarkMode ? "#fff" : "#000"}]}>{section.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickActionButton} onPress={() => navigation.navigate("Quiz")}> 
            <View style={[styles.quickActionBlur, { backgroundColor: isDarkMode ? "#1e293b" : "white" } ]}>
              <Ionicons name="help-circle" size={24} color="#f59e0b" style={styles.quickActionIcon} />
              <Text style={[styles.quickActionText, { color: isDarkMode ? "#fff" : "#000000ff" }]}>Take a Quiz</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickActionButton} onPress={() => navigation.navigate("MissionCatalog")}> 
            <View style={[styles.quickActionBlur, { backgroundColor: isDarkMode ? "#1e293b" : "white" }]}>
              <Ionicons name="list" size={24} color="#10b981" style={styles.quickActionIcon} />
              <Text style={[styles.quickActionText, { color: isDarkMode ? "#fff" : "#000" }]}>View Missions</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* Quick Actions */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { flex: 1, padding: 20, paddingTop: 60 },
  headerRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 30 },
  headerTextContainer: { flex: 1 },
  avatarButton: { marginLeft: 15, borderRadius: 25, overflow: "hidden" },
  avatarBlur: { width: 50, height: 50, borderRadius: 25, alignItems: "center", justifyContent: "center" },
  avatarText: { fontSize: 28 },
  title: { fontSize: 28, fontWeight: "bold", textAlign: "left" },
  subtitle: { fontSize: 16, textAlign: "left", marginTop: 5 },
  pointsContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "rgba(55,65,81,0.4)", padding: 15, borderRadius: 15, marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  pointsIcon: { marginRight: 10 },
  pointsLabel: { fontSize: 16, color: "#fff", marginRight: 10, flex: 1 },
  pointsValue: { fontSize: 20, fontWeight: "bold", color: "#10b981" },
  sectionsContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginBottom: 20 },
  sectionCard: { width: "48%",
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
   },
  sectionBlur: { flex: 1, alignItems: "center", padding: 15 },
  sectionIcon: { marginBottom: 10 },
  sectionTitle: { fontSize: 16, color: "#1f2937", textAlign: "center" },
  quickActions: {
    flexDirection: "row",
    flexWrap: "wrap",  
    justifyContent: "space-between",
    width: "48%",
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
   },
  quickActionButton: { width: "48%", borderRadius: 15, overflow: "hidden" },
  quickActionBlur: { flex: 1, alignItems: "center", padding: 15 },
  quickActionIcon: { marginBottom: 5 },
  quickActionText: { fontSize: 14, color: "#1f2937", textAlign: "center" },
  lockButton: { marginLeft: 15, borderRadius: 25, overflow: "hidden" },
  lockBlur: { width: 50, height: 50, borderRadius: 25, alignItems: "center", justifyContent: "center" },
});

export default HomeScreen;