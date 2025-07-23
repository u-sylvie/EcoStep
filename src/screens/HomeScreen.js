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
    <LinearGradient colors={isDarkMode ? ["#0f172a", "#1e293b", "#334155"] : ["#f0f9ff", "#e0f2fe", "#bae6fd"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Header with Profile Avatar */}
        <View style={styles.headerRow}>
          <View style={styles.headerTextContainer}>
            <Text style={[styles.title, { color: isDarkMode ? "#fff" : "#1f2937" }]}>Welcome, {user?.name || "Guest"}! 🌱</Text>
            <Text style={[styles.subtitle, { color: isDarkMode ? "#9ca3af" : "#6b7280" }]}>Your eco journey starts here</Text>
          </View>
          <TouchableOpacity style={styles.avatarButton} onPress={() => navigation.navigate("Profile")}> 
            <BlurView intensity={30} style={styles.avatarBlur} tint={isDarkMode ? "dark" : "light"}>
              <Ionicons name="person-circle-outline" size={40} color={isDarkMode ? "#fff" : "#1f2937"} />
            </BlurView>
          </TouchableOpacity>
        </View>

        {/* Eco Points */}
        <BlurView intensity={30} style={styles.pointsContainer} tint={isDarkMode ? "dark" : "light"}>
          <Ionicons name="pricetags-outline" size={24} color="#10b981" style={styles.pointsIcon} />
          <Text style={styles.pointsLabel}>Eco Points</Text>
          <Text style={styles.pointsValue}>{ecoPoints.toLocaleString()}</Text>
        </BlurView>

        {/* Home Sections */}
        <View style={styles.sectionsContainer}>
          {homeSections.map((section, index) => (
            <TouchableOpacity
              key={index}
              style={styles.sectionCard}
              onPress={() => navigation.navigate(section.screen)}
              activeOpacity={0.85}
            >
              <BlurView intensity={20} style={styles.sectionBlur} tint={isDarkMode ? "dark" : "light"}>
                <Ionicons name={section.icon} size={30} color="#4ade80" style={styles.sectionIcon} />
                <Text style={styles.sectionTitle}>{section.title}</Text>
              </BlurView>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickActionButton} onPress={() => navigation.navigate("Quiz")}> 
            <BlurView intensity={20} style={styles.quickActionBlur} tint={isDarkMode ? "dark" : "light"}>
              <Ionicons name="help-circle" size={24} color="#f59e0b" style={styles.quickActionIcon} />
              <Text style={styles.quickActionText}>Take a Quiz</Text>
            </BlurView>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionButton} onPress={() => navigation.navigate("MissionCatalog")}> 
            <BlurView intensity={20} style={styles.quickActionBlur} tint={isDarkMode ? "dark" : "light"}>
              <Ionicons name="list" size={24} color="#10b981" style={styles.quickActionIcon} />
              <Text style={styles.quickActionText}>View Missions</Text>
            </BlurView>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { padding: 20, paddingTop: 60 },
  headerRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 30 },
  headerTextContainer: { flex: 1 },
  avatarButton: { marginLeft: 15, borderRadius: 25, overflow: "hidden" },
  avatarBlur: { width: 50, height: 50, borderRadius: 25, alignItems: "center", justifyContent: "center" },
  avatarText: { fontSize: 28 },
  title: { fontSize: 28, fontWeight: "bold", textAlign: "left" },
  subtitle: { fontSize: 16, textAlign: "left", marginTop: 5 },
  pointsContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "rgba(55,65,81,0.4)", padding: 15, borderRadius: 15, marginBottom: 30 },
  pointsIcon: { marginRight: 10 },
  pointsLabel: { fontSize: 16, color: "#fff", marginRight: 10, flex: 1 },
  pointsValue: { fontSize: 20, fontWeight: "bold", color: "#10b981" },
  sectionsContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginBottom: 20 },
  sectionCard: { width: "48%", marginBottom: 10, borderRadius: 15, overflow: "hidden" },
  sectionBlur: { flex: 1, alignItems: "center", padding: 15 },
  sectionIcon: { marginBottom: 10 },
  sectionTitle: { fontSize: 16, color: "#fff", textAlign: "center" },
  quickActions: { flexDirection: "row", justifyContent: "space-between" },
  quickActionButton: { width: "48%", borderRadius: 15, overflow: "hidden" },
  quickActionBlur: { flex: 1, alignItems: "center", padding: 15 },
  quickActionIcon: { marginBottom: 5 },
  quickActionText: { fontSize: 14, color: "#fff", textAlign: "center" },
});

export default HomeScreen;