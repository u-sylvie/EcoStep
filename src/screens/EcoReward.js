"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { BlurView } from "expo-blur"
import { Ionicons } from "@expo/vector-icons"

const EcoRewards = () => {
  const [ecoPoints, setEcoPoints] = useState(1250)
  const [redeemedRewards, setRedeemedRewards] = useState([])

  const rewardCategories = [
    {
      id: "products",
      title: "Eco-Friendly Products",
      icon: "leaf",
      color: "#10b981",
      rewards: [
        {
          id: 1,
          name: "Bamboo Water Bottle",
          points: 500,
          description: "Sustainable bamboo fiber bottle",
          icon: "water",
          inStock: true,
        },
        {
          id: 2,
          name: "Organic Cotton Tote Bag",
          points: 300,
          description: "Reusable shopping bag",
          icon: "bag",
          inStock: true,
        },
        {
          id: 3,
          name: "Solar Power Bank",
          points: 800,
          description: "Portable solar charger",
          icon: "battery-charging",
          inStock: false,
        },
      ],
    },
    {
      id: "donations",
      title: "Environmental Donations",
      icon: "heart",
      color: "#ef4444",
      rewards: [
        {
          id: 4,
          name: "Plant a Tree",
          points: 100,
          description: "Fund tree planting initiatives",
          icon: "leaf",
          inStock: true,
        },
        {
          id: 5,
          name: "Ocean Cleanup",
          points: 200,
          description: "Support marine plastic removal",
          icon: "water",
          inStock: true,
        },
        {
          id: 6,
          name: "Wildlife Protection",
          points: 500,
          description: "Protect endangered species",
          icon: "paw",
          inStock: true,
        },
      ],
    },
    {
      id: "experiences",
      title: "Eco Experiences",
      icon: "compass",
      color: "#3b82f6",
      rewards: [
        {
          id: 7,
          name: "Organic Farm Visit",
          points: 1000,
          description: "Educational farm experience",
          icon: "flower",
          inStock: true,
        },
        {
          id: 8,
          name: "Zero Waste Workshop",
          points: 800,
          description: "Learn sustainable living",
          icon: "school",
          inStock: true,
        },
        {
          id: 9,
          name: "Nature Photography Tour",
          points: 1200,
          description: "Guided eco-photography",
          icon: "camera",
          inStock: false,
        },
      ],
    },
  ]

  const impactStats = {
    co2Reduced: 45.7,
    waterSaved: 1250,
    plasticAvoided: 23,
    treesPlanted: 8,
  }

  const handleRewardRedeem = (reward) => {
    if (ecoPoints >= reward.points && reward.inStock) {
      Alert.alert("Redeem Reward", `Redeem ${reward.name} for ${reward.points} Eco Points?`, [
        { text: "Cancel", style: "cancel" },
        {
          text: "Redeem",
          onPress: () => {
            setEcoPoints((prev) => prev - reward.points)
            setRedeemedRewards((prev) => [...prev, reward.id])
            Alert.alert("Success!", `${reward.name} has been redeemed!`)
          },
        },
      ])
    } else if (!reward.inStock) {
      Alert.alert("Out of Stock", "This reward is currently unavailable.")
    } else {
      Alert.alert("Insufficient Points", "You need more Eco Points to redeem this reward.")
    }
  }

  const renderRewardCard = (reward, categoryColor) => {
    const isRedeemed = redeemedRewards.includes(reward.id)
    const canAfford = ecoPoints >= reward.points

    return (
      <TouchableOpacity
        key={reward.id}
        style={[styles.rewardCard, !reward.inStock && styles.outOfStockCard, isRedeemed && styles.redeemedCard]}
        onPress={() => !isRedeemed && handleRewardRedeem(reward)}
        activeOpacity={0.8}
      >
        <BlurView intensity={20} style={styles.rewardBlur}>
          <LinearGradient
            colors={isRedeemed ? ["#6b728020", "#4b5563"] : [`${categoryColor}20`, `${categoryColor}10`]}
            style={styles.rewardGradient}
          >
            <View style={styles.rewardHeader}>
              <View
                style={[
                  styles.rewardIcon,
                  {
                    backgroundColor: isRedeemed ? "#6b7280" : !reward.inStock ? "#ef4444" : categoryColor,
                  },
                ]}
              >
                <Ionicons
                  name={isRedeemed ? "checkmark" : !reward.inStock ? "close" : reward.icon}
                  size={20}
                  color="white"
                />
              </View>
              <View style={styles.rewardInfo}>
                <Text style={styles.rewardName}>{reward.name}</Text>
                <Text style={styles.rewardDescription}>{reward.description}</Text>
              </View>
              <View style={styles.rewardPrice}>
                <Text style={[styles.rewardPoints, !canAfford && !isRedeemed && styles.insufficientPoints]}>
                  {reward.points}
                </Text>
                <Text style={styles.pointsLabel}>points</Text>
              </View>
            </View>
            {!reward.inStock && (
              <View style={styles.outOfStockBadge}>
                <Text style={styles.outOfStockText}>Out of Stock</Text>
              </View>
            )}
            {isRedeemed && (
              <View style={styles.redeemedBadge}>
                <Ionicons name="checkmark-circle" size={16} color="#10b981" />
                <Text style={styles.redeemedText}>Redeemed</Text>
              </View>
            )}
          </LinearGradient>
        </BlurView>
      </TouchableOpacity>
    )
  }

  const renderCategory = (category) => (
    <View key={category.id} style={styles.categorySection}>
      <View style={styles.categoryHeader}>
        <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
          <Ionicons name={category.icon} size={24} color="white" />
        </View>
        <Text style={styles.categoryTitle}>{category.title}</Text>
      </View>
      {category.rewards.map((reward) => renderRewardCard(reward, category.color))}
    </View>
  )

  return (
    <LinearGradient colors={["#0f172a", "#1e293b", "#334155"]} style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Eco Rewards</Text>
          <Text style={styles.headerSubtitle}>Redeem points for eco-friendly rewards</Text>
        </View>

        {/* Points Balance */}
        <BlurView intensity={30} style={styles.balanceCard}>
          <LinearGradient colors={["#10b98120", "#059669"]} style={styles.balanceGradient}>
            <View style={styles.balanceHeader}>
              <Ionicons name="wallet" size={24} color="#10b981" />
              <Text style={styles.balanceTitle}>Your Eco Points</Text>
            </View>
            <Text style={styles.balanceAmount}>{ecoPoints.toLocaleString()}</Text>
            <Text style={styles.balanceSubtext}>Available for redemption</Text>
          </LinearGradient>
        </BlurView>

        {/* Environmental Impact */}
        <BlurView intensity={20} style={styles.impactCard}>
          <LinearGradient colors={["#3b82f620", "#1d4ed8"]} style={styles.impactGradient}>
            <View style={styles.impactHeader}>
              <Ionicons name="earth" size={24} color="#3b82f6" />
              <Text style={styles.impactTitle}>Your Environmental Impact</Text>
            </View>
            <View style={styles.impactStats}>
              <View style={styles.impactItem}>
                <Text style={styles.impactValue}>{impactStats.co2Reduced} kg</Text>
                <Text style={styles.impactLabel}>CO2 Reduced</Text>
              </View>
              <View style={styles.impactItem}>
                <Text style={styles.impactValue}>{impactStats.waterSaved} L</Text>
                <Text style={styles.impactLabel}>Water Saved</Text>
              </View>
              <View style={styles.impactItem}>
                <Text style={styles.impactValue}>{impactStats.plasticAvoided}</Text>
                <Text style={styles.impactLabel}>Plastic Items Avoided</Text>
              </View>
              <View style={styles.impactItem}>
                <Text style={styles.impactValue}>{impactStats.treesPlanted}</Text>
                <Text style={styles.impactLabel}>Trees Planted</Text>
              </View>
            </View>
          </LinearGradient>
        </BlurView>

        {/* Reward Categories */}
        {rewardCategories.map(renderCategory)}

        {/* Recent Redemptions */}
        {redeemedRewards.length > 0 && (
          <View style={styles.recentSection}>
            <Text style={styles.sectionTitle}>Recent Redemptions</Text>
            <BlurView intensity={15} style={styles.recentCard}>
              <View style={styles.recentContent}>
                <Ionicons name="checkmark-circle" size={24} color="#10b981" />
                <Text style={styles.recentText}>
                  You've redeemed {redeemedRewards.length} reward{redeemedRewards.length > 1 ? "s" : ""} this month!
                </Text>
              </View>
            </BlurView>
          </View>
        )}
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
  balanceCard: {
    marginHorizontal: 30,
    marginBottom: 30,
    borderRadius: 20,
    overflow: "hidden",
  },
  balanceGradient: {
    padding: 30,
    alignItems: "center",
  },
  balanceHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  balanceTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginLeft: 10,
  },
  balanceAmount: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#10b981",
    marginBottom: 5,
  },
  balanceSubtext: {
    fontSize: 14,
    color: "#9ca3af",
  },
  impactCard: {
    marginHorizontal: 30,
    marginBottom: 30,
    borderRadius: 20,
    overflow: "hidden",
  },
  impactGradient: {
    padding: 20,
  },
  impactHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  impactTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginLeft: 10,
  },
  impactStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  impactItem: {
    alignItems: "center",
    width: "48%",
    marginBottom: 10,
  },
  impactValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3b82f6",
  },
  impactLabel: {
    fontSize: 12,
    color: "#9ca3af",
    marginTop: 5,
    textAlign: "center",
  },
  categorySection: {
    marginBottom: 30,
  },
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 30,
    marginBottom: 15,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  rewardCard: {
    marginHorizontal: 30,
    marginBottom: 15,
    borderRadius: 15,
    overflow: "hidden",
  },
  outOfStockCard: {
    opacity: 0.6,
  },
  redeemedCard: {
    opacity: 0.8,
  },
  rewardBlur: {
    flex: 1,
  },
  rewardGradient: {
    padding: 20,
  },
  rewardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  rewardIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  rewardInfo: {
    flex: 1,
  },
  rewardName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  rewardDescription: {
    fontSize: 14,
    color: "#d1d5db",
  },
  rewardPrice: {
    alignItems: "flex-end",
  },
  rewardPoints: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#10b981",
  },
  insufficientPoints: {
    color: "#ef4444",
  },
  pointsLabel: {
    fontSize: 12,
    color: "#9ca3af",
  },
  outOfStockBadge: {
    backgroundColor: "#ef4444",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginTop: 10,
  },
  outOfStockText: {
    fontSize: 12,
    color: "white",
    fontWeight: "bold",
  },
  redeemedBadge: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  redeemedText: {
    fontSize: 12,
    color: "#10b981",
    marginLeft: 5,
    fontWeight: "bold",
  },
  recentSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginHorizontal: 30,
    marginBottom: 15,
  },
  recentCard: {
    marginHorizontal: 30,
    borderRadius: 15,
    overflow: "hidden",
  },
  recentContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  recentText: {
    fontSize: 14,
    color: "white",
    marginLeft: 15,
    flex: 1,
  },
})

export default EcoRewards
