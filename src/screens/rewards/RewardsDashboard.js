import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"
import { useAppContext } from "../../../App"

const { width } = Dimensions.get("window")

const RewardsDashboard = ({ navigation }) => {
  const { isDarkMode, ecoPoints } = useAppContext()

  const stats = [
    { label: "Total Points", value: ecoPoints, icon: "trophy", color: "#10b981" },
    { label: "Redeemed", value: "850", icon: "gift", color: "#3b82f6" },
    { label: "CO2 Saved", value: "45kg", icon: "leaf", color: "#22c55e" },
    { label: "Rank", value: "#127", icon: "medal", color: "#f59e0b" },
  ]

  const recentRewards = [
    { id: 1, title: "Tree Planting Certificate", points: 500, date: "2 days ago", status: "Redeemed" },
    { id: 2, title: "Eco-friendly Water Bottle", points: 300, date: "1 week ago", status: "Shipped" },
    { id: 3, title: "Solar Charger Discount", points: 200, date: "2 weeks ago", status: "Used" },
  ]

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? "#0f172a" : "#f8fafc" }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={isDarkMode ? "white" : "black"} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDarkMode ? "white" : "black" }]}>Rewards Dashboard</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Ionicons name="settings-outline" size={24} color={isDarkMode ? "white" : "black"} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Stats Grid */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <LinearGradient
              key={index}
              colors={isDarkMode ? ["#1e293b", "#334155"] : ["#ffffff", "#f1f5f9"]}
              style={styles.statCard}
            >
              <View style={[styles.statIcon, { backgroundColor: stat.color }]}>
                <Ionicons name={stat.icon} size={24} color="white" />
              </View>
              <Text style={[styles.statValue, { color: isDarkMode ? "white" : "black" }]}>{stat.value}</Text>
              <Text style={[styles.statLabel, { color: isDarkMode ? "#9ca3af" : "#6b7280" }]}>{stat.label}</Text>
            </LinearGradient>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? "white" : "black" }]}>Quick Actions</Text>
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: isDarkMode ? "#1e293b" : "white" }]}
              onPress={() => navigation.navigate("RewardMarketplace")}
            >
              <Ionicons name="storefront" size={32} color="#10b981" />
              <Text style={[styles.actionText, { color: isDarkMode ? "white" : "black" }]}>Marketplace</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: isDarkMode ? "#1e293b" : "white" }]}
              onPress={() => navigation.navigate("EnvironmentalImpact")}
            >
              <Ionicons name="earth" size={32} color="#3b82f6" />
              <Text style={[styles.actionText, { color: isDarkMode ? "white" : "black" }]}>Impact</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? "white" : "black" }]}>Recent Activity</Text>
          {recentRewards.map((reward) => (
            <View key={reward.id} style={[styles.rewardItem, { backgroundColor: isDarkMode ? "#1e293b" : "white" }]}>
              <View style={styles.rewardInfo}>
                <Text style={[styles.rewardTitle, { color: isDarkMode ? "white" : "black" }]}>{reward.title}</Text>
                <Text style={[styles.rewardDate, { color: isDarkMode ? "#9ca3af" : "#6b7280" }]}>{reward.date}</Text>
              </View>
              <View style={styles.rewardRight}>
                <Text style={[styles.rewardPoints, { color: "#10b981" }]}>{reward.points} pts</Text>
                <Text style={[styles.rewardStatus, { color: isDarkMode ? "#9ca3af" : "#6b7280" }]}>
                  {reward.status}
                </Text>
              </View>
            </View>
          ))}
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
  settingsButton: {
    padding: 8,
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  statCard: {
    width: (width - 60) / 2,
    margin: 10,
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
  },
  statIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    textAlign: "center",
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
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  actionButton: {
    width: (width - 80) / 2,
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "600",
  },
  rewardItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  rewardInfo: {
    flex: 1,
  },
  rewardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  rewardDate: {
    fontSize: 14,
  },
  rewardRight: {
    alignItems: "flex-end",
  },
  rewardPoints: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  rewardStatus: {
    fontSize: 12,
  },
})

export default RewardsDashboard
