"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { BlurView } from "expo-blur"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { useAppContext } from "../../App"

const { width } = Dimensions.get("window")

const EcoIntelligence = () => {
  const navigation = useNavigation()
  const { isDarkMode, toggleTheme } = useAppContext()
  const [selectedTopic, setSelectedTopic] = useState("climate-basics")

  const topics = [
    {
      id: "climate-basics",
      title: "Climate Science Basics",
      icon: "thermometer",
      color: "#ef4444",
      progress: 75,
      lessons: 12,
    },
    {
      id: "daily-life",
      title: "Environmental Issues in Daily Life",
      icon: "home",
      color: "#10b981",
      progress: 45,
      lessons: 8,
    },
    {
      id: "media-literacy",
      title: "Environmental Media Literacy",
      icon: "newspaper",
      color: "#3b82f6",
      progress: 30,
      lessons: 6,
    },
    {
      id: "global-policy",
      title: "Global Environmental Policy",
      icon: "globe",
      color: "#8b5cf6",
      progress: 15,
      lessons: 10,
    },
  ]

  const renderTopicCard = (topic) => (
    <TouchableOpacity
      key={topic.id}
      style={styles.topicCard}
      onPress={() => navigation.navigate("LearningDashboard")}
      activeOpacity={0.8}
    >
      <BlurView intensity={20} style={styles.topicBlur}>
        <LinearGradient colors={[`${topic.color}20`, `${topic.color}10`]} style={styles.topicGradient}>
          <View style={[styles.topicIcon, { backgroundColor: topic.color }]}>
            <Ionicons name={topic.icon} size={24} color="white" />
          </View>
          <View style={styles.topicContent}>
            <Text style={styles.topicTitle}>{topic.title}</Text>
            <Text style={styles.topicLessons}>{topic.lessons} lessons</Text>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${topic.progress}%`, backgroundColor: topic.color }]} />
              </View>
              <Text style={styles.progressText}>{topic.progress}%</Text>
            </View>
          </View>
        </LinearGradient>
      </BlurView>
    </TouchableOpacity>
  )

  const bgColors = isDarkMode ? ["#0f172a", "#1e293b", "#334155"] : ["#f8fafc", "#e2e8f0", "#cbd5e1"]
  const cardColors = isDarkMode ? ["#374151", "#1f2937"] : ["#ffffff", "#f1f5f9"]

  return (
    <LinearGradient colors={bgColors} style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header with Theme Toggle */}
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <Text style={[styles.headerTitle, { color: isDarkMode ? "white" : "#1f2937" }]}>Eco Intelligence</Text>
            <TouchableOpacity style={styles.themeToggle} onPress={toggleTheme}>
              <Ionicons name={isDarkMode ? "sunny" : "moon"} size={24} color={isDarkMode ? "#f59e0b" : "#6366f1"} />
            </TouchableOpacity>
          </View>
          <Text style={[styles.headerSubtitle, { color: isDarkMode ? "#9ca3af" : "#6b7280" }]}>
            Personalized environmental education
          </Text>
        </View>

        {/* Quick Access Cards */}
        <View style={styles.quickAccessContainer}>
          <TouchableOpacity style={styles.quickAccessCard} onPress={() => navigation.navigate("LearningDashboard")}>
            <BlurView intensity={20} style={styles.quickAccessBlur}>
              <LinearGradient colors={cardColors} style={styles.quickAccessGradient}>
                <Ionicons name="school" size={24} color="#10b981" />
                <Text style={[styles.quickAccessText, { color: isDarkMode ? "white" : "#1f2937" }]}>
                  Learning Dashboard
                </Text>
              </LinearGradient>
            </BlurView>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickAccessCard} onPress={() => navigation.navigate("InteractiveQuiz")}>
            <BlurView intensity={20} style={styles.quickAccessBlur}>
              <LinearGradient colors={cardColors} style={styles.quickAccessGradient}>
                <Ionicons name="help-circle" size={24} color="#3b82f6" />
                <Text style={[styles.quickAccessText, { color: isDarkMode ? "white" : "#1f2937" }]}>
                  Interactive Quiz
                </Text>
              </LinearGradient>
            </BlurView>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickAccessCard} onPress={() => navigation.navigate("LearningModule")}>
            <BlurView intensity={20} style={styles.quickAccessBlur}>
              <LinearGradient colors={cardColors} style={styles.quickAccessGradient}>
                <Ionicons name="book" size={24} color="#f59e0b" />
                <Text style={[styles.quickAccessText, { color: isDarkMode ? "white" : "#1f2937" }]}>
                  Learning Module
                </Text>
              </LinearGradient>
            </BlurView>
          </TouchableOpacity>
        </View>

        {/* Learning Progress */}
        <BlurView intensity={30} style={styles.progressCard}>
          <LinearGradient colors={["#10b98120", "#059669"]} style={styles.progressCardGradient}>
            <View style={styles.progressHeader}>
              <Ionicons name="trending-up" size={24} color="#10b981" />
              <Text style={styles.progressTitle}>Learning Progress</Text>
            </View>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>42</Text>
                <Text style={styles.statLabel}>Lessons Completed</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>7</Text>
                <Text style={styles.statLabel}>Day Streak</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>85%</Text>
                <Text style={styles.statLabel}>Quiz Accuracy</Text>
              </View>
            </View>
          </LinearGradient>
        </BlurView>

        {/* Learning Topics */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? "white" : "#1f2937" }]}>Learning Topics</Text>
          {topics.map(renderTopicCard)}
        </View>

        {/* Daily Quiz */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? "white" : "#1f2937" }]}>Daily Quiz Challenge</Text>
          <TouchableOpacity onPress={() => navigation.navigate("InteractiveQuiz")}>
            <BlurView intensity={20} style={styles.quizCard}>
              <LinearGradient colors={["#f59e0b20", "#d97706"]} style={styles.quizGradient}>
                <View style={styles.quizHeader}>
                  <Ionicons name="help-circle" size={24} color="#f59e0b" />
                  <Text style={styles.quizTitle}>Climate Knowledge Test</Text>
                  <View style={styles.quizBadge}>
                    <Text style={styles.quizBadgeText}>+20 Points</Text>
                  </View>
                </View>
                <Text style={styles.quizQuestion}>
                  What percentage of global greenhouse gas emissions come from transportation?
                </Text>
                <View style={styles.optionsContainer}>
                  {["14%", "24%", "34%", "44%"].map((option, index) => (
                    <View key={index} style={styles.optionButton}>
                      <Text style={styles.optionText}>{option}</Text>
                    </View>
                  ))}
                </View>
              </LinearGradient>
            </BlurView>
          </TouchableOpacity>
        </View>

        {/* Recent Achievements */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? "white" : "#1f2937" }]}>Recent Achievements</Text>
          <View style={styles.achievementsContainer}>
            <BlurView intensity={15} style={styles.achievementCard}>
              <LinearGradient colors={cardColors} style={styles.achievementGradient}>
                <View style={[styles.achievementIcon, { backgroundColor: "#10b981" }]}>
                  <Ionicons name="leaf" size={20} color="white" />
                </View>
                <View style={styles.achievementContent}>
                  <Text style={[styles.achievementTitle, { color: isDarkMode ? "white" : "#1f2937" }]}>
                    Climate Expert
                  </Text>
                  <Text style={styles.achievementDesc}>Completed Climate Basics</Text>
                </View>
              </LinearGradient>
            </BlurView>

            <BlurView intensity={15} style={styles.achievementCard}>
              <LinearGradient colors={cardColors} style={styles.achievementGradient}>
                <View style={[styles.achievementIcon, { backgroundColor: "#3b82f6" }]}>
                  <Ionicons name="flash" size={20} color="white" />
                </View>
                <View style={styles.achievementContent}>
                  <Text style={[styles.achievementTitle, { color: isDarkMode ? "white" : "#1f2937" }]}>
                    Quick Learner
                  </Text>
                  <Text style={styles.achievementDesc}>7-day learning streak</Text>
                </View>
              </LinearGradient>
            </BlurView>
          </View>
        </View>
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
  headerContainer: {
    paddingHorizontal: 30,
    marginBottom: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
  },
  headerSubtitle: {
    fontSize: 16,
  },
  themeToggle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#374151",
    alignItems: "center",
    justifyContent: "center",
  },
  quickAccessContainer: {
    flexDirection: "row",
    paddingHorizontal: 30,
    marginBottom: 30,
    gap: 10,
  },
  quickAccessCard: {
    flex: 1,
    borderRadius: 15,
    overflow: "hidden",
  },
  quickAccessBlur: {
    flex: 1,
  },
  quickAccessGradient: {
    padding: 15,
    alignItems: "center",
  },
  quickAccessText: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 8,
    textAlign: "center",
  },
  progressCard: {
    marginHorizontal: 30,
    marginBottom: 30,
    borderRadius: 20,
    overflow: "hidden",
  },
  progressCardGradient: {
    padding: 20,
  },
  progressHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginLeft: 10,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#10b981",
  },
  statLabel: {
    fontSize: 12,
    color: "#9ca3af",
    marginTop: 5,
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
  topicCard: {
    marginHorizontal: 30,
    marginBottom: 15,
    borderRadius: 15,
    overflow: "hidden",
  },
  topicBlur: {
    flex: 1,
  },
  topicGradient: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  topicIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  topicContent: {
    flex: 1,
  },
  topicTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  topicLessons: {
    fontSize: 12,
    color: "#9ca3af",
    marginBottom: 10,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: "#374151",
    borderRadius: 3,
    marginRight: 10,
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: "#9ca3af",
    minWidth: 35,
  },
  quizCard: {
    marginHorizontal: 30,
    borderRadius: 20,
    overflow: "hidden",
  },
  quizGradient: {
    padding: 20,
  },
  quizHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  quizTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginLeft: 10,
    flex: 1,
  },
  quizBadge: {
    backgroundColor: "#f59e0b",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  quizBadgeText: {
    fontSize: 12,
    color: "white",
    fontWeight: "bold",
  },
  quizQuestion: {
    fontSize: 16,
    color: "white",
    marginBottom: 20,
    lineHeight: 24,
  },
  optionsContainer: {
    gap: 10,
  },
  optionButton: {
    backgroundColor: "#374151",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#4b5563",
  },
  optionText: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
  },
  achievementsContainer: {
    paddingHorizontal: 30,
    gap: 10,
  },
  achievementCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 15,
    overflow: "hidden",
  },
  achievementGradient: {
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  achievementDesc: {
    fontSize: 12,
    color: "#9ca3af",
    marginTop: 2,
  },
})

export default EcoIntelligence
