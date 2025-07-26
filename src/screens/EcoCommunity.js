import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"
import { useAppContext } from "../../App"

const { width } = Dimensions.get("window")

const EcoCommunity = ({ navigation }) => {
  const { isDarkMode, toggleTheme, user } = useAppContext()

  const communityFeatures = [
    {
      title: "Social Feed",
      description: "Share your eco journey",
      icon: "chatbubbles",
      color: "#10b981",
      screen: "SocialFeed",
    },
    {
      title: "Group Challenges",
      description: "Join community challenges",
      icon: "trophy",
      color: "#3b82f6",
      screen: "GroupChallenges",
    },
    {
      title: "My Groups",
      description: "Manage your groups",
      icon: "people",
      color: "#f59e0b",
      screen: "MyGroups",
    },
  ]

  const communityStats = [
    { label: "Active Members", value: "12.5K", icon: "people", color: "#10b981" },
    { label: "Challenges", value: "45", icon: "trophy", color: "#3b82f6" },
    { label: "Groups", value: "128", icon: "grid", color: "#f59e0b" },
    { label: "Posts Today", value: "234", icon: "chatbubble", color: "#ef4444" },
  ]

  const recentActivity = [
    {
      id: 1,
      user: "EcoWarrior23",
      action: "completed the Plastic-Free Week challenge",
      time: "2h ago",
      avatar: "🌱",
    },
    {
      id: 2,
      user: "GreenThumb",
      action: "shared a photo in Urban Gardeners group",
      time: "4h ago",
      avatar: "🌿",
    },
    {
      id: 3,
      user: "ClimateChampion",
      action: "organized a beach cleanup event",
      time: "6h ago",
      avatar: "🌍",
    },
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
            <Text style={[styles.title, { color: isDarkMode ? "white" : "black" }]}>Eco Community</Text>
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

      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {/* Community Stats */}
        <View style={styles.statsContainer}>
          {communityStats.map((stat, index) => (
            <LinearGradient
              key={index}
              colors={isDarkMode ? ["#1e293b", "#334155"] : ["#ffffff", "#f1f5f9"]}
              style={styles.statCard}
            >
              <View style={[styles.statIcon, { backgroundColor: stat.color }]}>
                <Ionicons name={stat.icon} size={20} color="white" />
              </View>
              <Text style={[styles.statValue, { color: isDarkMode ? "white" : "black" }]}>{stat.value}</Text>
              <Text style={[styles.statLabel, { color: isDarkMode ? "#9ca3af" : "#6b7280" }]}>{stat.label}</Text>
            </LinearGradient>
          ))}
        </View>

        {/* Community Features */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? "white" : "black" }]}>Community Features</Text>
          <View style={styles.featuresGrid}>
            {communityFeatures.map((feature, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.featureCard, { backgroundColor: isDarkMode ? "#1e293b" : "white" }]}
                onPress={() => navigation.navigate(feature.screen)}
              >
                <View style={[styles.featureIcon, { backgroundColor: feature.color }]}>
                  <Ionicons name={feature.icon} size={28} color="white" />
                </View>
                <Text style={[styles.featureTitle, { color: isDarkMode ? "white" : "black" }]}>{feature.title}</Text>
                <Text style={[styles.featureDescription, { color: isDarkMode ? "#9ca3af" : "#6b7280" }]}>
                  {feature.description}
                </Text>
                <View style={styles.featureArrow}>
                  <Ionicons name="chevron-forward" size={20} color={feature.color} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? "white" : "black" }]}>
            Recent Community Activity
          </Text>
          {recentActivity.map((activity) => (
            <View
              key={activity.id}
              style={[styles.activityItem, { backgroundColor: isDarkMode ? "#1e293b" : "white" }]}
            >
              <Text style={styles.activityAvatar}>{activity.avatar}</Text>
              <View style={styles.activityInfo}>
                <Text style={[styles.activityText, { color: isDarkMode ? "white" : "black" }]}>
                  <Text style={styles.activityUser}>{activity.user}</Text> {activity.action}
                </Text>
                <Text style={[styles.activityTime, { color: isDarkMode ? "#9ca3af" : "#6b7280" }]}>
                  {activity.time}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Call to Action */}
        <LinearGradient colors={["#10b981", "#059669"]} style={styles.ctaCard}>
          <Ionicons name="people" size={40} color="white" />
          <Text style={styles.ctaTitle}>Join the Movement!</Text>
          <Text style={styles.ctaDescription}>
            Connect with like-minded eco warriors and make a difference together.
          </Text>
          <TouchableOpacity style={styles.ctaButton} onPress={() => navigation.navigate("SocialFeed")}>
            <Text style={styles.ctaButtonText}>Get Started</Text>
          </TouchableOpacity>
        </LinearGradient>
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
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
  featuresGrid: {
    gap: 15,
  },
  featureCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    flex: 1,
  },
  featureDescription: {
    fontSize: 14,
    flex: 1,
  },
  featureArrow: {
    marginLeft: 10,
  },
  activityItem: {
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
  activityAvatar: {
    fontSize: 30,
    marginRight: 15,
  },
  activityInfo: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  activityUser: {
    fontWeight: "bold",
  },
  activityTime: {
    fontSize: 12,
  },
  ctaCard: {
    margin: 20,
    padding: 30,
    borderRadius: 20,
    alignItems: "center",
  },
  ctaTitle: {
    fontSize: 24,
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

export default EcoCommunity
