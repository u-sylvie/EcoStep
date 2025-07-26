"use client"

import { useEffect, useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, TextInput, KeyboardAvoidingView, Platform, Alert } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { BlurView } from "expo-blur"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { useAppContext } from "../../../App"

const MissionComplete = ({ route }) => {
  const navigation = useNavigation()
  const { isDarkMode, ecoPoints, updateEcoPoints, toggleTheme } = useAppContext()
  const { mission } = route.params || {}
  const [comment, setComment] = useState("")
  const [commentSaved, setCommentSaved] = useState(false)
  const [photoTaken, setPhotoTaken] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [location, setLocation] = useState("Seoul, South Korea") // Simulated location

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

  const handleTakePhoto = async () => {
    setIsProcessing(true);
    setTimeout(() => {
      setPhotoTaken(true);
      setIsProcessing(false);
      Alert.alert("Photo Captured", "Your photo has been successfully captured.", [{ text: "OK" }]);
    }, 1200);
  }

  return (
    <LinearGradient colors={bgColors} style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={isDarkMode ? "white" : "#1f2937"} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: isDarkMode ? "white" : "#1f2937" }]}>Mission Complete</Text>
          <View style={styles.headerIconsRow}>
            <TouchableOpacity onPress={toggleTheme} style={styles.themeButton}>
              <Ionicons name={isDarkMode ? "sunny" : "moon"} size={24} color={isDarkMode ? "#fbbf24" : "#6366f1"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Alert.alert("Notifications", "No new notifications.")} style={styles.notificationButton}>
              <Ionicons name="notifications-outline" size={24} color={isDarkMode ? "white" : "#1f2937"} />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView contentContainerStyle={styles.content}>
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

          {/* Photo, Location, Comment */}
          <BlurView intensity={15} style={styles.extraCard}>
            <LinearGradient colors={cardColors} style={styles.extraGradient}>
              <View style={styles.extraRow}>
                <TouchableOpacity style={styles.photoButton} onPress={handleTakePhoto} disabled={isProcessing || photoTaken}>
                  <Ionicons name={photoTaken ? "checkmark-circle" : "camera"} size={24} color={photoTaken ? "#10b981" : isDarkMode ? "white" : "#1f2937"} />
                  <Text style={[styles.photoButtonText, { color: isDarkMode ? "white" : "#1f2937" }]}>{photoTaken ? "Photo Taken" : isProcessing ? "Processing..." : "Take Photo"}</Text>
                </TouchableOpacity>
                <View style={styles.locationRow}>
                  <Ionicons name="location" size={20} color="#3b82f6" />
                  <Text style={[styles.locationText, { color: isDarkMode ? "white" : "#1f2937" }]}>{location}</Text>
                </View>
              </View>
              <View style={styles.commentRow}>
                <Ionicons name="chatbubble-ellipses-outline" size={20} color={isDarkMode ? "white" : "#1f2937"} />
                <TextInput
                  style={[styles.commentInput, { color: isDarkMode ? "white" : "#1f2937", borderColor: isDarkMode ? "#374151" : "#e5e7eb" }]}
                  placeholder="Add a comment..."
                  placeholderTextColor={isDarkMode ? "#9ca3af" : "#6b7280"}
                  value={comment}
                  onChangeText={text => { setComment(text); setCommentSaved(false); }}
                  multiline
                />
                <TouchableOpacity
                  style={[styles.saveCommentButton, commentSaved && styles.saveCommentButtonSaved]}
                  onPress={() => setCommentSaved(true)}
                >
                  <Text style={[styles.saveCommentText, commentSaved && styles.saveCommentTextSaved]}>{commentSaved ? "Saved" : "Save"}</Text>
                </TouchableOpacity>
              </View>
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
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: "transparent",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  backButton: {
    padding: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  headerIcons: {
    flexDirection: "row",
    gap: 20,
  },
  headerIconsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  notificationButton: {
    marginLeft: 0,
    padding: 10,
  },
  themeButton: {
    padding: 10,
  },
  content: {
    flexGrow: 1,
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
  extraCard: {
    width: "100%",
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 30,
  },
  extraGradient: {
    padding: 20,
  },
  extraRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  photoButton: {
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },
  photoButtonText: {
    fontSize: 14,
    marginTop: 5,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  locationText: {
    fontSize: 14,
    marginLeft: 5,
  },
  commentRow: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  commentInput: {
    fontSize: 16,
    paddingVertical: 0,
    minHeight: 50,
    textAlignVertical: "top",
    flex: 1,
  },
  saveCommentButton: {
    marginLeft: 10,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#10b981",
  },
  saveCommentButtonSaved: {
    backgroundColor: "#059669",
  },
  saveCommentText: {
    color: "white",
    fontWeight: "bold",
  },
  saveCommentTextSaved: {
    color: "#fff",
    fontWeight: "bold",
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

