import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"
import { useAppContext } from "../../../App"

const { width } = Dimensions.get("window")

const EnvironmentalImpact = ({ navigation }) => {
  const { isDarkMode } = useAppContext()

  const impactStats = [
    {
      icon: "leaf",
      value: "45.2",
      unit: "kg CO2",
      label: "Carbon Saved",
      color: "#22c55e",
      description: "Equivalent to planting 2 trees",
    },
    {
      icon: "water",
      value: "1,250",
      unit: "liters",
      label: "Water Saved",
      color: "#3b82f6",
      description: "Enough for 8 days of drinking",
    },
    {
      icon: "trash",
      value: "12.8",
      unit: "kg",
      label: "Waste Reduced",
      color: "#f59e0b",
      description: "Diverted from landfills",
    },
    {
      icon: "flash",
      value: "89",
      unit: "kWh",
      label: "Energy Saved",
      color: "#8b5cf6",
      description: "Powers a home for 3 days",
    },
  ]

  const achievements = [
    {
      id: 1,
      title: "Carbon Warrior",
      description: "Saved 50kg of CO2 emissions",
      icon: "shield-checkmark",
      progress: 90,
      color: "#22c55e",
    },
    {
      id: 2,
      title: "Water Guardian",
      description: "Conserved 1000L of water",
      icon: "water",
      progress: 100,
      color: "#3b82f6",
    },
    {
      id: 3,
      title: "Waste Reducer",
      description: "Diverted 10kg from landfills",
      icon: "trash",
      progress: 100,
      color: "#f59e0b",
    },
    {
      id: 4,
      title: "Energy Saver",
      description: "Saved 100kWh of energy",
      icon: "flash",
      progress: 89,
      color: "#8b5cf6",
    },
  ]

  const monthlyData = [
    { month: "Jan", co2: 8.2, water: 180, waste: 2.1 },
    { month: "Feb", co2: 9.1, water: 220, waste: 2.8 },
    { month: "Mar", co2: 7.8, water: 195, waste: 2.3 },
    { month: "Apr", co2: 10.5, water: 280, waste: 3.2 },
    { month: "May", co2: 9.6, water: 375, waste: 2.4 },
  ]

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? "#0f172a" : "#f8fafc" }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={isDarkMode ? "white" : "black"} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDarkMode ? "white" : "black" }]}>Environmental Impact</Text>
        <TouchableOpacity style={styles.shareButton}>
          <Ionicons name="share-outline" size={24} color={isDarkMode ? "white" : "black"} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Impact Overview */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? "white" : "black" }]}>Your Impact This Year</Text>
          <View style={styles.impactGrid}>
            {impactStats.map((stat, index) => (
              <LinearGradient
                key={index}
                colors={isDarkMode ? ["#1e293b", "#334155"] : ["#ffffff", "#f1f5f9"]}
                style={styles.impactCard}
              >
                <View style={[styles.impactIcon, { backgroundColor: stat.color }]}>
                  <Ionicons name={stat.icon} size={24} color="white" />
                </View>
                <View style={styles.impactValue}>
                  <Text style={[styles.impactNumber, { color: isDarkMode ? "white" : "black" }]}>{stat.value}</Text>
                  <Text style={[styles.impactUnit, { color: stat.color }]}>{stat.unit}</Text>
                </View>
                <Text style={[styles.impactLabel, { color: isDarkMode ? "white" : "black" }]}>{stat.label}</Text>
                <Text style={[styles.impactDescription, { color: isDarkMode ? "#9ca3af" : "#6b7280" }]}>
                  {stat.description}
                </Text>
              </LinearGradient>
            ))}
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? "white" : "black" }]}>
            Environmental Achievements
          </Text>
          {achievements.map((achievement) => (
            <View
              key={achievement.id}
              style={[styles.achievementCard, { backgroundColor: isDarkMode ? "#1e293b" : "white" }]}
            >
              <View style={[styles.achievementIcon, { backgroundColor: achievement.color }]}>
                <Ionicons name={achievement.icon} size={24} color="white" />
              </View>
              <View style={styles.achievementInfo}>
                <Text style={[styles.achievementTitle, { color: isDarkMode ? "white" : "black" }]}>
                  {achievement.title}
                </Text>
                <Text style={[styles.achievementDescription, { color: isDarkMode ? "#9ca3af" : "#6b7280" }]}>
                  {achievement.description}
                </Text>
                <View style={styles.progressContainer}>
                  <View style={[styles.progressBar, { backgroundColor: isDarkMode ? "#374151" : "#e5e7eb" }]}>
                    <View
                      style={[
                        styles.progressFill,
                        { width: `${achievement.progress}%`, backgroundColor: achievement.color },
                      ]}
                    />
                  </View>
                  <Text style={[styles.progressText, { color: achievement.color }]}>{achievement.progress}%</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Monthly Trends */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? "white" : "black" }]}>Monthly Trends</Text>
          <View style={[styles.chartContainer, { backgroundColor: isDarkMode ? "#1e293b" : "white" }]}>
            <Text style={[styles.chartTitle, { color: isDarkMode ? "white" : "black" }]}>CO2 Savings (kg)</Text>
            <View style={styles.chart}>
              {monthlyData.map((data, index) => (
                <View key={index} style={styles.chartBar}>
                  <View
                    style={[
                      styles.bar,
                      {
                        height: data.co2 * 8,
                        backgroundColor: "#22c55e",
                      },
                    ]}
                  />
                  <Text style={[styles.chartLabel, { color: isDarkMode ? "#9ca3af" : "#6b7280" }]}>{data.month}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Call to Action */}
        <View style={styles.section}>
          <LinearGradient colors={["#10b981", "#059669"]} style={styles.ctaCard}>
            <Ionicons name="earth" size={40} color="white" />
            <Text style={styles.ctaTitle}>Keep Making a Difference!</Text>
            <Text style={styles.ctaDescription}>
              Your actions are creating real environmental impact. Continue your eco journey!
            </Text>
            <TouchableOpacity style={styles.ctaButton}>
              <Text style={styles.ctaButtonText}>Take More Actions</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
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
  shareButton: {
    padding: 8,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  impactGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  impactCard: {
    width: (width - 60) / 2,
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: "center",
  },
  impactIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  impactValue: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 5,
  },
  impactNumber: {
    fontSize: 24,
    fontWeight: "bold",
  },
  impactUnit: {
    fontSize: 14,
    marginLeft: 5,
    fontWeight: "600",
  },
  impactLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    textAlign: "center",
  },
  impactDescription: {
    fontSize: 12,
    textAlign: "center",
  },
  achievementCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  achievementIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  achievementDescription: {
    fontSize: 14,
    marginBottom: 10,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  progressBar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    marginRight: 10,
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  chartContainer: {
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  chart: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
    height: 120,
  },
  chartBar: {
    alignItems: "center",
  },
  bar: {
    width: 20,
    backgroundColor: "#22c55e",
    borderRadius: 10,
    marginBottom: 10,
  },
  chartLabel: {
    fontSize: 12,
  },
  ctaCard: {
    padding: 30,
    borderRadius: 20,
    alignItems: "center",
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginTop: 15,
    marginBottom: 10,
  },
  ctaDescription: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    marginBottom: 20,
    opacity: 0.9,
  },
  ctaButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  ctaButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
})

export default EnvironmentalImpact
