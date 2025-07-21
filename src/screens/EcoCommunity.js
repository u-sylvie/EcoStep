"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { BlurView } from "expo-blur"
import { Ionicons } from "@expo/vector-icons"

const EcoCommunity = () => {
  const [selectedTab, setSelectedTab] = useState("feed")

  const communityPosts = [
    {
      id: 1,
      user: "EcoWarrior23",
      avatar: "🌱",
      action: "completed Zero Waste Shopping",
      points: 50,
      time: "2 hours ago",
      likes: 12,
      comments: 3,
      image: null,
    },
    {
      id: 2,
      user: "GreenThumb",
      avatar: "🌿",
      action: "planted 3 trees in the local park",
      points: 150,
      time: "4 hours ago",
      likes: 28,
      comments: 7,
      image: "🌳",
    },
    {
      id: 3,
      user: "ClimateChampion",
      avatar: "♻️",
      action: "used public transport for a week",
      points: 175,
      time: "1 day ago",
      likes: 45,
      comments: 12,
      image: null,
    },
  ]

  const challenges = [
    {
      id: 1,
      title: "Plastic-Free Week",
      description: "Avoid single-use plastics for 7 days",
      participants: 234,
      daysLeft: 3,
      reward: 200,
      color: "#ef4444",
      icon: "ban",
    },
    {
      id: 2,
      title: "Green Commute Challenge",
      description: "Use eco-friendly transportation",
      participants: 156,
      daysLeft: 5,
      reward: 150,
      color: "#10b981",
      icon: "bicycle",
    },
    {
      id: 3,
      title: "Energy Saving Sprint",
      description: "Reduce home energy consumption",
      participants: 89,
      daysLeft: 2,
      reward: 100,
      color: "#f59e0b",
      icon: "flash",
    },
  ]

  const leaderboard = [
    { rank: 1, name: "EcoMaster", points: 2450, badge: "👑" },
    { rank: 2, name: "GreenGuru", points: 2180, badge: "🥈" },
    { rank: 3, name: "ClimateHero", points: 1950, badge: "🥉" },
    { rank: 4, name: "You", points: 1250, badge: "🌟" },
    { rank: 5, name: "EcoFriend", points: 1100, badge: "🌱" },
  ]

  const renderPost = (post) => (
    <BlurView key={post.id} intensity={20} style={styles.postCard}>
      <LinearGradient colors={["#374151", "#1f2937"]} style={styles.postGradient}>
        <View style={styles.postHeader}>
          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{post.avatar}</Text>
            </View>
            <View style={styles.userDetails}>
              <Text style={styles.username}>{post.user}</Text>
              <Text style={styles.postTime}>{post.time}</Text>
            </View>
          </View>
          <View style={styles.pointsBadge}>
            <Text style={styles.pointsText}>+{post.points}</Text>
          </View>
        </View>

        <Text style={styles.postContent}>{post.action}</Text>

        {post.image && (
          <View style={styles.postImage}>
            <Text style={styles.imageEmoji}>{post.image}</Text>
          </View>
        )}

        <View style={styles.postActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="heart-outline" size={20} color="#9ca3af" />
            <Text style={styles.actionText}>{post.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="chatbubble-outline" size={20} color="#9ca3af" />
            <Text style={styles.actionText}>{post.comments}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="share-outline" size={20} color="#9ca3af" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </BlurView>
  )

  const renderChallenge = (challenge) => (
    <TouchableOpacity key={challenge.id} style={styles.challengeCard}>
      <BlurView intensity={20} style={styles.challengeBlur}>
        <LinearGradient colors={[`${challenge.color}20`, `${challenge.color}10`]} style={styles.challengeGradient}>
          <View style={styles.challengeHeader}>
            <View style={[styles.challengeIcon, { backgroundColor: challenge.color }]}>
              <Ionicons name={challenge.icon} size={20} color="white" />
            </View>
            <View style={styles.challengeInfo}>
              <Text style={styles.challengeTitle}>{challenge.title}</Text>
              <Text style={styles.challengeDescription}>{challenge.description}</Text>
            </View>
            <View style={styles.challengeReward}>
              <Text style={styles.rewardPoints}>+{challenge.reward}</Text>
            </View>
          </View>
          <View style={styles.challengeStats}>
            <View style={styles.challengeStat}>
              <Ionicons name="people" size={16} color="#9ca3af" />
              <Text style={styles.statText}>{challenge.participants} joined</Text>
            </View>
            <View style={styles.challengeStat}>
              <Ionicons name="time" size={16} color="#9ca3af" />
              <Text style={styles.statText}>{challenge.daysLeft} days left</Text>
            </View>
          </View>
        </LinearGradient>
      </BlurView>
    </TouchableOpacity>
  )

  const renderLeaderboardItem = (item) => (
    <View key={item.rank} style={styles.leaderboardItem}>
      <View style={styles.rankInfo}>
        <Text style={styles.rankNumber}>{item.rank}</Text>
        <Text style={styles.rankBadge}>{item.badge}</Text>
        <Text style={[styles.rankName, item.name === "You" && styles.currentUser]}>{item.name}</Text>
      </View>
      <Text style={styles.rankPoints}>{item.points.toLocaleString()}</Text>
    </View>
  )

  const renderTabContent = () => {
    switch (selectedTab) {
      case "feed":
        return (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Community Feed</Text>
            {communityPosts.map(renderPost)}
          </View>
        )
      case "challenges":
        return (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Active Challenges</Text>
            {challenges.map(renderChallenge)}
          </View>
        )
      case "leaderboard":
        return (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Weekly Leaderboard</Text>
            <BlurView intensity={20} style={styles.leaderboardCard}>
              <LinearGradient colors={["#374151", "#1f2937"]} style={styles.leaderboardGradient}>
                {leaderboard.map(renderLeaderboardItem)}
              </LinearGradient>
            </BlurView>
          </View>
        )
      default:
        return null
    }
  }

  return (
    <LinearGradient colors={["#0f172a", "#1e293b", "#334155"]} style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Eco Community</Text>
          <Text style={styles.headerSubtitle}>Connect with fellow eco-warriors</Text>
        </View>

        {/* Community Stats */}
        <BlurView intensity={30} style={styles.statsCard}>
          <LinearGradient colors={["#10b98120", "#059669"]} style={styles.statsGradient}>
            <View style={styles.statsHeader}>
              <Ionicons name="people" size={24} color="#10b981" />
              <Text style={styles.statsTitle}>Community Impact</Text>
            </View>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>12.5k</Text>
                <Text style={styles.statLabel}>Active Members</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>450 tons</Text>
                <Text style={styles.statLabel}>CO2 Saved</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>8.2k</Text>
                <Text style={styles.statLabel}>Trees Planted</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>156</Text>
                <Text style={styles.statLabel}>Active Challenges</Text>
              </View>
            </View>
          </LinearGradient>
        </BlurView>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === "feed" && styles.activeTab]}
            onPress={() => setSelectedTab("feed")}
          >
            <Ionicons name="newspaper" size={20} color={selectedTab === "feed" ? "#10b981" : "#9ca3af"} />
            <Text style={[styles.tabText, selectedTab === "feed" && styles.activeTabText]}>Feed</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, selectedTab === "challenges" && styles.activeTab]}
            onPress={() => setSelectedTab("challenges")}
          >
            <Ionicons name="trophy" size={20} color={selectedTab === "challenges" ? "#10b981" : "#9ca3af"} />
            <Text style={[styles.tabText, selectedTab === "challenges" && styles.activeTabText]}>Challenges</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, selectedTab === "leaderboard" && styles.activeTab]}
            onPress={() => setSelectedTab("leaderboard")}
          >
            <Ionicons name="podium" size={20} color={selectedTab === "leaderboard" ? "#10b981" : "#9ca3af"} />
            <Text style={[styles.tabText, selectedTab === "leaderboard" && styles.activeTabText]}>Leaderboard</Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {renderTabContent()}
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
    paddingHorizontal: 30,
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#9ca3af",
  },
  statsCard: {
    marginHorizontal: 30,
    marginBottom: 30,
    borderRadius: 20,
    overflow: "hidden",
  },
  statsGradient: {
    padding: 20,
  },
  statsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginLeft: 10,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statItem: {
    width: "48%",
    alignItems: "center",
    marginBottom: 15,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#10b981",
  },
  statLabel: {
    fontSize: 12,
    color: "#9ca3af",
    marginTop: 5,
  },
  tabContainer: {
    flexDirection: "row",
    marginHorizontal: 30,
    marginBottom: 20,
    backgroundColor: "#374151",
    borderRadius: 15,
    padding: 5,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: "#10b98120",
  },
  tabText: {
    fontSize: 14,
    color: "#9ca3af",
    marginLeft: 5,
    fontWeight: "500",
  },
  activeTabText: {
    color: "#10b981",
  },
  tabContent: {
    paddingHorizontal: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  postCard: {
    marginBottom: 20,
    borderRadius: 15,
    overflow: "hidden",
  },
  postGradient: {
    padding: 20,
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#4b5563",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
  },
  userDetails: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  postTime: {
    fontSize: 12,
    color: "#9ca3af",
    marginTop: 2,
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
  postContent: {
    fontSize: 16,
    color: "white",
    lineHeight: 24,
    marginBottom: 15,
  },
  postImage: {
    alignItems: "center",
    marginBottom: 15,
  },
  imageEmoji: {
    fontSize: 48,
  },
  postActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#4b5563",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionText: {
    fontSize: 14,
    color: "#9ca3af",
    marginLeft: 5,
  },
  challengeCard: {
    marginBottom: 15,
    borderRadius: 15,
    overflow: "hidden",
  },
  challengeBlur: {
    flex: 1,
  },
  challengeGradient: {
    padding: 20,
  },
  challengeHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  challengeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  challengeInfo: {
    flex: 1,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  challengeDescription: {
    fontSize: 14,
    color: "#d1d5db",
  },
  challengeReward: {
    alignItems: "flex-end",
  },
  rewardPoints: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#10b981",
  },
  challengeStats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  challengeStat: {
    flexDirection: "row",
    alignItems: "center",
  },
  statText: {
    fontSize: 12,
    color: "#9ca3af",
    marginLeft: 5,
  },
  leaderboardCard: {
    borderRadius: 15,
    overflow: "hidden",
  },
  leaderboardGradient: {
    padding: 20,
  },
  leaderboardItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#4b5563",
  },
  rankInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  rankNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#9ca3af",
    width: 30,
  },
  rankBadge: {
    fontSize: 20,
    marginRight: 10,
  },
  rankName: {
    fontSize: 16,
    color: "white",
    flex: 1,
  },
  currentUser: {
    color: "#10b981",
    fontWeight: "bold",
  },
  rankPoints: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#10b981",
  },
})

export default EcoCommunity
