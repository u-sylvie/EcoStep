"use client";

import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useAppContext } from "../../App";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const { user, isDarkMode, ecoPoints } = useAppContext();
  const navigation = useNavigation();

  const homeSections = [
    { title: "Eco Intelligence", icon: "bulb", screen: "Intelligence" },
    { title: "Eco Actions", icon: "leaf", screen: "Action" },
    { title: "Eco Rewards", icon: "trophy", screen: "Rewards" },
    { title: "Eco Community", icon: "people", screen: "Community" },
  ];

  return (
    <LinearGradient colors={["#0f172a", "#1e293b", "#334155"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: isDarkMode ? "#fff" : "#1f2937" }]}>
            Welcome, {user?.name || "Guest"}! 🌱
          </Text>
          <Text style={[styles.subtitle, { color: isDarkMode ? "#9ca3af" : "#6b7280" }]}>
            Your eco journey starts here
          </Text>
        </View>

        {/* Eco Points */}
        <View style={styles.pointsContainer}>
          <Ionicons name="leaf" size={24} color="#10b981" />
          <Text style={styles.pointsLabel}>Eco Points</Text>
          <Text style={styles.pointsValue}>{ecoPoints.toLocaleString()}</Text>
        </View>

        {/* Home Sections */}
        <View style={styles.sectionsContainer}>
          {homeSections.map((section, index) => (
            <TouchableOpacity
              key={index}
              style={styles.sectionCard}
              onPress={() => navigation.navigate(section.screen)}
            >
              <Ionicons name={section.icon} size={30} color="#4ade80" />
              <Text style={styles.sectionTitle}>{section.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickActionButton} onPress={() => navigation.navigate("Quiz")}>
            <Ionicons name="help-circle" size={24} color="#f59e0b" />
            <Text style={styles.quickActionText}>Take a Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionButton} onPress={() => navigation.navigate("MissionCatalog")}>
            <Ionicons name="list" size={24} color="#10b981" />
            <Text style={styles.quickActionText}>View Missions</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { padding: 20, paddingTop: 60 },
  header: { alignItems: "center", marginBottom: 30 },
  title: { fontSize: 28, fontWeight: "bold", textAlign: "center" },
  subtitle: { fontSize: 16, textAlign: "center", marginTop: 5 },
  pointsContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#374151",
    padding: 15,
    borderRadius: 15,
    marginBottom: 30,
  },
  pointsLabel: { fontSize: 16, color: "#fff", marginLeft: 10, flex: 1 },
  pointsValue: { fontSize: 20, fontWeight: "bold", color: "#10b981" },
  sectionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  sectionCard: {
    width: "48%",
    backgroundColor: "#374151",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: { fontSize: 16, color: "#fff", textAlign: "center", marginTop: 10 },
  quickActions: { flexDirection: "row", justifyContent: "space-between" },
  quickActionButton: {
    backgroundColor: "#374151",
    padding: 15,
    borderRadius: 15,
    width: "48%",
    alignItems: "center",
  },
  quickActionText: { fontSize: 14, color: "#fff", marginTop: 5, textAlign: "center" },
});

export default HomeScreen;