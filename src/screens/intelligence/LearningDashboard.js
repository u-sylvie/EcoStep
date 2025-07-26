"use client"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { BlurView } from "expo-blur"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { useAppContext } from "../../../App"

const LearningDashboard = () => {
  const navigation = useNavigation()
  const { isDarkMode, ecoPoints, updateEcoPoints } = useAppContext()

  const learningProgress = [
    { subject: "Climate Science", progress: 85, color: "#ef4444" },
    { subject: "Sustainable Living", progress: 60, color: "#10b981" },
    { subject: "Renewable Energy", progress: 40, color: "#f59e0b" },
  ]

  const todaysModules = [
    {
      id: 1,
      title: "Carbon Cycle Basics",
      points: 15,
      duration: "5 min",
      icon: "leaf",
      color: "#10b981",
      completed: false,
    },
    {
      id: 2,
      title: "Water Conservation Quiz",
      points: 20,
      duration: "3 min",
      icon: "water",
      color: "#3b82f6",
      completed: false,
    },
  ]

  const achievements = [
    { title: "Eco Beginner", description: "Complete 10 missions", icon: "star", unlocked: true },
    { title: "Green Warrior", description: "7-day streak", icon: "flash", unlocked: true },
    { title: "Climate Expert", description: "Complete all climate modules", icon: "school", unlocked: false },
  ]

  const bgColors = isDarkMode ? ["#0f172a", "#1e293b", "#334155"] : ["#f8fafc", "#e2e8f0", "#cbd5e1"]
  const cardColors = isDarkMode ? ["#374151", "#1f2937"] : ["#ffffff", "#f1f5f9"]

  const handleModulePress = (module) => {
    if (module.title.includes("Quiz")) {
      navigation.navigate("InteractiveQuiz", { module })
    } else {
      navigation.navigate("LearningModule", { module })
    }
  }

  return (
    <LinearGradient colors={bgColors} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={isDarkMode ? "white" : "#1f2937"} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: isDarkMode ? "white" : "#1f2937" }]}>Learning Dashboard</Text>
          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>Level 7</Text>
          </View>
        </View>

        {/* Learning Progress */}
        <BlurView intensity={20} style={styles.progressCard}>
          <LinearGradient colors={cardColors} style={styles.progressGradient}>
            <Text style={[styles.sectionTitle, { color: isDarkMode ? "white" : "#1f2937" }]}>Learning Progress</Text>
            {learningProgress.map((item, index) => (
              <View key={index} style={styles.progressItem}>
                <Text style={[styles.progressLabel, { color: isDarkMode ? "white" : "#1f2937" }]}>{item.subject}</Text>
                <View style={styles.progressBarContainer}>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${item.progress}%`, backgroundColor: item.color }]} />
                  </View>
                  <Text style={styles.progressPercent}>{item.progress}%</Text>
                </View>
              </View>
            ))}
          </LinearGradient>
        </BlurView>

        {/* Today's Modules */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? "white" : "#1f2937" }]}>Today's Modules</Text>
          {todaysModules.map((module) => (
            <TouchableOpacity key={module.id} style={styles.moduleCard} onPress={() => handleModulePress(module)}>
              <BlurView intensity={15} style={styles.moduleBlur}>
                <LinearGradient colors={cardColors} style={styles.moduleGradient}>
                  <View style={[styles.moduleIcon, { backgroundColor: module.color }]}>
                    <Ionicons name={module.icon} size={20} color="white" />
                  </View>
                  <View style={styles.moduleContent}>
                    <Text style={[styles.moduleTitle, { color: isDarkMode ? "white" : "#1f2937" }]}>
                      {module.title}
                    </Text>
                    <Text style={styles.moduleDuration}>{module.duration}</Text>
                  </View>
                  <View style={styles.moduleReward}>
                    <Text style={styles.modulePoints}>+{module.points} pts</Text>
                  </View>
                </LinearGradient>
              </BlurView>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Achievements */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? "white" : "#1f2937" }]}>Recent Achievements</Text>
          {achievements.map((achievement, index) => (
            <BlurView key={index} intensity={15} style={styles.achievementCard}>
              <LinearGradient colors={cardColors} style={styles.achievementGradient}>
                <View
                  style={[styles.achievementIcon, { backgroundColor: achievement.unlocked ? "#10b981" : "#6b7280" }]}
                >
                  <Ionicons name={achievement.icon} size={20} color="white" />
                </View>
                <View style={styles.achievementContent}>
                  <Text style={[styles.achievementTitle, { color: isDarkMode ? "white" : "#1f2937" }]}>
                    {achievement.title}
                  </Text>
                  <Text style={styles.achievementDescription}>{achievement.description}</Text>
                </View>
                {achievement.unlocked && <Ionicons name="checkmark-circle" size={24} color="#10b981" />}
              </LinearGradient>
            </BlurView>
          ))}
        </View>

        {/* Start Learning Button */}
        <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate("LearningModule")}>
          <LinearGradient colors={["#10b981", "#059669"]} style={styles.startButtonGradient}>
            <Text style={styles.startButtonText}>Start Learning</Text>
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
    flexGrow: 1,
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
  levelBadge: {
    backgroundColor: "#10b981",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  levelText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  progressCard: {
    marginHorizontal: 30,
    marginBottom: 30,
    borderRadius: 20,
    overflow: "hidden",
  },
  progressGradient: {
    padding: 25,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 30,
    marginBottom: 15,
  },
  progressItem: {
    marginBottom: 20,
  },
  progressLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
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
  progressPercent: {
    fontSize: 14,
    color: "#9ca3af",
    fontWeight: "bold",
    minWidth: 35,
  },
  moduleCard: {
    marginHorizontal: 30,
    marginBottom: 15,
    borderRadius: 15,
    overflow: "hidden",
  },
  moduleBlur: {
    flex: 1,
  },
  moduleGradient: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  moduleIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  moduleContent: {
    flex: 1,
  },
  moduleTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  moduleDuration: {
    fontSize: 14,
    color: "#9ca3af",
  },
  moduleReward: {
    backgroundColor: "#10b981",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  modulePoints: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  achievementCard: {
    marginHorizontal: 30,
    marginBottom: 10,
    borderRadius: 15,
    overflow: "hidden",
  },
  achievementGradient: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
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
    marginBottom: 5,
  },
  achievementDescription: {
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
})

export default LearningDashboard
