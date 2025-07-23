import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"
import { useAppContext } from "../../App"

const { width } = Dimensions.get("window")

const EcoRewards = ({ navigation }) => {
  const { isDarkMode, ecoPoints, toggleTheme, user } = useAppContext()

  const quickActions = [
    {
      title: "Rewards Dashboard",
      description: "View your rewards overview",
      icon: "trophy",
      color: "#10b981",
      screen: "RewardsDashboard",
    },
    {
      title: "Marketplace",
      description: "Browse available rewards",
      icon: "storefront",
      color: "#3b82f6",
      screen: "RewardMarketplace",
    },
    {
      title: "Environmental Impact",
      description: "See your eco impact",
      icon: "earth",
      color: "#22c55e",
      screen: "EnvironmentalImpact",
    },
  ]

  const recentRewards = [
    { id: 1, title: "Tree Planting Certificate", points: 500, status: "Redeemed" },
    { id: 2, title: "Eco Water Bottle", points: 300, status: "Shipped" },
    { id: 3, title: "Solar Charger Discount", points: 200, status: "Used" },
  ]

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? "#0f172a" : "#f8fafc" }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Text style={styles.avatar}>{user?.avatar || "🌱"}</Text>
          </TouchableOpacity>
          <View>
            <Text style={[styles.greeting, { color: isDarkMode ? "#9ca3af" : "#6b7280" }]}>
              Hello, {user?.name || "Eco Warrior"}
            </Text>
            <Text style={[styles.title, { color: isDarkMode ? "white" : "black" }]}>Eco Rewards</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={toggleTheme} style={styles.themeButton}>
            <Ionicons name={isDarkMode ? "sunny" : "moon"} size={24} color={isDarkMode ? "#fbbf24" : "#6366f1"} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
            <Ionicons name="settings-outline" size={24} color={isDarkMode ? "white" : "black"} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Points Overview */}
        <LinearGradient colors={isDarkMode ? ["#1e293b", "#334155"] : ["#ffffff", "#f1f5f9"]} style={styles.pointsCard}>
          <View style={styles.pointsHeader}>
            <Ionicons name="trophy" size={32} color="#10b981" />
            <Text style={[styles.pointsTitle, { color: isDarkMode ? "white" : "black" }]}>Your EcoPoints</Text>
          </View>
          <Text style={[styles.pointsValue, { color: isDarkMode ? "white" : "black" }]}>
            {ecoPoints.toLocaleString()}
          </Text>
          <Text style={[styles.pointsSubtext, { color: isDarkMode ? "#9ca3af" : "#6b7280" }]}>
            Keep earning points by completing eco-friendly actions!
          </Text>
        </LinearGradient>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? "white" : "black" }]}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.actionCard, { backgroundColor: isDarkMode ? "#1e293b" : "white" }]}
                onPress={() => navigation.navigate(action.screen)}
              >
                <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
                  <Ionicons name={action.icon} size={24} color="white" />
                </View>
                <Text style={[styles.actionTitle, { color: isDarkMode ? "white" : "black" }]}>{action.title}</Text>
                <Text style={[styles.actionDescription, { color: isDarkMode ? "#9ca3af" : "#6b7280" }]}>
                  {action.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? "white" : "black" }]}>Recent Activity</Text>
          {recentRewards.map((reward) => (
            <View key={reward.id} style={[styles.rewardItem, { backgroundColor: isDarkMode ? "#1e293b" : "white" }]}>
              <View style={styles.rewardInfo}>
                <Text style={[styles.rewardTitle, { color: isDarkMode ? "white" : "black" }]}>{reward.title}</Text>
                <Text style={[styles.rewardStatus, { color: isDarkMode ? "#9ca3af" : "#6b7280" }]}>
                  {reward.status}
                </Text>
              </View>
              <Text style={[styles.rewardPoints, { color: "#10b981" }]}>{reward.points} pts</Text>
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    fontSize: 40,
    marginRight: 15,
  },
  greeting: {
    fontSize: 14,
    marginBottom: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  themeButton: {
    padding: 8,
  },
  pointsCard: {
    margin: 20,
    padding: 25,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  pointsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  pointsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  pointsValue: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 10,
  },
  pointsSubtext: {
    fontSize: 14,
    textAlign: "center",
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  actionCard: {
    width: (width - 60) / 2,
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  actionDescription: {
    fontSize: 12,
    textAlign: "center",
    lineHeight: 16,
  },
  rewardItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  rewardStatus: {
    fontSize: 14,
  },
  rewardPoints: {
    fontSize: 16,
    fontWeight: "bold",
  },
})

export default EcoRewards
