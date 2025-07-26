"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { BlurView } from "expo-blur"
import { Ionicons } from "@expo/vector-icons"
import { useAppContext } from "../../App"

const ChallengeDetailsScreen = ({ navigation, route }) => {
  const { challenge } = route.params
  const { isDarkMode, user, ecoPoints, updateEcoPoints } = useAppContext()
  const [isJoined, setIsJoined] = useState(false)

  const bgColors = isDarkMode ? ["#0f172a", "#1e293b", "#334155"] : ["#f8fafc", "#e2e8f0", "#cbd5e1"]
  const cardColors = isDarkMode ? ["#374151", "#1f2937"] : ["#ffffff", "#f1f5f9"]

  const handleJoinChallenge = () => {
    if (isJoined) {
      Alert.alert("Already Joined", "You're already participating in this challenge!")
      return
      Alert.alert("Already Joined", "You're already participating in this challenge!")
      return
    }

    setIsJoined(true)
    Alert.alert(
      "Challenge Joined! 🎉",
      `You've successfully joined "${challenge.title}". Good luck achieving your eco goals!`,
      [{ text: "Let's Go!", onPress: () => navigation.goBack() }],
    )
  }

  const participants = [
    { id: 1, name: "EcoWarrior23", avatar: "🌱", progress: 85 },
    { id: 2, name: "GreenThumb", avatar: "🌿", progress: 72 },
    { id: 3, name: "ClimateChampion", avatar: "♻️", progress: 90 },
    { id: 4, name: "You", avatar: user?.avatar || "🌟", progress: isJoined ? 45 : 0 },
  ]

  const tips = [
    "Start small - even 5 minutes of eco-action daily makes a difference",
    "Share your progress with friends for motivation",
    "Document your journey with photos",
    "Connect with other participants for support",
  ]

  return (
    <LinearGradient colors={bgColors} style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={isDarkMode ? "white" : "#1f2937"} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: isDarkMode ? "white" : "#1f2937" }]}>Challenge Details</Text>
          <TouchableOpacity style={styles.shareButton}>
            <Ionicons name="share-outline" size={24} color={isDarkMode ? "white" : "#1f2937"} />
          </TouchableOpacity>
        </View>

        {/* Challenge Info */}
        <BlurView intensity={20} style={styles.challengeCard}>
          <LinearGradient colors={[`${challenge.color}20`, `${challenge.color}10`]} style={styles.challengeGradient}>
            <View style={[styles.challengeIcon, { backgroundColor: challenge.color }]}>
              <Ionicons name={challenge.icon} size={32} color="white" />
            </View>
            <Text style={[styles.challengeTitle, { color: isDarkMode ? "white" : "#1f2937" }]}>{challenge.title}</Text>
            <Text style={styles.challengeDescription}>{challenge.description}</Text>

            <View style={styles.challengeStats}>
              <View style={styles.statItem}>
                <Ionicons name="people" size={20} color={challenge.color} />
                <Text style={[styles.statText, { color: isDarkMode ? "white" : "#1f2937" }]}>
                  {challenge.participants} joined
                </Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="time" size={20} color={challenge.color} />
                <Text style={[styles.statText, { color: isDarkMode ? "white" : "#1f2937" }]}>
                  {challenge.daysLeft} days left
                </Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="trophy" size={20} color={challenge.color} />
                <Text style={[styles.statText, { color: isDarkMode ? "white" : "#1f2937" }]}>
                  +{challenge.reward} points
                </Text>
              </View>
            </View>
          </LinearGradient>
        </BlurView>

        {/* Progress */}
        {isJoined && (
          <BlurView intensity={20} style={styles.progressCard}>
            <LinearGradient colors={cardColors} style={styles.progressGradient}>
              <View style={styles.progressHeader}>
                <Ionicons name="trending-up" size={24} color="#10b981" />
                <Text style={[styles.progressTitle, { color: isDarkMode ? "white" : "#1f2937" }]}>Your Progress</Text>
              </View>
              <View style={styles.progressBarContainer}>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: "45%", backgroundColor: challenge.color }]} />
                </View>
                <Text style={styles.progressText}>45% Complete</Text>
              </View>
            </LinearGradient>
          </BlurView>
        )}

        {/* Leaderboard */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? "white" : "#1f2937" }]}>Participants</Text>
          {participants.map((participant, index) => (
            <BlurView key={participant.id} intensity={15} style={styles.participantCard}>
              <LinearGradient colors={cardColors} style={styles.participantGradient}>
                <View style={styles.participantRank}>
                  <Text style={[styles.rankNumber, { color: isDarkMode ? "white" : "#1f2937" }]}>#{index + 1}</Text>
                </View>
                <Text style={styles.participantAvatar}>{participant.avatar}</Text>
                <View style={styles.participantInfo}>
                  <Text style={[styles.participantName, { color: isDarkMode ? "white" : "#1f2937" }]}>
                    {participant.name}
                  </Text>
                  <View style={styles.participantProgressBar}>
                    <View style={[styles.participantProgressFill, { width: `${participant.progress}%` }]} />
                  </View>
                </View>
                <Text style={styles.participantProgress}>{participant.progress}%</Text>
              </LinearGradient>
            </BlurView>
          ))}
        </View>

        {/* Tips */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? "white" : "#1f2937" }]}>Tips for Success</Text>
          {tips.map((tip, index) => (
            <BlurView key={index} intensity={15} style={styles.tipCard}>
              <LinearGradient colors={cardColors} style={styles.tipGradient}>
                <Ionicons name="bulb" size={20} color="#f59e0b" />
                <Text style={[styles.tipText, { color: isDarkMode ? "white" : "#1f2937" }]}>{tip}</Text>
              </LinearGradient>
            </BlurView>
          ))}
        </View>

        {/* Join Button */}
        <TouchableOpacity style={styles.joinButton} onPress={handleJoinChallenge}>
          <LinearGradient
            colors={isJoined ? ["#6b7280", "#4b5563"] : [challenge.color, challenge.color]}
            style={styles.joinButtonGradient}
          >
            <Text style={styles.joinButtonText}>{isJoined ? "Already Joined ✓" : "Join Challenge"}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
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
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#374151",
    alignItems: "center",
    justifyContent: "center",
  },
  challengeCard: {
    marginHorizontal: 30,
    marginBottom: 30,
    borderRadius: 20,
    overflow: "hidden",
  },
  challengeGradient: {
    padding: 30,
    alignItems: "center",
  },
  challengeIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  challengeTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  challengeDescription: {
    fontSize: 16,
    color: "#9ca3af",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 24,
  },
  challengeStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  statItem: {
    alignItems: "center",
  },
  statText: {
    fontSize: 14,
    marginTop: 5,
    fontWeight: "500",
  },
  progressCard: {
    marginHorizontal: 30,
    marginBottom: 30,
    borderRadius: 20,
    overflow: "hidden",
  },
  progressGradient: {
    padding: 20,
  },
  progressHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  progressBarContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: "#374151",
    borderRadius: 4,
    marginRight: 15,
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: "#9ca3af",
    fontWeight: "bold",
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
  participantCard: {
    marginHorizontal: 30,
    marginBottom: 10,
    borderRadius: 15,
    overflow: "hidden",
  },
  participantGradient: {
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  participantRank: {
    width: 30,
    alignItems: "center",
  },
  rankNumber: {
    fontSize: 16,
    fontWeight: "bold",
  },
  participantAvatar: {
    fontSize: 24,
    marginHorizontal: 15,
  },
  participantInfo: {
    flex: 1,
  },
  participantName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  participantProgressBar: {
    height: 4,
    backgroundColor: "#374151",
    borderRadius: 2,
  },
  participantProgressFill: {
    height: "100%",
    backgroundColor: "#10b981",
    borderRadius: 2,
  },
  participantProgress: {
    fontSize: 14,
    color: "#10b981",
    fontWeight: "bold",
    marginLeft: 15,
  },
  tipCard: {
    marginHorizontal: 30,
    marginBottom: 10,
    borderRadius: 15,
    overflow: "hidden",
  },
  tipGradient: {
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  tipText: {
    fontSize: 14,
    marginLeft: 15,
    flex: 1,
    lineHeight: 20,
  },
  joinButton: {
    marginHorizontal: 30,
    marginBottom: 30,
    borderRadius: 15,
    overflow: "hidden",
  },
  joinButtonGradient: {
    paddingVertical: 18,
    alignItems: "center",
  },
  joinButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
})

export default ChallengeDetailsScreen
