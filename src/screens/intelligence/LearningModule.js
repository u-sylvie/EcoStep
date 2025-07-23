"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { BlurView } from "expo-blur"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { useAppContext } from "../../../App"

const LearningModule = ({ route }) => {
  const navigation = useNavigation()
  const { isDarkMode, ecoPoints, updateEcoPoints } = useAppContext()
  const { module } = route.params || {}

  const [isBookmarked, setIsBookmarked] = useState(false)

  const moduleData = {
    title: "Carbon Cycle Basics",
    readTime: "2 min read",
    points: 15,
    content: `The Carbon Cycle

The carbon cycle is nature's way of recycling carbon atoms. Carbon moves from the atmosphere to plants, to animals, and back to the atmosphere...

Key Points:
• Oceans absorb about 30% of human CO2 emissions
• Plants use carbon dioxide for photosynthesis
• Deforestation disrupts the natural carbon cycle
• Human activities have increased atmospheric CO2 by 40%

Understanding the carbon cycle helps us make better environmental decisions and reduce our carbon footprint.`,
  }

  const bgColors = isDarkMode ? ["#0f172a", "#1e293b", "#334155"] : ["#f8fafc", "#e2e8f0", "#cbd5e1"]
  const cardColors = isDarkMode ? ["#374151", "#1f2937"] : ["#ffffff", "#f1f5f9"]

  const handleCompleteModule = () => {
    updateEcoPoints(ecoPoints + moduleData.points)
    navigation.goBack()
  }

  return (
    <LinearGradient colors={bgColors} style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={isDarkMode ? "white" : "#1f2937"} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: isDarkMode ? "white" : "#1f2937" }]}>{moduleData.title}</Text>
          <TouchableOpacity style={styles.bookmarkButton} onPress={() => setIsBookmarked(!isBookmarked)}>
            <Ionicons
              name={isBookmarked ? "bookmark" : "bookmark-outline"}
              size={24}
              color={isBookmarked ? "#f59e0b" : isDarkMode ? "white" : "#1f2937"}
            />
          </TouchableOpacity>
        </View>

        {/* Interactive Diagram */}
        <BlurView intensity={20} style={styles.diagramCard}>
          <LinearGradient colors={cardColors} style={styles.diagramGradient}>
            <View style={styles.diagramHeader}>
              <Ionicons name="analytics" size={24} color="#3b82f6" />
              <Text style={[styles.diagramTitle, { color: isDarkMode ? "white" : "#1f2937" }]}>
                Interactive Diagram
              </Text>
            </View>
            <View style={styles.diagramContainer}>
              <View style={styles.carbonCycle}>
                <View style={[styles.cycleElement, { backgroundColor: "#10b981" }]}>
                  <Ionicons name="leaf" size={32} color="white" />
                  <Text style={styles.elementLabel}>Plants</Text>
                </View>
                <View style={[styles.cycleElement, { backgroundColor: "#3b82f6" }]}>
                  <Ionicons name="water" size={32} color="white" />
                  <Text style={styles.elementLabel}>Ocean</Text>
                </View>
                <View style={[styles.cycleElement, { backgroundColor: "#f59e0b" }]}>
                  <Ionicons name="cloud" size={32} color="white" />
                  <Text style={styles.elementLabel}>Atmosphere</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </BlurView>

        {/* Content */}
        <BlurView intensity={20} style={styles.contentCard}>
          <LinearGradient colors={cardColors} style={styles.contentGradient}>
            <View style={styles.contentHeader}>
              <Text style={[styles.contentTitle, { color: isDarkMode ? "white" : "#1f2937" }]}>The Carbon Cycle</Text>
              <View style={styles.readTime}>
                <Ionicons name="time" size={16} color="#9ca3af" />
                <Text style={styles.readTimeText}>{moduleData.readTime}</Text>
              </View>
            </View>
            <Text style={[styles.contentText, { color: isDarkMode ? "#d1d5db" : "#4b5563" }]}>
              {moduleData.content}
            </Text>
          </LinearGradient>
        </BlurView>

        {/* Key Point */}
        <BlurView intensity={15} style={styles.keyPointCard}>
          <LinearGradient colors={["#10b98120", "#059669"]} style={styles.keyPointGradient}>
            <View style={styles.keyPointHeader}>
              <Ionicons name="bulb" size={20} color="#10b981" />
              <Text style={styles.keyPointTitle}>Key Point</Text>
            </View>
            <Text style={styles.keyPointText}>
              Oceans absorb about 30% of human CO2 emissions, making them crucial for climate regulation.
            </Text>
          </LinearGradient>
        </BlurView>

        {/* Points Earned */}
        <BlurView intensity={15} style={styles.pointsCard}>
          <LinearGradient colors={cardColors} style={styles.pointsGradient}>
            <Ionicons name="leaf" size={24} color="#10b981" />
            <Text style={[styles.pointsText, { color: isDarkMode ? "white" : "#1f2937" }]}>
              +{moduleData.points} points
            </Text>
          </LinearGradient>
        </BlurView>

        {/* Complete Module Button */}
        <TouchableOpacity style={styles.completeButton} onPress={handleCompleteModule}>
          <LinearGradient colors={["#10b981", "#059669"]} style={styles.completeButtonGradient}>
            <Text style={styles.completeButtonText}>Complete Module</Text>
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
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  bookmarkButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#374151",
    alignItems: "center",
    justifyContent: "center",
  },
  diagramCard: {
    marginHorizontal: 30,
    marginBottom: 30,
    borderRadius: 20,
    overflow: "hidden",
  },
  diagramGradient: {
    padding: 25,
  },
  diagramHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  diagramTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  diagramContainer: {
    alignItems: "center",
  },
  carbonCycle: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  cycleElement: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  elementLabel: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 5,
  },
  contentCard: {
    marginHorizontal: 30,
    marginBottom: 30,
    borderRadius: 20,
    overflow: "hidden",
  },
  contentGradient: {
    padding: 25,
  },
  contentHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  contentTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  readTime: {
    flexDirection: "row",
    alignItems: "center",
  },
  readTimeText: {
    fontSize: 14,
    color: "#9ca3af",
    marginLeft: 5,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 26,
  },
  keyPointCard: {
    marginHorizontal: 30,
    marginBottom: 30,
    borderRadius: 15,
    overflow: "hidden",
  },
  keyPointGradient: {
    padding: 20,
  },
  keyPointHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  keyPointTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#10b981",
    marginLeft: 10,
  },
  keyPointText: {
    fontSize: 14,
    color: "#10b981",
    lineHeight: 22,
  },
  pointsCard: {
    marginHorizontal: 30,
    marginBottom: 30,
    borderRadius: 15,
    overflow: "hidden",
  },
  pointsGradient: {
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  pointsText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  completeButton: {
    marginHorizontal: 30,
    marginBottom: 30,
    borderRadius: 15,
    overflow: "hidden",
  },
  completeButtonGradient: {
    paddingVertical: 18,
    alignItems: "center",
  },
  completeButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
})

export default LearningModule
