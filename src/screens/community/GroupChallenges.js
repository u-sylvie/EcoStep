"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"
import { useAppContext } from "../../../App"

const GroupChallenges = ({ navigation }) => {
  const { isDarkMode } = useAppContext()
  const [selectedTab, setSelectedTab] = useState("Active")

  const activeChallenges = [
    {
      id: 1,
      title: "Plastic-Free Week",
      description: "Avoid single-use plastics for 7 days",
      participants: 156,
      daysLeft: 3,
      progress: 75,
      reward: 200,
      difficulty: "Medium",
      category: "Waste Reduction",
      joined: true,
    },
    {
      id: 2,
      title: "Walk to Work Challenge",
      description: "Walk or bike to work for 5 days",
      participants: 89,
      daysLeft: 5,
      progress: 60,
      reward: 150,
      difficulty: "Easy",
      category: "Transportation",
      joined: true,
    },
    {
      id: 3,
      title: "Zero Food Waste",
      description: "Complete meals without wasting food",
      participants: 234,
      daysLeft: 7,
      progress: 0,
      reward: 300,
      difficulty: "Hard",
      category: "Food",
      joined: false,
    },
  ]

  const upcomingChallenges = [
    {
      id: 4,
      title: "Energy Saving Month",
      description: "Reduce energy consumption by 20%",
      participants: 0,
      startsIn: 5,
      reward: 500,
      difficulty: "Medium",
      category: "Energy",
    },
    {
      id: 5,
      title: "Local Food Challenge",
      description: "Eat only locally sourced food for 2 weeks",
      participants: 0,
      startsIn: 10,
      reward: 250,
      difficulty: "Hard",
      category: "Food",
    },
  ]

  const completedChallenges = [
    {
      id: 6,
      title: "Water Conservation",
      description: "Reduce water usage by 30%",
      participants: 178,
      completed: true,
      reward: 180,
      earnedPoints: 180,
    },
    {
      id: 7,
      title: "Meatless Monday",
      description: "Go vegetarian every Monday for a month",
      participants: 145,
      completed: true,
      reward: 120,
      earnedPoints: 120,
    },
  ]

  const handleJoinChallenge = (challenge) => {
    Alert.alert("Join Challenge", `Are you sure you want to join "${challenge.title}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Join",
        onPress: () => {
          Alert.alert("Success!", "You have joined the challenge!")
        },
      },
    ])
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "#22c55e"
      case "Medium":
        return "#f59e0b"
      case "Hard":
        return "#ef4444"
      default:
        return "#6b7280"
    }
  }

  const renderChallenge = (challenge, type) => (
    <View key={challenge.id} style={[styles.challengeCard, { backgroundColor: isDarkMode ? "#1e293b" : "white" }]}>
      <View style={styles.challengeHeader}>
        <View style={styles.challengeInfo}>
          <Text style={[styles.challengeTitle, { color: isDarkMode ? "white" : "black" }]}>{challenge.title}</Text>
          <Text style={[styles.challengeDescription, { color: isDarkMode ? "#9ca3af" : "#6b7280" }]}>
            {challenge.description}
          </Text>
        </View>
        <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(challenge.difficulty) }]}>
          <Text style={styles.difficultyText}>{challenge.difficulty}</Text>
        </View>
      </View>

      <View style={styles.challengeStats}>
        <View style={styles.statItem}>
          <Ionicons name="people" size={16} color="#10b981" />
          <Text style={[styles.statText, { color: isDarkMode ? "#9ca3af" : "#6b7280" }]}>
            {challenge.participants} participants
          </Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="trophy" size={16} color="#f59e0b" />
          <Text style={[styles.statText, { color: isDarkMode ? "#9ca3af" : "#6b7280" }]}>
            {challenge.reward} points
          </Text>
        </View>
      </View>

      {type === "active" && challenge.joined && (
        <View style={styles.progressContainer}>
          <View style={styles.progressHeader}>
            <Text style={[styles.progressLabel, { color: isDarkMode ? "white" : "black" }]}>Progress</Text>
            <Text style={[styles.progressPercent, { color: "#10b981" }]}>{challenge.progress}%</Text>
          </View>
          <View style={[styles.progressBar, { backgroundColor: isDarkMode ? "#374151" : "#e5e7eb" }]}>
            <View style={[styles.progressFill, { width: `${challenge.progress}%` }]} />
          </View>
          <Text style={[styles.daysLeft, { color: isDarkMode ? "#9ca3af" : "#6b7280" }]}>
            {challenge.daysLeft} days left
          </Text>
        </View>
      )}

      {type === "upcoming" && (
        <Text style={[styles.startsIn, { color: isDarkMode ? "#9ca3af" : "#6b7280" }]}>
          Starts in {challenge.startsIn} days
        </Text>
      )}

      {type === "completed" && (
        <View style={styles.completedInfo}>
          <View style={styles.completedBadge}>
            <Ionicons name="checkmark-circle" size={20} color="#22c55e" />
            <Text style={[styles.completedText, { color: "#22c55e" }]}>Completed</Text>
          </View>
          <Text style={[styles.earnedPoints, { color: "#10b981" }]}>+{challenge.earnedPoints} points earned</Text>
        </View>
      )}

      <View style={styles.challengeActions}>
        {type === "active" && !challenge.joined && (
          <TouchableOpacity style={styles.joinButton} onPress={() => handleJoinChallenge(challenge)}>
            <LinearGradient colors={["#10b981", "#059669"]} style={styles.buttonGradient}>
              <Text style={styles.buttonText}>Join Challenge</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
        {type === "active" && challenge.joined && (
          <TouchableOpacity style={styles.viewButton}>
            <Text style={[styles.viewButtonText, { color: "#10b981" }]}>View Progress</Text>
          </TouchableOpacity>
        )}
        {type === "upcoming" && (
          <TouchableOpacity style={styles.notifyButton}>
            <Text style={[styles.notifyButtonText, { color: "#3b82f6" }]}>Notify Me</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? "#0f172a" : "#f8fafc" }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={isDarkMode ? "white" : "black"} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDarkMode ? "white" : "black" }]}>Group Challenges</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search-outline" size={24} color={isDarkMode ? "white" : "black"} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {["Active", "Upcoming", "Completed"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              {
                backgroundColor: selectedTab === tab ? "#10b981" : isDarkMode ? "#1e293b" : "white",
              },
            ]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color: selectedTab === tab ? "white" : isDarkMode ? "white" : "black",
                },
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {selectedTab === "Active" && activeChallenges.map((challenge) => renderChallenge(challenge, "active"))}
        {selectedTab === "Upcoming" && upcomingChallenges.map((challenge) => renderChallenge(challenge, "upcoming"))}
        {selectedTab === "Completed" && completedChallenges.map((challenge) => renderChallenge(challenge, "completed"))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  searchButton: {
    padding: 8,
  },
  tabsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 25,
    alignItems: "center",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  challengeCard: {
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  challengeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  challengeInfo: {
    flex: 1,
    marginRight: 10,
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  challengeDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  challengeStats: {
    flexDirection: "row",
    marginBottom: 15,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  statText: {
    marginLeft: 5,
    fontSize: 14,
  },
  progressContainer: {
    marginBottom: 15,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
  progressPercent: {
    fontSize: 14,
    fontWeight: "bold",
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    marginBottom: 5,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#10b981",
    borderRadius: 3,
  },
  daysLeft: {
    fontSize: 12,
  },
  startsIn: {
    fontSize: 14,
    marginBottom: 15,
  },
  completedInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  completedBadge: {
    flexDirection: "row",
    alignItems: "center",
  },
  completedText: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: "600",
  },
  earnedPoints: {
    fontSize: 14,
    fontWeight: "bold",
  },
  challengeActions: {
    alignItems: "center",
  },
  joinButton: {
    width: "100%",
    borderRadius: 25,
    overflow: "hidden",
  },
  buttonGradient: {
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  viewButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#10b981",
  },
  viewButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  notifyButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#3b82f6",
  },
  notifyButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
})

export default GroupChallenges
