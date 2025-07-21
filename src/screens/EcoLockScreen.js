"use client"

import { useState, useRef, useEffect } from "react"
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Animated } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { BlurView } from "expo-blur"
import { Ionicons } from "@expo/vector-icons"
import * as Haptics from "expo-haptics"

const { width, height } = Dimensions.get("window")

const EcoLockScreen = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [currentCard, setCurrentCard] = useState(0)
  const [ecoPoints, setEcoPoints] = useState(1250)
  const scrollX = useRef(new Animated.Value(0)).current
  const scrollViewRef = useRef(null)

  const newsData = [
    {
      id: 1,
      type: "Global News",
      title: "UN Climate Summit Announces New Carbon Reduction Targets",
      summary: "World leaders commit to 50% emission cuts by 2030",
      points: 5,
      icon: "earth",
      color: "#3b82f6",
    },
    {
      id: 2,
      type: "Local News",
      title: "Seoul Launches Green Transportation Initiative",
      summary: "New electric bus network reduces city emissions by 30%",
      points: 5,
      icon: "bus",
      color: "#10b981",
    },
    {
      id: 3,
      type: "Quiz",
      title: "Daily Climate Challenge",
      summary: "How much CO2 does one tree absorb per year?",
      points: 10,
      icon: "help-circle",
      color: "#f59e0b",
    },
  ]

  const ecoTasks = [
    {
      id: 1,
      title: "Use Reusable Water Bottle",
      difficulty: "Beginner",
      points: 15,
      icon: "water",
      color: "#06b6d4",
    },
    {
      id: 2,
      title: "Take Public Transport",
      difficulty: "Intermediate",
      points: 25,
      icon: "train",
      color: "#8b5cf6",
    },
    {
      id: 3,
      title: "Zero Waste Shopping",
      difficulty: "Advanced",
      points: 50,
      icon: "bag",
      color: "#ef4444",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  }

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    })
  }

  const handleCardPress = (item) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    if (item.type === "Quiz") {
      // Handle quiz logic
      setEcoPoints((prev) => prev + item.points)
    } else {
      // Handle news reading
      setEcoPoints((prev) => prev + item.points)
    }
  }

  const handleTaskPress = (task) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    // Handle task completion
    setEcoPoints((prev) => prev + task.points)
  }

  const renderNewsCard = ({ item, index }) => {
    return (
      <TouchableOpacity key={item.id} style={styles.newsCard} onPress={() => handleCardPress(item)} activeOpacity={0.8}>
        <BlurView intensity={20} style={styles.cardBlur}>
          <LinearGradient colors={[`${item.color}20`, `${item.color}10`]} style={styles.cardGradient}>
            <View style={styles.cardHeader}>
              <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
                <Ionicons name={item.icon} size={24} color="white" />
              </View>
              <Text style={styles.cardType}>{item.type}</Text>
              <View style={styles.pointsBadge}>
                <Text style={styles.pointsText}>+{item.points}</Text>
              </View>
            </View>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSummary}>{item.summary}</Text>
          </LinearGradient>
        </BlurView>
      </TouchableOpacity>
    )
  }

  const renderTaskCard = ({ item }) => {
    return (
      <TouchableOpacity key={item.id} style={styles.taskCard} onPress={() => handleTaskPress(item)} activeOpacity={0.8}>
        <BlurView intensity={15} style={styles.taskBlur}>
          <View style={[styles.taskIconContainer, { backgroundColor: item.color }]}>
            <Ionicons name={item.icon} size={20} color="white" />
          </View>
          <View style={styles.taskContent}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text style={styles.taskDifficulty}>{item.difficulty}</Text>
          </View>
          <View style={styles.taskPoints}>
            <Text style={styles.taskPointsText}>+{item.points}</Text>
          </View>
        </BlurView>
      </TouchableOpacity>
    )
  }

  return (
    <LinearGradient colors={["#0f172a", "#1e293b", "#334155"]} style={styles.container}>
      {/* Background Pattern */}
      <View style={styles.backgroundPattern}>
        {[...Array(20)].map((_, i) => (
          <View
            key={i}
            style={[
              styles.patternDot,
              {
                left: Math.random() * width,
                top: Math.random() * height,
                opacity: Math.random() * 0.3,
              },
            ]}
          />
        ))}
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} bounces={true}>
        {/* Time and Date */}
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
          <Text style={styles.dateText}>{formatDate(currentTime)}</Text>
        </View>

        {/* Eco Points Display */}
        <BlurView intensity={30} style={styles.pointsContainer}>
          <LinearGradient colors={["#10b98120", "#059669"]} style={styles.pointsGradient}>
            <Ionicons name="leaf" size={24} color="#10b981" />
            <Text style={styles.pointsLabel}>Eco Points</Text>
            <Text style={styles.pointsValue}>{ecoPoints.toLocaleString()}</Text>
          </LinearGradient>
        </BlurView>

        {/* Daily Environmental Content */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Today's Environmental Insights</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            decelerationRate="fast"
            snapToInterval={width - 60}
            contentInsetAdjustmentBehavior="automatic"
            style={styles.newsScrollView}
          >
            {newsData.map((item, index) => renderNewsCard({ item, index }))}
          </ScrollView>
        </View>

        {/* Quick Eco Actions */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Quick Eco Actions</Text>
          <View style={styles.tasksContainer}>{ecoTasks.map((item) => renderTaskCard({ item }))}</View>
        </View>

        {/* Environmental Tip of the Day */}
        <BlurView intensity={20} style={styles.tipContainer}>
          <LinearGradient colors={["#3b82f620", "#1d4ed8"]} style={styles.tipGradient}>
            <Ionicons name="lightbulb" size={24} color="#3b82f6" />
            <Text style={styles.tipTitle}>Eco Tip of the Day</Text>
            <Text style={styles.tipText}>
              Switching to LED bulbs can reduce your energy consumption by up to 80% and last 25 times longer than
              traditional bulbs.
            </Text>
          </LinearGradient>
        </BlurView>

        {/* Weekly Challenge */}
        <BlurView intensity={20} style={styles.challengeContainer}>
          <LinearGradient colors={["#f59e0b20", "#d97706"]} style={styles.challengeGradient}>
            <View style={styles.challengeHeader}>
              <Ionicons name="trophy" size={24} color="#f59e0b" />
              <Text style={styles.challengeTitle}>Weekly Challenge</Text>
            </View>
            <Text style={styles.challengeText}>Reduce plastic usage by 50% this week</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: "65%" }]} />
            </View>
            <Text style={styles.progressText}>4/7 days completed</Text>
          </LinearGradient>
        </BlurView>
      </ScrollView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundPattern: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  patternDot: {
    position: "absolute",
    width: 2,
    height: 2,
    backgroundColor: "#4ade80",
    borderRadius: 1,
  },
  scrollView: {
    flex: 1,
    paddingTop: 60,
  },
  timeContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  timeText: {
    fontSize: 48,
    fontWeight: "200",
    color: "white",
    letterSpacing: 2,
  },
  dateText: {
    fontSize: 16,
    color: "#9ca3af",
    marginTop: 5,
  },
  pointsContainer: {
    marginHorizontal: 30,
    marginBottom: 30,
    borderRadius: 20,
    overflow: "hidden",
  },
  pointsGradient: {
    padding: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pointsLabel: {
    fontSize: 16,
    color: "white",
    flex: 1,
    marginLeft: 10,
  },
  pointsValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#10b981",
  },
  sectionContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginHorizontal: 30,
    marginBottom: 15,
  },
  newsScrollView: {
    paddingLeft: 30,
  },
  newsCard: {
    width: width - 60,
    marginRight: 15,
    borderRadius: 20,
    overflow: "hidden",
  },
  cardBlur: {
    flex: 1,
  },
  cardGradient: {
    padding: 20,
    minHeight: 150,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  cardType: {
    fontSize: 12,
    color: "#9ca3af",
    flex: 1,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  pointsBadge: {
    backgroundColor: "#10b981",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pointsText: {
    fontSize: 12,
    color: "white",
    fontWeight: "bold",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
  },
  cardSummary: {
    fontSize: 14,
    color: "#d1d5db",
    lineHeight: 20,
  },
  tasksContainer: {
    paddingHorizontal: 30,
  },
  taskCard: {
    marginBottom: 10,
    borderRadius: 15,
    overflow: "hidden",
  },
  taskBlur: {
    flex: 1,
  },
  taskIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  taskContent: {
    flex: 1,
    marginLeft: 15,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  taskDifficulty: {
    fontSize: 12,
    color: "#9ca3af",
    marginTop: 2,
  },
  taskPoints: {
    backgroundColor: "#374151",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  taskPointsText: {
    fontSize: 12,
    color: "#10b981",
    fontWeight: "bold",
  },
  tipContainer: {
    marginHorizontal: 30,
    marginBottom: 20,
    borderRadius: 20,
    overflow: "hidden",
  },
  tipGradient: {
    padding: 20,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginLeft: 10,
    marginBottom: 10,
  },
  tipText: {
    fontSize: 14,
    color: "#d1d5db",
    lineHeight: 20,
  },
  challengeContainer: {
    marginHorizontal: 30,
    marginBottom: 30,
    borderRadius: 20,
    overflow: "hidden",
  },
  challengeGradient: {
    padding: 20,
  },
  challengeHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginLeft: 10,
  },
  challengeText: {
    fontSize: 14,
    color: "#d1d5db",
    marginBottom: 15,
  },
  progressBar: {
    height: 6,
    backgroundColor: "#374151",
    borderRadius: 3,
    marginBottom: 8,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#f59e0b",
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: "#9ca3af",
  },
})

export default EcoLockScreen
