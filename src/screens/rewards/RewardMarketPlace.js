"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useAppContext } from "../../../App"

const RewardMarketplace = ({ navigation }) => {
  const { isDarkMode, ecoPoints, updateEcoPoints } = useAppContext()
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", "Eco Products", "Discounts", "Experiences", "Donations"]

  const rewards = [
    {
      id: 1,
      title: "Bamboo Water Bottle",
      description: "Sustainable bamboo water bottle",
      points: 300,
      category: "Eco Products",
      image: "🌿",
      available: true,
    },
    {
      id: 2,
      title: "Solar Power Bank",
      description: "Portable solar charging device",
      points: 500,
      category: "Eco Products",
      image: "☀️",
      available: true,
    },
    {
      id: 3,
      title: "20% Off Organic Store",
      description: "Discount at local organic store",
      points: 200,
      category: "Discounts",
      image: "🛒",
      available: true,
    },
    {
      id: 4,
      title: "Tree Planting Experience",
      description: "Join a community tree planting event",
      points: 400,
      category: "Experiences",
      image: "🌳",
      available: true,
    },
    {
      id: 5,
      title: "Ocean Cleanup Donation",
      description: "Donate to ocean cleanup initiatives",
      points: 250,
      category: "Donations",
      image: "🌊",
      available: true,
    },
    {
      id: 6,
      title: "Eco-friendly Tote Bag",
      description: "Reusable cotton tote bag",
      points: 150,
      category: "Eco Products",
      image: "👜",
      available: false,
    },
  ]

  const filteredRewards =
    selectedCategory === "All" ? rewards : rewards.filter((reward) => reward.category === selectedCategory)

  const handleRedeem = (reward) => {
    if (ecoPoints >= reward.points) {
      Alert.alert("Redeem Reward", `Are you sure you want to redeem "${reward.title}" for ${reward.points} points?`, [
        { text: "Cancel", style: "cancel" },
        {
          text: "Redeem",
          onPress: () => {
            updateEcoPoints(ecoPoints - reward.points)
            Alert.alert("Success!", "Reward redeemed successfully!")
          },
        },
      ])
    } else {
      Alert.alert("Insufficient Points", `You need ${reward.points - ecoPoints} more points to redeem this reward.`)
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? "#0f172a" : "#f8fafc" }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={isDarkMode ? "white" : "black"} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDarkMode ? "white" : "black" }]}>Reward Marketplace</Text>
        <View style={styles.pointsContainer}>
          <Ionicons name="trophy" size={20} color="#10b981" />
          <Text style={[styles.pointsText, { color: isDarkMode ? "white" : "black" }]}>{ecoPoints}</Text>
        </View>
      </View>

      {/* Categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              {
                backgroundColor: selectedCategory === category ? "#10b981" : isDarkMode ? "#1e293b" : "white",
              },
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                {
                  color: selectedCategory === category ? "white" : isDarkMode ? "white" : "black",
                },
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Rewards Grid */}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.rewardsContainer}>
        <View style={styles.rewardsGrid}>
          {filteredRewards.map((reward) => (
            <View key={reward.id} style={[styles.rewardCard, { backgroundColor: isDarkMode ? "#1e293b" : "white" }]}>
              <View style={styles.rewardImage}>
                <Text style={styles.rewardEmoji}>{reward.image}</Text>
              </View>
              <Text style={[styles.rewardTitle, { color: isDarkMode ? "white" : "black" }]}>{reward.title}</Text>
              <Text style={[styles.rewardDescription, { color: isDarkMode ? "#9ca3af" : "#6b7280" }]}>
                {reward.description}
              </Text>
              <View style={styles.rewardFooter}>
                <View style={styles.pointsRow}>
                  <Ionicons name="trophy" size={16} color="#10b981" />
                  <Text style={[styles.rewardPoints, { color: "#10b981" }]}>{reward.points}</Text>
                </View>
                <TouchableOpacity
                  style={[
                    styles.redeemButton,
                    {
                      backgroundColor: reward.available && ecoPoints >= reward.points ? "#10b981" : "#6b7280",
                    },
                  ]}
                  onPress={() => handleRedeem(reward)}
                  disabled={!reward.available || ecoPoints < reward.points}
                >
                  <Text style={styles.redeemButtonText}>{!reward.available ? "Unavailable" : "Redeem"}</Text>
                </TouchableOpacity>
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
    flex: 1,
    textAlign: "center",
  },
  pointsContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#10b981",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  pointsText: {
    marginLeft: 5,
    fontWeight: "bold",
    color: "white",
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "600",
  },
  rewardsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  rewardsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  rewardCard: {
    width: "48%",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rewardImage: {
    alignItems: "center",
    marginBottom: 10,
  },
  rewardEmoji: {
    fontSize: 40,
  },
  rewardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  rewardDescription: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 15,
  },
  rewardFooter: {
    alignItems: "center",
  },
  pointsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  rewardPoints: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  redeemButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 15,
  },
  redeemButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
})

export default RewardMarketplace
