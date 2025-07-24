"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { BlurView } from "expo-blur"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { useAppContext } from "../../../App"

const MissionCatalog = () => {
  const navigation = useNavigation()
  const { isDarkMode } = useAppContext()
  const [selectedFilter, setSelectedFilter] = useState("All")
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  const filters = ["All", "Daily Life", "Food", "Transport"]

  const missions = [
    {
      id: 1,
      title: "Use Reusable Cup",
      description: "Take a photo with your reusable cup at a café",
      points: 15,
      difficulty: "Easy",
      duration: "5 min",
      category: "Daily Life",
      icon: "cafe",
      color: "#10b981",
    },
    {
      id: 2,
      title: "Public Transport",
      description: "Use public transport instead of car today",
      points: 25,
      difficulty: "Medium",
      duration: "30 min",
      category: "Transport",
      icon: "bus",
      color: "#3b82f6",
    },
    {
      id: 3,
      title: "Zero Waste Shopping",
      description: "Shop with zero packaging waste",
      points: 50,
      difficulty: "Hard",
      duration: "60 min",
      category: "Daily Life",
      icon: "bag",
      color: "#f59e0b",
    },
  ]

  const bgColors = isDarkMode ? ["#0f172a", "#1e293b", "#334155"] : ["#f8fafc", "#e2e8f0", "#cbd5e1"]
  const cardColors = isDarkMode ? ["#374151", "#1f2937"] : ["#ffffff", "#f1f5f9"]

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "#10b981"
      case "Medium":
        return "#f59e0b"
      case "Hard":
        return "#ef4444"
      default:
        return "#6b7280"
    }
  }

  const filteredMissions =
    selectedFilter === "All" ? missions : missions.filter((mission) => mission.category === selectedFilter)

  const handleMissionPress = (mission) => {
    navigation.navigate("ActionVerification", { mission })
  }

  return (
    <LinearGradient colors={bgColors} style={styles.container}>
      {/* Filter Modal */}
      <Modal visible={filterModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.filterModalContent}>
            <Text style={styles.filterModalTitle}>Select Category</Text>
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[styles.filterModalOption, selectedFilter === filter && styles.activeFilterChip]}
                onPress={() => { setSelectedFilter(filter); setFilterModalVisible(false); }}
              >
                <Text style={[styles.filterText, selectedFilter === filter && styles.activeFilterText]}>{filter}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.closeFilterBtn} onPress={() => setFilterModalVisible(false)}>
              <Text style={styles.closeFilterText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={isDarkMode ? "white" : "#1f2937"} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: isDarkMode ? "white" : "#1f2937" }]}>Mission Catalog</Text>
          <TouchableOpacity style={styles.filterButton} onPress={() => setFilterModalVisible(true)}>
            <Ionicons name="filter" size={24} color={isDarkMode ? "white" : "#1f2937"} />
          </TouchableOpacity>
        </View>

        {/* Filters */}
        <View style={styles.filtersContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll}>
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[styles.filterChip, selectedFilter === filter && styles.activeFilterChip]}
                onPress={() => setSelectedFilter(filter)}
              >
                <Text style={[styles.filterText, selectedFilter === filter && styles.activeFilterText]}>{filter}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Eco Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? "white" : "#1f2937" }]}>Eco Actions</Text>
          {filteredMissions.map((mission) => (
            <TouchableOpacity key={mission.id} style={styles.missionCard} onPress={() => handleMissionPress(mission)}>
              <BlurView intensity={20} style={styles.missionBlur}>
                <LinearGradient colors={[`${mission.color}20`, `${mission.color}10`]} style={styles.missionGradient}>
                  <View style={styles.missionHeader}>
                    <View style={[styles.missionIcon, { backgroundColor: mission.color }]}>
                      <Ionicons name={mission.icon} size={24} color="white" />
                    </View>
                    <View style={styles.missionInfo}>
                      <Text style={[styles.missionTitle, { color: isDarkMode ? "white" : "#1f2937" }]}>
                        {mission.title}
                      </Text>
                      <Text style={styles.missionDescription}>{mission.description}</Text>
                    </View>
                    <View style={styles.missionRewards}>
                      <Text style={styles.missionPoints}>+{mission.points}</Text>
                    </View>
                  </View>
                  <View style={styles.missionFooter}>
                    <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(mission.difficulty) }]}>
                      <Text style={styles.difficultyText}>{mission.difficulty}</Text>
                    </View>
                    <Text style={styles.durationText}>{mission.duration}</Text>
                  </View>
                </LinearGradient>
              </BlurView>
            </TouchableOpacity>
          ))}
        </View>

        {/* Start Mission Button */}
        {/* The start button is now sticky at the bottom */}
      </ScrollView>
      {/* Sticky Start Mission Button */}
      <View style={styles.stickyButtonContainer}>
        <TouchableOpacity style={styles.startButton}>
          <LinearGradient colors={["#10b981", "#059669"]} style={styles.startButtonGradient}>
            <Text style={styles.startButtonText}>Start Mission</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    marginBottom: 30,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#374151",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#374151",
    alignItems: "center",
    justifyContent: "center",
  },
  filtersContainer: {
    marginBottom: 30,
  },
  filtersScroll: {
    paddingLeft: 30,
  },
  filterChip: {
    backgroundColor: "#374151",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  activeFilterChip: {
    backgroundColor: "#10b981",
  },
  filterText: {
    color: "#9ca3af",
    fontSize: 14,
    fontWeight: "500",
  },
  activeFilterText: {
    color: "white",
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 30,
    marginBottom: 15,
  },
  missionCard: {
    marginHorizontal: 30,
    marginBottom: 15,
    borderRadius: 15,
    overflow: "hidden",
  },
  missionBlur: {
    flex: 1,
  },
  missionGradient: {
    padding: 20,
  },
  missionHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  missionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  missionInfo: {
    flex: 1,
  },
  missionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  missionDescription: {
    fontSize: 14,
    color: "#9ca3af",
    lineHeight: 20,
  },
  missionRewards: {
    backgroundColor: "#10b981",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  missionPoints: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  missionFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  difficultyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  durationText: {
    fontSize: 14,
    color: "#9ca3af",
  },
  startButton: {
    marginHorizontal: 30,
    marginBottom: 30,
    borderRadius: 15,
    overflow: "hidden",
  },
  startButtonGradient: {
    paddingVertical: 18,
    alignItems: "center",
  },
  startButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  filterModalContent: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    width: 300,
  },
  filterModalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1f2937",
  },
  filterModalOption: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 10,
    backgroundColor: "#f1f5f9",
    width: 220,
    alignItems: "center",
  },
  closeFilterBtn: {
    marginTop: 10,
    padding: 10,
  },
  closeFilterText: {
    color: "#ef4444",
    fontWeight: "bold",
    fontSize: 16,
  },
  stickyButtonContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingVertical: 10,
    alignItems: "center",
    zIndex: 10,
  },
})

export default MissionCatalog
