"use client"

import { useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { BlurView } from "expo-blur"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { useAppContext } from "../../../App"

const MissionComplete = ({ route }) => {
  const navigation = useNavigation()
  const { isDarkMode, ecoPoints, updateEcoPoints } = useAppContext()
  const { mission } = route.params || {}

  const missionData = mission || {
    title: "Use Reusable Cup",
    points: 15,
    color: "#10b981",
  }

  const scaleAnim = new Animated.Value(0)
  const fadeAnim = new Animated.Value(0)

  useEffect(() => {
    // Award points
    updateEcoPoints(ecoPoints + missionData.points)

    // Animate success elements
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  const bgColors = isDarkMode ? ["#0f172a", "#1e293b", "#334155"] : ["#f8fafc", "#e2e8f0", "#cbd5e1"]
  const cardColors = isDarkMode ? ["#374151", "#1f2937"] : ["#ffffff", "#f1f5f9"]

  const handleShareAchievement = () => {
    // Share functionality would go here
    navigation.navigate("SocialFeed")
  }

  const handleNextMission = () => {
    navigation.navigate("MissionCatalog")
  }

  return (
    <LinearGradient colors={bgColors} style={styles.container}>
      <View style={styles.content}>
        {/* Success Animation */}
        <Animated.View style={[styles.successContainer, { transform: [{ scale: scaleAnim }] }]}>
          <View style={styles.successCircle}>
            <Ionicons name="checkmark" size={80} color="white" />
          </View>
        </Animated.View>

        <Animated.View style={[styles.textContainer, { opacity: fadeAnim }]}>
          <Text style={[styles.successTitle, { color: isDarkMode ? "white" : "#1f2937" }]}>Mission Complete!</Text>
          <Text style={styles.successSubtitle}>Great job using a reusable cup</Text>
        </Animated.View>

        {/* Rewards Earned */}
        <BlurView intensity={20} style={styles.rewardsCard}>
          <LinearGradient colors={cardColors} style={styles.rewardsGradient}>
            <Text style={[styles.rewardsTitle, { color: isDarkMode ? "white" : "#1f2937" }]}>Rewards Earned</Text>

            <View style={styles.rewardItem}>
              <Text style={[styles.rewardLabel, { color: isDarkMode ? "white" : "#1f2937" }]}>Base Points</Text>
              <Text style={styles.rewardValue}>15</Text>
            </View>

            <View style={styles.rewardItem}>
              <Text style={[styles.rewardLabel, { color: isDarkMode ? "white" : "#1f2937" }]}>Location Bonus</Text>
              <Text style={styles.rewardValue}>+2</Text>
            </View>

            <View style={styles.rewardItem}>
              <Text style={[styles.rewardLabel, { color: isDarkMode ? "white" : "#1f2937" }]}>First Time Bonus</Text>
              <Text style={styles.rewardValue}>+5</Text>
            </View>

            <View style={styles.totalReward}>
              <Text style={[styles.totalLabel, { color: isDarkMode ? "white" : "#1f2937" }]}>Total</Text>
              <Text style={styles.totalValue}>+{missionData.points}</Text>
            </View>
          </LinearGradient>
        </BlurView>

        {/* Environmental Impact */}
        <BlurView intensity={15} style={styles.impactCard}>
          <LinearGradient colors={["#10b98120", "#059669"]} style={styles.impactGradient}>
            <View style={styles.impactHeader}>
              <Ionicons name="leaf" size={24} color="#10b981" />
              <Text style={styles.impactTitle}>Environmental Impact</Text>
            </View>
            <Text style={styles.impactText}>Saved 1 disposable cup</Text>
            <Text style={styles.impactSubtext}>= 0.02kg CO2 reduction</Text>
          </LinearGradient>
        </BlurView>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.shareButton} onPress={handleShareAchievement}>
            <LinearGradient colors={["#10b981", "#059669"]} style={styles.shareButtonGradient}>
              <Text style={styles.shareButtonText}>Share Achievement</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.nextButton} onPress={handleNextMission}>
            <BlurView intensity={15} style={styles.nextBlur}>
              <LinearGradient colors={cardColors} style={styles.nextGradient}>
                <Text style={[styles.nextButtonText, { color: isDarkMode ? "white" : "#1f2937" }]}>Next Mission</Text>
              </LinearGradient>
            </BlurView>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 100,
    alignItems: "center",
  },
  successContainer: {
    marginBottom: 40,
  },
  successCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#10b981",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#10b981",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 20,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  successTitle: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
  },
  successSubtitle: {
    fontSize: 18,
    color: "#9ca3af",
    textAlign: "center",
  },
  rewardsCard: {
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 20,
  },
  rewardsGradient: {
    padding: 25,
  },
  rewardsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  rewardItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  rewardLabel: {
    fontSize: 16,
  },
  rewardValue: {
    fontSize: 16,
    color: "#10b981",
    fontWeight: "bold",
  },
  totalReward: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#4b5563",
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalValue: {
    fontSize: 24,
    color: "#10b981",
    fontWeight: "bold",
  },
  impactCard: {
    width: "100%",
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 30,
  },
  impactGradient: {
    padding: 20,
  },
  impactHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  impactTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#10b981",
    marginLeft: 10,
  },
  impactText: {
    fontSize: 16,
    color: "#10b981",
    fontWeight: "600",
  },
  impactSubtext: {
    fontSize: 14,
    color: "#10b981",
    opacity: 0.8,
  },
  actionButtons: {
    width: "100%",
    gap: 15,
  },
  shareButton: {
    borderRadius: 15,
    overflow: "hidden",
  },
  shareButtonGradient: {
    paddingVertical: 18,
    alignItems: "center",
  },
  shareButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  nextButton: {
    borderRadius: 15,
    overflow: "hidden",
  },
  nextBlur: {
    flex: 1,
  },
  nextGradient: {
    paddingVertical: 18,
    alignItems: "center",
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
})

export default MissionComplete
